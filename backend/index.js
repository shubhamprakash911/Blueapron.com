const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./router/user.router");
const { productRouter } = require("./router/product.router");
require("dotenv").config();

const cors = require("cors");
const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    msg: "Welcome to Eat&Repeate Backend",
  });
});

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/products", productRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log(error.message);
  }
  console.log("server at listing at port ", PORT);
});
