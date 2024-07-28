import mongoose, { InferSchemaType, model } from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);
