const express = require("express");
const { userModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authorization } = require("../middleware/authorization.middleware");
const { authanticate } = require("../middleware/authentication.middleware");
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    let users = await userModel.find();
    res.status(200).json({
      status: true,
      msg: "Getting All users succesfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      msg: "Internal Server Error while getting all users",
    });
  }
});

userRouter.post("/register", async (req, res) => {
  const { name, email, pass, isAdmin } = req.body;
  const user = await userModel.find({ email });
  try {
    if (user.length == 0) {
      bcrypt.hash(pass, 4, async function (err, hash) {
        if (err) {
          res.status(500).json({
            status: false,
            msg: "Error while hashing the password",
          });
        } else {
          const user = new userModel({ name, email, pass: hash, isAdmin });
          await user.save();
          res.status(200).json({
            status: true,
            msg: "User register successfully",
          });
        }
      });
    } else {
      return res.status(409).json({
        status: false,
        msg: "Email-id already exists",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      msg: "Internal Server Error while registration",
    });

    console.log(error);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await userModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(pass, user[0].pass, (err, result) => {
        if (result) {
          let token = jwt.sign(
            { isAdmin: user[0].isAdmin },
            process.env.SECRET_KEY
          );
          res.status(200).json({
            status: true,
            msg: "login Successful",
            name: user[0].name,
            token,
            isAdmin: user[0].isAdmin,
          });
        } else {
          res.status(500).json({
            status: false,
            msg: "Internal Server Error while Login",
          });
        }
      });
    } else {
      res.status(403).json({
        status: false,
        msg: "Wrong Credentails",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      msg: "Internal Server Error while Login",
    });
  }
});

userRouter.delete(
  "/delete/:id",
  authanticate,
  authorization,
  async (req, res) => {
    try {
      await userModel.findByIdAndDelete({ _id: req.params.id });
      let data = await userModel.find();
      res.send({ msg: "user deleted successful", data: data });
    } catch (error) {
      res.send({ msg: "something went wrong" });
    }
  }
);

module.exports = { userRouter };
