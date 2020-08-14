const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const passport = require("passport");
require("../auth");

router.get("/", checkAuthentication, (req, res) => {
  res.render("home", { title: "Chat-App" });
});

router.get("/chat", checkAuthentication, (req, res) => {
  var people = [];
  User.find({}).then((user) => {
    user.forEach((u) => {
      if (u["username"] != req.user.username) {
        people.push(u["username"]);
      }
    });

    res.render("home", { title: "Chat-App", names: people, owner: req.user });
  });
});

// router.get("/chat/:chater", checkAuthentication, (req, res) => {
//   const para = req.params.chater;
//   const route = "/chat/".concat(para);
//   console.log(route);
//   req.io.sockets.on("chat message", (msg) => {
//     io.emit("chat message", msg);
//   });
//   const chat = para.split("-");
//   chat.pop();
//   res.render("directChat", { title: "Chat-App", names: chat, owner: req.user });
// });

router.get("/login", (req, res) => {
  res.render("login", { title: "ChatApp - Login" });
});

router.post(
  "/login",

  passport.authenticate("local", {
    successRedirect: "/chat",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

// sign up block
router.get("/signup", checkNotAuthentication, (req, res) => {
  res.render("signup", { title: "ChatApp - SignUp" });
});

router.post("/signup", checkNotAuthentication, (req, res) => {
  const { username, email, password } = req.body;
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
    return res.redirect("/chat");
  }
  next();
}
module.exports = router;
