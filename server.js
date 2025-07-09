const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Allow frontend origin (Vercel) for CORS
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://mern-auth-frontend.vercel.app", // your real deployed domain
    "https://mern-auth-frontend-mmam85ch7-sasikantharavas-projects.vercel.app" // Vercel preview link
  ],
  methods: ["GET", "POST"],
  credentials: true
}));


app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Routes
app.use("/api/auth", require("./routes/auth"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
