const express = require("express");
const router = express.Router();
const Product = require("../models/product");
// const {isLoggedIn} = require('../middleware');

//listing all the products

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});

    res.render("products/index", { products });
  } catch (e) {
    console.log("Products Error");
    req.flash("error", "Something went Wrong!!! Cant Show the Products");
    res.render("error");
  }
});

router.get("/products/new", (req, res) => {
  try {
    res.render("products/new");
  } catch (e) {
    console.log("New Element Not possible to add");
    req.flash("error", "Something went Wrong!!! Cant Add Form");
    res.render("error");
  }
});
// router.post('/products',isLoggedIn,async(req,res)=>{
router.post("/products", async (req, res) => {
  try {
    const { product } = req.body;
    await Product.create(product);
    req.flash("success", "product created successfully"); //this msg will be stored in session thats y we have installed session

    // await Product.create(req.body.product);
    res.redirect("/products");
  } catch (e) {
    console.log("something went wrong product 2");
    req.flash("error", "Something went Wrong!!! Cannot Add New Product");
    res.render("error");
  }
});

//showing a partiular product
router.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("reviews");

    // console.log(product);
    //  res.render('products/show', {product,msg:req.flash('success')});
    res.render("products/show", { product });
  } catch (e) {
    console.log("something went wrong id ");
    req.flash(
      "error",
      "Something went Wrong!!! Cannot Show a Particular Product"
    );

    res.redirect("/error");
  }
});

//creating new form for editing AND UPDATING
//  router.get('/products/:id/edit', isLoggedIn,async(req,res)=>{
router.get("/products/:id/edit", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render("products/edit", { product });
  } catch (e) {
    console.log("something went wrong get");
    req.flash(
      "error",
      "Something went Wrong!!! Cannot Show a Particular Product"
    );
    res.render("error");
  }
});

//updating new form for updation of editing
//  router.patch('/products/:id',isLoggedIn,async(req,res)=>{
router.patch("/products/:id", async (req, res) => {
  try {
    const { product } = req.body;
    const { id } = req.params;
    await Product.findByIdAndUpdate(id, product);
    req.flash("success", "product updated succesfully");
    res.redirect(`/products/${req.params.id}`);
  } catch (e) {
    console.log("something went wrong");
    req.flash("error", "Something went Wrong!!! Cannot Update the Product");
    res.render("error");
  }
});

//deleteing the partiular product
//  router.delete('/products/:id',isLoggedIn,async(req,res)=>{
router.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/products");
  } catch (e) {
    console.log("something went wrong");
    req.flash("error", "Something went Wrong!!! Cannot Delete the Product");
    res.render("error");
  }
});

//creating a new comment
//  router.post('/products/:id/review',isLoggedIn,async(req,res)=>{
router.post("/products/:id/review", async (req, res) => {
  try {
    // res.send("namaste");
    const { id } = req.params;
    const product = await Product.findById(id);
    const review = new Review({
      user: req.user.username,
      ...req.body,
    });
    product.reviews.push(review);
    //  console.log(review);
    await review.save();
    await product.save();
    res.redirect(`/products/${id}`);
  } catch (e) {
    console.log("something went wrong");
    req.flash("error", "Something went Wrong!!! Cannot Add the Review");
    res.render("error");
  }
});

//deleteing the partiular review
//   router.delete('/products/:id/:idreview', isLoggedIn,async(req,res)=>{
router.delete("/products/:id/:idreview", async (req, res) => {
  try {
    const { idreview } = req.params;

    await Review.findByIdAndDelete(idreview);
    // product.reviews.delete(review);
    res.redirect(`/products/${req.params.id}`);
  } catch (e) {
    console.log("something went wrong");
    req.flash(
      "error",
      "Something went Wrong!!! Cannot Delete this Particular Review"
    );
    res.render("error");
  }
});

module.exports = router;
