const _ = require("lodash");
const  Profile  = require("../../models/company/profile");
const {StatusCodes} = require("http-status-codes");

// Create a profile for a user

const createProfile = async (req, res) => {
  req.body.user = req.user.userId;
  req.body.email = req.email;
  token = req.token;
  const userData = req.user.User;

  const newProfile = await Profile.create(req.body);

  res.status(StatusCodes.CREATED).json({ user: userData, token: token,profile: newProfile });
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

module.exports = {
  createProfile,
  updateProfile,
};