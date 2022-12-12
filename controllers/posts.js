import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js"; // access to real model

export const getPosts = async (req, res) => {
  //   res.send("THIS WORKS!");
  try {
    // if successful
    const postMessages = await PostMessage.find(); // asynchronous

    // console.log(postMessages);

    res.status(200).json(postMessages);
  } catch (error) {
    // if unsuccessful
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  //   res.send("Post Creation");
  const post = req.body;

  const newPost = new PostMessage(post);

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with selected id");

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with selected id");

  await PostMessage.findByIdAndRemove(_id);

  res.json({ message: "Post deleted successfully" });
};
