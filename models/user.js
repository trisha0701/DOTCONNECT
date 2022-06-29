const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  followers: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],

  pic:{
    type:String,
    default:"https://res.cloudinary.com/dotconnect/image/upload/v1656318562/profile_pic_noyf7i.jpg"
  }
});

mongoose.model("User", userSchema);
