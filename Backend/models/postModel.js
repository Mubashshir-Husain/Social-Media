import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    postTitle: {
        type: String,
        required: true,
    },
    postDescription: {
        type: String,
        required: true,
    },
    postImage: {
        type: String,
        required: true,
    },
    postBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
  likes:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    }
  ],
  comments:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Comment"
    }
  ]
},{
    timestamps: true
})

export default mongoose.model("Post", postSchema);