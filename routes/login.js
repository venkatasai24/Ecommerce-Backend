const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginContoller");

router
  .post("/", loginController.handleLogin)
  .patch("/", loginController.handleForgotPassword);

module.exports = router;
