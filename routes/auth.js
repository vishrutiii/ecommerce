const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");

router.get("/register", async (req, res) => {
  res.render("auth/signup");
});

router.post("/register", async (req, res) => {
  // const { username, email, password } = req.body;
  console.log(req.body);
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
    });
    const newUser = await User.register(user, req.body.password); // register hone ke baad hum store kr rhe hai
    console.log(newUser);
    req.flash("success", "New user Registered successfully");
    res.redirect("/products");
  } catch (e) {
    req.flash("error", e.message);
    // console.log(req.body.username);
    // console.log("kuch toh hua samjhe nahi aaya ");
    res.redirect("/register");
  }
});

router.get("/login", async (req, res) => {
  res.render("auth/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    console.log(req.user);
    res.redirect("/products");
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;
