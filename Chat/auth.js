const bcrypt = require("bcrypt");
const User = require("./models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    (email, password, done) => {
      User.findOne({ email: email }).then((user) => {
        if (!user) {
          return done(null, false, { message: "No user with that email" });
        }

        try {
          bcrypt.compare(password, user.password).then((res) => {
            if (res) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password incorrect" });
            }
          });
        } catch (e) {
          return done(e);
        }
      });
    }
  )
);

module.exports = passport;
