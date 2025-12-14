// MongoDBConnect.js
const mongoose = require("mongoose");

const MONGO_URI = "mongodb+srv://admin:admin@cluster0.gjgbrwz.mongodb.net/library";

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("✅ Connected to MongoDB Atlas (library database)");
    console.log("Mongoose version:", mongoose.version);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
}

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB disconnected");
});

mongoose.connection.on("error", (err) => {
  console.log("⚠️ MongoDB Error:", err);
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed due to app termination");
  process.exit(0);
});

module.exports = connectDB;
