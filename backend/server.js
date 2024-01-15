require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connect.js");
const app = express();
const authRoutes = require("./routes/authRoutes.js");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware.js");

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());
app.use(authRoutes);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Server listening at port: ${PORT}`);
    });
  } catch (error) {
    throw new Error(error);
  }
};

start();
