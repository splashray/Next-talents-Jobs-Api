const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  contact:[
    {
    email: {
      type: String,
      required:[true,'please provide email'],
      match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'please provide valid email'],
      unique:true
    },
    phone: {
      type: String,
      required: true,
    },
    address:{
      type: String,
      required:true,
    },
  },
],
  
  summary: {
    type: String,
    required: true,
  },
  education: [
    {
      institution: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
    },
  ],
  experience: [
    {
      company: {
        type: String,
        required: true,
      },
      position: {
        type: String,
        required: true,
      },
      duration: {
        type: String,
        required: true,
      },
    },
  ],
  skills: {
    type: [String],
  },
  certifications: [
    {
      name: {
        type: String,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;