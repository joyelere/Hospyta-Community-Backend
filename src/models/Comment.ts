import mongoose, { InferSchemaType, model } from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: { type: String, required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
}, { timestamps: true });

type Comment = InferSchemaType<typeof commentSchema>;

export default model<Comment>("Comment", commentSchema);
