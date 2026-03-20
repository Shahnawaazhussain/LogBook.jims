const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/resources",resourceRoutes);
app.use("/api/bookings",bookingRoutes);
app.use("/api/users",userRoutes);
app.use("/api/dashboard", dashboardRoutes);
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Logistics System Backend Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});