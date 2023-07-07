const _ = require("lodash");
const Profile = require("../models/companyprofile.model");
const { StatusCodes } = require("http-status-codes");
const { imageUploader } = require('../utils/cloudinary')

// Create a profile for a user

const createProfile = async (req, res) => {
  req.body.user = req.user.userId;
  req.body.email = req.email;
  token = req.token;
  const userData = req.user.User;

  const newProfile = await Profile.create(req.body);

  res.status(StatusCodes.CREATED).json({ user: userData, token: token, profile: newProfile });
};

// Update a user profile
const updateProfile = async (req, res) => {
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
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server Error" });
  }
};

const uploadProfilePics = async (req, res, next) => {
  try {
    const { userId: id } = req.user.userId
    const User = await Profile.findOne({ id });
    if (!User) {
      throw new Error('user not found')
    }
    if (!req.file) {
      return next()
    }
    const path = req.file.path;
    const image = await imageUploader(User._id, path)
    const saveProfilePics = await Profile.findOneAndUpdate({ user: id }, { profilePhoto: image },
      { new: true, runValidators: true })
    req.image = image;
    next()
  } catch (error) {
    res.json(error.message);
  }
}

module.exports = {
  createProfile,
  updateProfile,
  uploadProfilePics
};