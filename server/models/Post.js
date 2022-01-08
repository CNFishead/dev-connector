import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
    // name of user
    name: {
      type: String,
    },
    // avatar of user
    avatar: {
      type: String,
    },
    likes: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }],
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: { type: String, required: true },
        // name of user
        name: {
          type: String,
        },
        // avatar of user
        avatar: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },

  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
