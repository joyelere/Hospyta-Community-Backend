import { RequestHandler } from "express";
import PostModel from "../models/Post";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIsDefined } from "../util/assertIsDefined";

export const getPosts: RequestHandler = async (req, res, next) => {
  try {
    const posts = await PostModel.find().exec();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const getPost: RequestHandler = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    if (!postId) {
      throw createHttpError(400, "Invalid post ID");
    }

    const post = await PostModel.findById(postId)
      .populate("user", "username avatar")
      .populate("replies")
      .exec();

    if (!post) {
      throw createHttpError(404, "Post not found");
    }

    // Increment the view count
    post.views += 1;
    await post.save();

    res.status(200).json({
      ...post.toObject(),
      viewCount: post.views,
      upvoteCount: post.upvotes,
      downvoteCount: post.downvotes,
      replyCount: post.comments.length,
    });
  } catch (error) {
    next(error);
  }
};

// export const getPost: RequestHandler = async (req, res, next) => {
//   const postId = req.params.postId;

//   try {
//     if (!mongoose.Types.ObjectId.isValid(postId)) {
//       throw createHttpError(400, "Invalid post ID");
//     }
//     const post = await PostModel.findById(postId).exec();
//     if (!post) {
//       throw createHttpError(404, "Post not found");
//     }
//     res.status(200).json(post);
//   } catch (error) {
//     next(error);
//   }
// };

interface CreatePostBody {
  image: string;
  content: string;
  category: string;
}

export const createPosts: RequestHandler<
  unknown,
  unknown,
  CreatePostBody,
  unknown
> = async (req, res, next) => {
  const { image, content, category } = req.body;
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);
    if (!image || !content || !category) {
      throw createHttpError(400, "Parameters missing");
    }

    const post = new PostModel({
      image,
      content,
      category,
      user: authenticatedUserId,
    });

    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

interface UpdatePostParams {
  postId: string;
}

interface UpdatePostBody {
  image?: string;
  content?: string;
  category?: string;
}

export const updatePost: RequestHandler<
  UpdatePostParams,
  unknown,
  UpdatePostBody,
  unknown
> = async (req, res, next) => {
  const { postId } = req.params;
  const { image, content, category } = req.body;
  //   const authenticatedUserId = req.session.userId;

  try {
    // assertIsDefined(authenticatedUserId);

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      throw createHttpError(400, "Invalid post ID");
    }

    const post = await PostModel.findById(postId).exec();

    if (!post) {
      throw createHttpError(404, "Post not found");
    }

    // if (!post.user.equals(authenticatedUserId)) {
    //   throw createHttpError(401, "You cannot access this post");
    // }

    if (image) post.image = image;
    if (content) post.content = content;
    if (category) post.category = category;

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

export const deletePost: RequestHandler = async (req, res, next) => {
  const { postId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      throw createHttpError(400, "Invalid post ID");
    }

    const post = await PostModel.findById(postId).exec();

    if (!post) {
      throw createHttpError(404, "Post not found");
    }

    await post.deleteOne();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

// Get posts by category
export const getPostsByCategory: RequestHandler = async (req, res, next) => {
  const category = req.params.category;

  try {
    const posts = await PostModel.find({ category }).exec();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

// Get all unique categories
export const getUniqueCategories: RequestHandler = async (req, res, next) => {
  try {
    const categories = await PostModel.distinct("category").exec();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

//UpVotePost
export const upvotePost: RequestHandler = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const post = await PostModel.findById(postId).exec();
    if (!post) {
      throw createHttpError(404, "Post not found");
    }

    post.upvotes += 1;
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

//DownVotePost

export const downvotePost: RequestHandler = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const post = await PostModel.findById(postId).exec();
    if (!post) {
      throw createHttpError(404, "Post not found");
    }

    post.downvotes += 1;
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

//getPostsSortedByDate
export const getPostsSortedByDate: RequestHandler = async (req, res, next) => {
  try {
    const posts = await PostModel.find().sort({ createdAt: -1 }).exec();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

//getPostsSortedByUpvotes
export const getPostsSortedByUpvotes: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const posts = await PostModel.find().sort({ upvotes: -1 }).exec();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};
