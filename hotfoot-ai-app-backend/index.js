require("dotenv").config();
const PORT = process.env.PORT || 5000;
const express = require("express");
const cors = require("cors");
const { createClerkClient } = require("@clerk/backend");
const { MongoClient } = require("mongodb");

const clerk = createClerkClient({
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
});

const app = express();

const corsOptions = {
  origin: [
    "http://192.168.29.125:8081",
    "exp://192.168.29.125:8081",
    "http://localhost:8081",
  ],
  methods: "GET, POST, PATCH, DELETE, PUT, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Database connection
let db;
const connectDB = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    db = client.db();
    console.log("Connected to MongoDB");
    return client;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

app.get("/api/user/:clerkUserId", async (req, res) => {
  try {
    const clerkUser = await clerk.users.getUser(req.params.clerkUserId);
    const usersCollection = db.collection("users");

    // find existing user
    let user = await usersCollection.findOne({ clerkId: clerkUser.id });

    // If no user, create one
    if (!user) {
      const newUser = {
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0].emailAddress,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        preferences: null,
        personalInfo: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const insertResult = await usersCollection.insertOne(newUser);
      user = newUser;

      console.log("Created new user:", insertResult.insertedId);
    }

    res.json({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      preferences: user.preferences,
      personalInfo: user.personalInfo,
    });
  } catch (error) {
    console.error("Error in GET /api/user:", error);
    res.status(500).json({
      error: error.message,
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
});

// Save preferences
app.post("/api/user/:clerkUserId/preferences", async (req, res) => {
  try {
    console.log("Received preferences update for:", req.params.clerkUserId);
    console.log("Request body:", req.body);

    const usersCollection = db.collection("users");
    const result = await usersCollection.updateOne(
      { clerkId: req.params.clerkUserId },
      { $set: { preferences: req.body } },
      { upsert: true }
    );

    console.log("Update result:", result);

    res.json({
      success: true,
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Detailed error:", {
      message: error.message,
      stack: error.stack,
      fullError: error,
    });
    res.status(500).json({ error: error.message });
  }
});

// Save personal info
app.post("/api/user/:clerkUserId/personal-info", async (req, res) => {
  try {
    console.log("Request body Info:", req.body);

    const usersCollection = db.collection("users");
    const result = await usersCollection.updateOne(
      { clerkId: req.params.clerkUserId },
      { $set: { personalInfo: req.body } },
      { upsert: true }
    );

    res.json({
      success: true,
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Error in POST /personal-info:", error);
    res.status(500).json({ error: error.message });
  }
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
  });
