/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: register a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: user email
 *               name:
 *                 type: string
 *                 description: user name
 *               password:
 *                 type: string
 *                 description: user password
 *               confirm_password:
 *                 type: string
 *                 description: confirming password
 *     responses:
 *       '200':
 *         description: User registered successfully.
 *       '400':
 *         description: Please check your input.
 *       '500':
 *         description: Internal server error.
 */
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate user
 *     description: Endpoint to authenticate a user.
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: user email
 *               password:
 *                 type: string
 *                 description: user password
 *     responses:
 *       '302':
 *         description: Redirect to profile page on successful login.
 *       '401':
 *         description: Unauthorized. Redirect to login page.
 */

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Serve the user profile page
 *     description: Endpoint to serve the user profile page.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: User profile page successfully served.
 *       '302':
 *         description: Redirect to login if the user is not authenticated.
 */

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Log out user
 *     description: Endpoint to log out a user.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '302':
 *         description: Redirect to login page after successful logout.
 */
const express = require("express");
const app = express();
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const swaggerjsdoc = require("swagger-jsdoc");
const swagger = require("swagger-ui-express");
const passport = require("passport");

const configurePassport = require("./passportConfig");
const { has } = require("lodash");
configurePassport(passport);

const PORT = 5000;
//api documentation heseg
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API DOCUMENTATION",
      version: "1.0.0",
    },
  },
  apis: [`${__dirname}/*.js`  ],
};
const spacs = swaggerjsdoc(options);
app.use("/api-docs", swagger.serve, swagger.setup(spacs));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
//passport ashiglan hergelgciin authen hiihed zoriulsan 
app.use(passport.initialize());
app.use(passport.session());
//dirname
app.use("/app", express.static("app"));

//home
app.get("/", (req, res) => {
  res.sendFile("app/index.html", { root: __dirname });
});
//map hseg
app.get("/map", (req, res) => {
  res.sendFile("app/map.html", { root: __dirname });
});
//services hsesg
app.get("/services", (req, res) => {
  res.sendFile("app/services.html", { root: __dirname });
});
app.get("/login", checkAuthenticated, (req, res) => {
  res.sendFile("app/signIn.html", { root: __dirname });
});
app.get("/profile", checkNotAuthenticated, (req, res) => {
  res.sendFile("app/profile.html", { root: __dirname });
});
app.get("/register", checkAuthenticated, (req, res) => {
  res.sendFile("app/signUp.html", { root: __dirname });
});
//garah
app.get("/logout", (req, res) => {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success_msg", "You have successfully logged out.");
    res.redirect("/login");
  });
});
//burtguulelt
app.post("/register", async (req, res) => {
  try {
    let { email, name, password, confirm_password } = req.body;
    let errors = [];
    console.log({
      name,
      email,
      password,
      confirm_password,
    });
    const results = await pool.query(
      "SELECT * FROM public.users WHERE email = $1",
      [email]
    );
    if (password !== confirm_password || results.rows.length > 0) {
      errors.push({ message: "Please check Email and Password" });
      console.log(errors);
      res.redirect("/register");
      return;
    }
    let hashed = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, password",
      [name, email, hashed]
    );
    res.redirect("/login");
  } catch (error) {
    res.redirect("/register");
  }
});
//nevterc oroh
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
  })
);
//herelegc nevterch orson eseh
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/profile");
  }
  next();
}
//heregelegch nevtreegui eseh
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
