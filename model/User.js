const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: String,
  cartItems: [ItemSchema], // Array to store cart items
  orders: [
    {
      orderedItems: [ItemSchema],
      orderedOn: {
        type: Date,
        default: () => new Date(), // Use a unique identifier (current date) as the default value
      },
    },
  ], // Array to store ordered items
  phoneNumber: String,
  address: String,
});

module.exports = new mongoose.model("User", userSchema);
