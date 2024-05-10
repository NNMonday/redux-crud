import express from "express";
import User from "../models/user.js";

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    const result = await User.find({}).exec();
    res.status(200).json({
      message: "Get all users successfully",
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
});

userRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findOne({ _id: id }).exec();
    res.status(200).json({
      message: `Find user with _id = ${id} successfully`,
      result,
    });
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const newUser = req.body;
    const result = await User.create({ ...newUser });
    res.status(201).json({
      message: "New user has been added successfully",
      result: result._doc,
    });
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
});

userRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = req.body;
    const result = await User.findOneAndUpdate(
      { _id: id },
      { ...updatedUser },
      { new: true }
    );
    res.status(200).json({
      message: `User with id ${id} has been updated successfully`,
      result,
    });
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
});

userRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.deleteOne({ _id: id });
    res.status(200).json({
      message: `User with id ${id} has been deleted successfully`,
      result,
      deletedId: id,
    });
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
});

export default userRouter;
