import Post from "../models/post.model.js";

export const createPost = async (req, res) => {
  const id = req.user._id;

  try {
    const newPost = new Post({ ...req.body, creator: id });

    if (newPost) {
      await newPost.save();

      res.status(201).json("Post successfully created!");
    } else {
      res.status(400).json("Invalid post data entered!");
    }
  } catch (error) {
    res.status(500).json(error.message || "Internal Server Error!");
  }
};

export const getAllPosts = async (req, res) => {
  const { category } = req.query;

  try {
    const posts = category
      ? await Post.find({ category }).sort({ createdAt: -1 })
      : await Post.find().sort({ createdAt: -1 });

    if (posts) {
      res.status(200).json(posts);
    } else {
      res.status(400).json("Error while fetching posts");
    }
  } catch (error) {
    res.status(500).json(error.message || "Internal Server Error!");
  }
};

export const getSinglePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id).populate({
      path: "creator",
      select: "-password",
    });

    if (!post) return res.status(404).json("Post not found!");

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(400).json("Error while fetching post data");
    }
  } catch (error) {
    res.status(500).json(error.message || "Internal Server Error!");
  }
};

export const deletePost = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;

  try {
    const post = await Post.findById(id).populate({
      path: "creator",
      select: "-password",
    });

    if (!post) return res.status(404).json("Post not found!");

    const isMyPost = userId.toString() === post.creator._id.toString();

    if (isMyPost) {
      await Post.findByIdAndDelete(id);

      res.status(200).json("Post successfully deleted");
    } else {
      res.status(403).json("You can only delete your own post!");
    }
  } catch (error) {
    res.status(500).json(error.message || "Internal Server Error!");
  }
};

export const getPostsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const posts = await Post.find({ category });

    if (posts) {
      res.status(200).json(posts);
    } else {
      res.status(400).json("Error while fetching related posts!");
    }
  } catch (error) {
    res.status(500).json(error.message || "Internal Server Error!");
  }
};
