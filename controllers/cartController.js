const User = require("../model/User");

// Fetch cart items
const getCart = async (req, res) => {
  const user = req.user;
  if (!req?.user)
    return res.status(400).json({ message: "User name required" });
  const userData = await User.findOne({ username: user }).exec();
  if (!userData) {
    return res.status(204).json({ message: `${req.user} not found` });
  }
  res.json({ cartItems: userData.cartItems });
};

// Update cart items
const updateCart = async (req, res) => {
  const user = req.user;
  if (!req?.user)
    return res.status(400).json({ message: "User name required" });
  const { cartItems } = req.body;

  try {
    const result = await User.findOneAndUpdate(
      { username: user },
      { $set: { cartItems } },
      { new: true }
    ).exec();

    res.json({ cartItems: result.cartItems });
  } catch (error) {
    console.error("Error updating cart items:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getCart,
  updateCart,
};
