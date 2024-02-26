const LocalStrategy = require("passport-local").Strategy;
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");

function initialize(passport) {
  console.log("Initialized");

  //hamgiin chuhal hseg heregelgciig shalgan oruulah
  const authenticateUser = (email, password, done) => {
    console.log(email, password);
    //oruulsan email tei hereglegc baigaa uguig shalgah
    //results.rows dotor tuhain email tai hereglgcin buh medeelel hadaglgdn
    pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          throw err;
        }
        console.log(results.rows);

        if (results.rows.length > 0) {
          //hereglegc oldvol id g n usert hadglna
          const user = results.rows[0];
          const storedHashedPassword = user.password.trim()
          //password haritsuulalt
          bcrypt.compare(password, storedHashedPassword, (err, isMatch) => {
            if (err) {
              console.error(err);
              return done(err);
            }
          
            if (isMatch) {
              console.log("Password is correct");
              return done(null, user);
            } else {
              console.log("Password is incorrect");
              return done(null, false);
            }
          });
          
        } else {
          // No user
          console.log("no user found");
          return done(null, false, {
            message: "No user with that email address"
          });
        }
      }
    );
  };

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      authenticateUser
    )
  );
  passport.serializeUser((user, done) => done(null, user.id));  

  passport.deserializeUser((id, done) => {
    pool.query(`SELECT * FROM users WHERE id = $1`, [id], (err, results) => {
      if (err) {
        return done(err);
      }
      console.log(`ID is ${results.rows[0].id}`);
      return done(null, results.rows[0]);
    });
  });
}

module.exports = initialize;