const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../modal/Schema");
module.exports = (passport) =>  {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
    passport.use(
      new localStrategy({ usernameField: 'email' }, (email, password, done) => {
        User.findOne({
          email: email
        }).then(user => {
          if (!user) {
            console.log("user with that email is not registered");
            return done(null, false);
          }
          if(user){
            console.log("username is " + email)
            console.log("user has reached here")
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              console.log("user matched")
              return done(null, user);
            } else {
              console.log("user didnt match");
              return done(null, false);
            }
          });
        }
      }
      )
      })
    )
}