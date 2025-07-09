const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Allow frontend origin (Vercel) for CORS
const allowedOrigins = [
  "http://localhost:3000",
  "https://mern-auth-frontend.vercel.app",
  "https://mern-auth-frontend-b79zosztg-sasikantharavas-projects.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
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
