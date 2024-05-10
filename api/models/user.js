import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    min: [0, "Age must be greater than 0"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
});

const User = mongoose.model("users", userSchema);
export default User;
