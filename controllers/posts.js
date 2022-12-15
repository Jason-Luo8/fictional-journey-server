import express from "express";
import mongoose from "mongoose";

import PostMessage from "../models/postMessage.js"; // access to real model

const router = express.Router();

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

export const getPost = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const post = await PostMessage.findById(_id); // asynchronous

    // console.log(postMessages);

    res.status(200).json(post);
  } catch (error) {
    // if unsuccessful
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  //   res.send("Post Creation");
  const post = req.body;

  const newPostMessage = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPostMessage.save();

    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No post with selected id: ${_id}`);

  const updatedPost = { creator, title, message, tags, selectedFile, _id };

  await PostMessage.findByIdAndUpdate(_id, updatedPost, {
    new: true,
  });

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No post with selected id: ${_id}`);

  await PostMessage.findByIdAndRemove(_id);

  res.json({ message: "Post deleted successfully." });
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No post with selected id: ${_id}`);

  const post = await PostMessage.findById(_id);

  const index = post.likes.findIndex((_id) => _id === String(req.userId));

  if (index === -1) {
    // like the post
    post.likes.push(req.userId);
  } else {
    // remove like from post
    post.likes = post.likes.filter((_id) => _id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });

  res.status(200).json(updatedPost);
};

export default router;
