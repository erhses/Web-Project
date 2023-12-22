const express = require('express');
const app = express();
const {pool} = require('./dbConfig');
const bcrypt = require("bcrypt");
const { ContextExclusionPlugin } = require("webpack");
const session = require("express-session");
const flash = require("express-flash");
require("dotenv").config();
const passport = require("passport"); 

const configurePassport = require("./passportConfig");
configurePassport(passport);

const PORT = 5000;

app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: "secret", 
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());

app.use(passport.session());

app.use(flash());
app.use("/app", express.static("app"));

app.get('/', (req, res) => {
    res.sendFile('app/index.html', {root: __dirname })
});
app.get('/map', (req, res) => {
    res.sendFile('app/map.html', {root: __dirname })
});
app.get('/services', (req, res) => {
    res.sendFile('app/services.html', {root: __dirname })
});
app.get('/login', checkAuthenticated, (req, res) => {
    res.sendFile('app/signIn.html', {root: __dirname })
});
app.get('/profile', checkNotAuthenticated, (req, res) => {
    res.sendFile('app/profile.html', {root: __dirname })
});
app.get('/register', checkAuthenticated, (req, res) => {
    res.sendFile('app/signUp.html', {root: __dirname })
});
app.get('/logout', (req,res) => {
    req.logOut(function(err) {
        if (err) { return next(err); }
        req.flash("success_msg", "You have successfully logged out.");
        res.redirect("/login");
    });
});


app.post('/register', async (req, res) => {
    let { email, name, password, confirm_password } = req.body;
    let errors = [];
    console.log({
        name,
        email,
        password,
        confirm_password
    });

    if (!name || !email || !password || !confirm_password) {
        errors.push({ message: "Please enter all fields" });
      }
    
      if (password.length < 6) {
        errors.push({ message: "Password must be a least 6 characters long" });
      }
    
      if (password !== confirm_password) {
        errors.push({ message: "Passwords do not match" });
      }
    
      if (errors.length > 0) {
        res.redirect("/register");
      }else{
        let hashed = await bcrypt.hash(password, 10);
        console.log(hashed);
        pool.query(
            `SELECT * FROM public.users 
            WHERE email = $1`, 
            [email],
            (err, results) => {
                if(err){
                    throw err;
                }
                console.log("reaches here");
                console.log(results.rows);

                if(results.rows.length > 0) {
                    res.sendFile('app/signUp.html', {root: __dirname});
                    // res.send({
                    //     message: "Email already exists"
                    // });
                }else{
                    pool.query(
                        `INSERT INTO users (name, email, password)
                        VALUES ($1, $2, $3)
                        RETURNING id, password`, [name, email, hashed], (err, result) =>{
                                if(err){
                                    throw err;
                                }
                                console.log(result.rows);
                                req.flash('success_msg', "Registred!");
                                res.redirect('/login');
                        }
                    )
                }
            }
        );
      }
});

app.post(
    '/login',
    passport.authenticate("local", {
      successRedirect: '/profile',
      failureRedirect: '/login',
      failureFlash: true
    })
  );

function checkAuthenticated(req, res, next) {
  console.log("reaches check authen");
    if (req.isAuthenticated()) {
      return res.redirect('/profile');
    }
    next();
  }
  
  function checkNotAuthenticated(req, res, next) {
    console.log("reaches check not authen");
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }

app.listen(PORT, () =>{
    console.log(`server running on port ${PORT}`);
});
