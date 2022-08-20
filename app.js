const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

//product routes
const productRoutes = require("./routes/product");
const authRoutes = require("./routes/auth");

//conecting dbs
mongoose
  .connect(
    "mongodb+srv://Kartik:kapil123@cluster0.qqv9hwt.mongodb.net/shopApp", 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("mongoose DB connected");
  })

  .catch((err) => {
    console.log("mongoose DB didnot connect");
    console.log(err);
  });


//configuring the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
//views is for ejs files and public is for static files

//configuring static files
app.use(express.static(path.join(__dirname, "/public")));
//req ki body ko parse krna hai therefore we will use
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//.env file bnate hai usemdaalte hai
const sessionConfig = {
  secret: "Kartik Kapil",
  resave: false,
  saveUninitialized: true,
};


app.use(session(sessionConfig));
app.use(flash());


app.use(passport.initialize());

app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next(); 
});

app.use(productRoutes);
app.use(authRoutes);

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.listen(8080, () => {
  console.log("server running at port 8080");
});
