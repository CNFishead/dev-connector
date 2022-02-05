import asyncHandler from "../middleware/async.js";
import User from "../models/User.js";
import Post from "../models/Post.js";

/*
  @Route   POST api/post
  @desc    create new post object
  @access  Private
*/
export const createPost = asyncHandler(async (req, res) => {
  // error checking
  if (!req.body.text) {
    return res
      .status(400)
      .json({ success: false, message: "Please add text to your post" });
  }
  try {
    const user = await User.findById(req.user.id).select("-password");
    const newPost = new Post({
      text: req.body.text,
      name: user.firstName + " " + user.lastName,
      avatar: user.avatar,
      user: req.user.id,
    });
    const post = await newPost.save();
    res.status(200).json({ success: true, post });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

/*
  @Route   POST api/post/comment/:id
  @desc    Comment on a post
  @access  Private
*/
export const createComment = asyncHandler(async (req, res) => {
  // error checking
  if (!req.body.text) {
    return res
      .status(400)
      .json({ success: false, message: "Please add text to your post" });
  }
  try {
    const user = await User.findById(req.user.id).select("-password");
    const post = await Post.findById(req.params.id);

    const newComment = {
      text: req.body.text,
      name: user.firstName + " " + user.lastName,
      avatar: user.avatar,
      user: req.user.id,
    };

    post.comments.unshift(newComment);

    await post.save();

    res.status(200).json({ success: true, comments: post.comments });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

/*
  @Route   DELETE api/post/comment/:id/:comment_id
  @desc    Comment on a post
  @access  Private
*/
export const deleteComment = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    post.comments = post.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await post.save();

    res.status(200).json({ success: true, comments: post.comments });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

/*
  @Route   GET api/post
  @desc    Get all {Posts}
  @access  Private
*/
export const getPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

/*
  @Route   GET api/post/:id
  @desc    Get single {Post} by :id
  @access  Private
*/
export const getPost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // check if post exists
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "post not found" });
    }
    res.status(200).json({ success: true, post });
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId") {
      return res
        .status(404)
        .json({ success: false, message: "post not found" });
    }
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

/*
  @Route   DELETE api/post/:id
  @desc    Delete single {Post} by :id
  @access  Private
*/
export const deletePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // check if post exists
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "post not found" });
    }
    // check if user owns the post.
    // need to set post.user to a string
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "You are not the owner of this post",
      });
    }
    await post.remove();
    res.status(200).json({ success: true });
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId") {
      return res
        .status(404)
        .json({ success: false, message: "post not found" });
    }
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

/*
  @Route   PUT api/post/like/:id
  @desc    Like a single {Post} by :id
  @access  Private
*/
export const likePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // check if post exists
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "post not found" });
    }
    // check if post has already been liked by user
    // filter over results, it returns an array, if the array is greater than 0, i.e. 1,
    // that means the filter found a user in this likes array. the user has already liked the post
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      // remove the like
      post.likes = post.likes.filter(
        ({ user }) => user.toString() !== req.user.id
      );
      await post.save();
      return res.status(200).json({ success: true, likes: post.likes.length });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.status(200).json({ success: true, likes: post.likes.length });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});
