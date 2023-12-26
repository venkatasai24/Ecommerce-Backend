const User = require("../model/User");

//get specific order
const getOrder = async (req, res) => {
  const user = req.user;
  if (!req?.user)
    return res.status(400).json({ message: "User name required" });

  const { _id } = req.query;

  try {
    const foundUser = await User.findOne({ username: user }).exec();

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the order with the specified _id in the orders array
    const order = foundUser.orders.find(
      (order) => order._id.toString() === _id
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Now 'orderedItems' contains the items for the specified order
    res.status(200).send(order);
  } catch (error) {
    console.error("Error fetching ordered items:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update ordered items
const addOrder = async (req, res) => {
  const user = req.user;
  if (!req?.user)
    return res.status(400).json({ message: "User name required" });

  try {
    const foundUser = await User.findOne({ username: user }).exec();

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (foundUser.cartItems.length) {
      await User.findOneAndUpdate(
        { username: user },
        {
          $push: {
            orders: {
              orderedItems: foundUser.cartItems,
              orderedOn: new Date(),
            },
          }, // Add items to orderedItems
          $set: { cartItems: [] }, // Set cartItems to an empty array
        },
        { new: true }
      ).exec();

      res.status(200).json({ message: "Order updated successfully" });
    }
  } catch (error) {
    console.error("Error updating ordered items:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getOrder,
  addOrder,
};
