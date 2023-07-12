const _ = require("lodash");
const Profile = require("../models/candidateProfile.model");
const { StatusCodes } = require("http-status-codes");
const { imageUploader } = require('../utils/cloudinary')

// Create a profile for a user

const createProfile = async (req, res) => {
  req.body.user = req.user.userId;
  req.body.email = req.email;
  token = req.token;
  const userData = req.user.User;
  const newProfile = await Profile.create(req.body);
};

// Update a user profile
const updateProfile = async (req, res, next) => {
  try {
    const {
      username,
      skills,
      location,
      sallary,
      about,
      education,
      cv,
      gender,
      languages,
      workExperience,
      awards,
    } = req.body;
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: req.user.userId },
      {
        username,
        skills,
        location,
        sallary,
        about,
        education,
        cv,
        gender,
        languages,
        workExperience,
        awards,
      },
      { new: true, runValidators: true }
    );
    res.status(StatusCodes.OK).json({ updatedProfile });
  } catch (error) {
    next(error);
  }
}
const uploadProfilePics = async (req, res, next) => {
  try {
    const id = req.user.userId
    const path = req.file.path;
    console.log(path);
    console.log(id);
    const image = await imageUploader(id, path)
    const saveProfilePics = await Profile.findOneAndUpdate({ user: id }, { profilePhoto: image },
      { new: true, runValidators: true })
    console.log(image);
    res.status(StatusCodes.OK).json({ saveProfilePics });
  } catch (error) {
    next(error);
  }
}


module.exports = {
  createProfile,
  updateProfile,
  uploadProfilePics
};