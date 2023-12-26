const User = require("../model/User");

const deleteUser = async (req, res) => {
  if (!req?.body?.user)
    return res.status(400).json({ message: "User ID required" });
  const user = await User.findOne({ username: req.body.user }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${req.body.id} not found` });
  }
  await user.deleteOne({ _id: req.body.id });
};

const getUser = async (req, res) => {
  if (!req?.user) return res.status(400).json({ message: "User ID required" });
  const user = await User.findOne({ username: req.user }).lean().exec();
  if (!user) {
    return res.status(204).json({ message: `User ID ${req.user} not found` });
  }
  // Destructure the user object and exclude password, _id, and refreshToken
  const { password, _id, refreshToken, ...sanitizedUser } = user;
  // Send the sanitized user object as the response
  res.json(sanitizedUser);
};

const updateUser = async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ message: "username required" });

  try {
    // Use lean() to get a plain JavaScript object
    const user = await User.findOne({ username: username }).lean().exec();

    if (!user) {
      return res.status(204).json({ message: `User ID ${username} not found` });
    }

    // Update user properties if provided in the request body
    if (req.body?.phoneNumber) user.phoneNumber = req.body.phoneNumber;
    if (req.body?.address) user.address = req.body.address;

    // Save the updated user
    const result = await User.findByIdAndUpdate(user._id, user, { new: true })
      .lean()
      .exec();

    // Send the sanitized user object as the response
    const { password, _id, refreshToken, ...sanitizedUser } = result;
    res.json(sanitizedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  deleteUser,
  getUser,
  updateUser,
};
