const _ = require("lodash");
const Profile = require("../models/companyprofile.model");
const { StatusCodes } = require("http-status-codes");
const { imageUploader } = require('../utils/cloudinary')

// Create a profile for a user

const createProfile = async (req, res, next) => {
  try {
    req.body.user = req.user.userId;
    req.body.email = req.email;
    token = req.token;
    const userData = req.user.User;

    const newProfile = await Profile.create(req.body);

    res.status(StatusCodes.CREATED).json({ user: userData, token: token, profile: newProfile });
  } catch (error) {
    next(error);
  }
};

// Update a user profile
const updateProfile = async (req, res, next) => {
  try {
    const {
      username,
      profilePhoto,
      email,
      phone,
      website,
      est,
      teamSize,
      multipleSelectBoxes,
      allowInSearchListing,
    } = req.body;
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: req.user.userId },
      {
        username,
        profilePhoto,
        email,
        phone,
        website,
        est,
        teamSize,
        multipleSelectBoxes,
        allowInSearchListing,
      },
      { new: true, runValidators: true }
    );

    res.status(StatusCodes.OK).json({ updatedProfile });
  } catch (error) {
    next(error);
  }
};

const uploadProfilePics = async (req, res, next) => {
  try {
    const id = req.user.userId
    const path = req.file.path;
    console.log(path);
    console.log(id);
    const image = await imageUploader(id, path)
    const saveProfilePics = await Profile.findOneAndUpdate({ user: id }, { profilePhoto: image },
      { new: true, runValidators: true })
    res.status(StatusCodes.OK).json({ saveProfilePics });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProfile,
  updateProfile,
  uploadProfilePics
};