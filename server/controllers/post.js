import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      description,
      picturePath,
      userPicturePath: user.picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();
    const posts = await Post.find();
    res.status(201).json(posts);
  } catch (error) {
    console.error(error);
    res.sendStatus(409);
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    isLiked ? post.likes.delete(userId) : post.likes.set(userId, true);

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};
