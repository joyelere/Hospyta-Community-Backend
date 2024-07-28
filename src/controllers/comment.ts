import { RequestHandler } from "express";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import CommentModel from "../models/Comment";
import PostModel from "../models/Post";

interface CreateCommentBody {
  content: string;
  postId: string;
}

export const addComment: RequestHandler<unknown, unknown, CreateCommentBody, unknown> = async (req, res, next) => {
  const { content, postId } = req.body;
  const userId = req.session.userId;

  try {
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      throw createHttpError(400, "Invalid post ID");
    }

    const post = await PostModel.findById(postId).exec();
    if (!post) {
      throw createHttpError(404, "Post not found");
    }

    const newComment = await CommentModel.create({
      content,
      post: postId,
      user: userId,
    });

    post.comments.push(newComment._id);
    await post.save();

    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
};

interface ReplyCommentBody {
  content: string;
  commentId: string;
}

export const replyComment: RequestHandler<unknown, unknown, ReplyCommentBody, unknown> = async (req, res, next) => {
  const { content, commentId } = req.body;
  const userId = req.session.userId;

  try {
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      throw createHttpError(400, "Invalid comment ID");
    }

    const comment = await CommentModel.findById(commentId).exec();
    if (!comment) {
      throw createHttpError(404, "Comment not found");
    }

    const newReply = await CommentModel.create({
      content,
      post: comment.post,
      user: userId,
    });

    comment.replies.push(newReply._id);
    await comment.save();

    res.status(201).json(newReply);
  } catch (error) {
    next(error);
  }
};

export const getCommentsByPost: RequestHandler<{ postId: string }> = async (req, res, next) => {
  const { postId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      throw createHttpError(400, "Invalid post ID");
    }

    const comments = await CommentModel.find({ post: postId })
      .populate("user", "username avatar")
      .populate({
        path: "replies",
        populate: {
          path: "user",
          select: "username avatar",
        },
      })
      .exec();

    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
