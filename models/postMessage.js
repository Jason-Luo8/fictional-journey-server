import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String], // array of Strings
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
}); // each post is going to have the above properties

// model
const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
// exporting a moogoose model from postMessage file. from model, we can find, create, delete, update
