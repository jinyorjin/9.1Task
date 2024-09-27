const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://task7p-f3b02.firebaseio.com",
});

const app = express();
app.use(cors());
app.use(express.json());

app.post("/create-customer", async (req, res) => {
  const { email, uid } = req.body;
  console.log("Received request to create customer for:", email, uid);

  try {
    const customer = await stripe.customers.create({
      email: email,
    });
    console.log("Customer created with ID:", customer.id);

    await admin.firestore().collection("users").doc(uid).set(
      {
        stripeCustomerId: customer.id,
        premium: true,
      },
      { merge: true }
    );
    console.log("Customer ID saved to Firestore for user:", uid);

    res.status(200).send({
      message: "Customer created and saved successfully",
      customerId: customer.id,
    });
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).send({ error: "Failed to create customer" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
console.log("Received request to create customer for:", email, uid);
