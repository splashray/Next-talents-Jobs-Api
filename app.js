const express = require("express");
const mongoose = require("mongoose");

const appRoute = require("./routers/user.router");

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON bodies
app.use(express.json());

// Disable strict query parsing
mongoose.set("strictQuery", false);

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/Next-talents-api", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Set up routes
app.use("/api", appRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
