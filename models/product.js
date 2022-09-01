const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
