require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handleCheckout = async (req, res) => {
  const { cartItems } = req.body;

  // Extract relevant information from cartItems
  const lineItems = cartItems.map((item) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: item.title,
        images: [item.image],
        // Add other product data properties as needed
      },
      unit_amount: item.price * 100, // Convert price to cents
    },
    quantity: item.quantity,
  }));

  // Include customer email and set up billing and shipping address collection
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/checkout`,
    shipping_address_collection: {
      allowed_countries: ["US"], // Empty array allows shipping to any country
    },
  });

  res.send({ url: session.url });
};

module.exports = { handleCheckout };
