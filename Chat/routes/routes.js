const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const passport = require("passport");
require("../auth");

router.get("/", checkAuthentication, (req, res) => {
  res.render("home", { title: "Chat-App", name: req.user });
});

router.get("/login", checkNotAuthentication, (req, res) => {
  res.render("login", { title: "ChatApp - Login" });
});

router.post(
  "/login",
  checkNotAuthentication,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

// sign up block
router.get("/signup", checkNotAuthentication, (req, res) => {
  res.render("signup", { title: "ChatApp - SignUp" });
});

router.post("/signup", checkAuthentication, (req, res) => {
  const pwd = req.body.password;
  const con_pwd = req.body.confirm_password;
  if (pwd != con_pwd) {
    res.render("signup", { title: "ChatApp - SignUp" });
  } else {
    const { username, email, password, confirm_password } = req.body;
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        User.create({
          username: username,
          email: email,
          password: hash,
        })
          .then(() => console.log("insert into database"))
          .catch((e) => console.log(e));
      });
    });

    res.redirect("login");
  }
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
}

function checkNotAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}
module.exports = router;
