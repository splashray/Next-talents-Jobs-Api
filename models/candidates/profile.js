const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String,
    default: "default.jpg",
  },
  skills: {
    type: String,
  },
  location: {
    type: String,
  },
  sallary: {
    type: String,
  },
  about: {
    type: String,
  },
  education: {
    type: String,
  },
  cv: {
    type: String,
  },
  gender: {
    type: String,
  },
  languages: {
    type: String,
  },
  workExperience: {
    type: String,
  },
  awards: {
    type: String,
  },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = { Profile };
