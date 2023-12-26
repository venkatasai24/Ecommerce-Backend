const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const cartController = require("../controllers/cartController");
const orderController = require("../controllers/orderController");

router
  .route("/")
  .get(userController.getUser)
  .delete(userController.deleteUser)
  .patch(userController.updateUser);

router
  .route("/cart")
  .get(cartController.getCart)
  .patch(cartController.updateCart);

router
  .route("/order")
  .patch(orderController.addOrder)
  .get(orderController.getOrder);

module.exports = router;
