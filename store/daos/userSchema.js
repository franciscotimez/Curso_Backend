import mongoose from "mongoose";


export const userSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
