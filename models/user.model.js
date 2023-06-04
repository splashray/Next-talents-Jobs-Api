const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  profileDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
});

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
  language: {
    type: String,
  },
  workExperience: {
    type: String,
  },
  awards: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
const Profile = mongoose.model("Profile", profileSchema);

module.exports = { User, Profile };
