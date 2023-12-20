const LocalStrategy = require("passport-local").Strategy;
const { authenticate } = require("passport");
const {pool} = require("./dbConfig");
const bcrypt = require("bcrypt");

function init(passport){
    const authenticateUser = (email, password, done)=>{
        pool.query(
            `SELECT`
        )
    }
    passport.use(new LocalStrategy({
        usernameField : "email",
        passwordField : "password"
    }, authenticate)
    );
}

if(results.rows.length > 0){
    const user = results.rows[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
        if(err) {
            throw err;
        }

        if(isMatch){
            return done(null, user);
        } else{
            return done(null, false, {message: "password incorrect"});
        }
    });
}else{
    return done(null, false, {message: "Not registered"});
}