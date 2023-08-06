const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  username: {
    type: String,
    default: "",
  },
  profilePhoto: {
    type: String,
    default: "default.jpg",
  },
  skills: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  sallary: {
    type: String,
    default: "",
  },
  about: {
    type: String,
    default: "",
  },
  education: {
    type: String,
    default: "",
  },
  cv: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    default: "",
  },
  languages: {
    type: String,
    default: "",
  },
  workExperience: {
    type: String,
    default: "",
  },
  awards: {
    type: String,
    default: "",
  },
});

profileSchema.plugin(mongoosePaginate);

const Profile = mongoose.model("candidateProfile", profileSchema);

module.exports = Profile;
