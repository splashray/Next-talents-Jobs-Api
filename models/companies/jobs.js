const mongoose = require("mongoose");

const jobPostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    jobTitle: String,
    jobDescription: String,
    username: String,
    applicationDeadline: String,
    email: {
      type: String,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    specialisms: {
      type: String,
      enum: [
        "Retail",
        "Banking",
        "Digital & Creative",
        "Human Resources",
        "Accounting & Finance",
        "Management",
        "Creative Art",
        "Digital",
      ],
      default: "Retail",
    },
    jobType: {
      type: String,
      enum: [
        "Retail",
        "Banking",
        "Digital & Creative",
        "Human Resources",
        "Management",
      ],
      default: "Retail",
    },
    offeredSalary: {
      type: String,
      enum: ["$1500", "$2000", "$2500", "$3500", "4500", "5000"],
      default: "$1500",
    },
    careerLevel: {
      type: String,
      enum: [
        "Retail",
        "Banking",
        "Digital & Creative",
        "Human Resources",
        "Management",
      ],
      default: "Retail",
    },
    experienceLevel: {
      type: String,
      enum: ["beginner", "intermediate", "expert"],
    },
    industry: {
      type: String,
      enum: [
        "Retail",
        "Banking",
        "Digital & Creative",
        "Human Resources",
        "Management",
      ],
      default: "Retail",
    },
    qualification: {
      type: String,
      enum: [
        "Retail",
        "Banking",
        "Digital & Creative",
        "Human Resources",
        "Management",
      ],
      default: "Retail",
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },
    country: {
      type: String,
      default: "None",
    },
    city: {
      type: String,
      default: "None",
    },
    completeAddress: {
      type: String,
      default: "None",
    },
    findOnMap: {
      type: String,
      default: "None",
    },
    latitude: {
      type: String,
      default: "None",
    },
    longitude: {
      type: String,
      default: "None",
    },
  },
  { required: true }
);

const JobPost = mongoose.model("JobPost", jobPostSchema);

module.exports = JobPost;

