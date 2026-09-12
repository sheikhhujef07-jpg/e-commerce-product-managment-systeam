const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const { connectDB } = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is not set in the .env file");
  process.exit(1);
}

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "..", "webapp")));

app.get("/api", (req, res) => {
  res.json({ message: "E-Commerce API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);


async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("MySQL connection failed:", error.message);
    process.exit(1);
  }
}

startServer();
