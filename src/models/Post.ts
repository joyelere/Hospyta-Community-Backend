import mongoose, { InferSchemaType, model } from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    image: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

type Post = InferSchemaType<typeof postSchema>;

export default model<Post>("Post", postSchema);
