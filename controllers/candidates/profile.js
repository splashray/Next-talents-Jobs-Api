const _ = require("lodash");
const { Profile } = require("../../models/candidates/profile");

// Create a profile for a user

const createProfile = async (req, res) => {
  const createdBy = req.user.userId;
  const email = req.email;
  const userData = req.user.User;

  const newProfile = await Profile.create({ ...req.body, createdBy, email });

  res.status(StatusCodes.CREATED).json({ user: userData, profile: newProfile });
};

// Update a user profile
const updateProfile = async (req, res) => {
  try {
    const {
      username,
      profilePhoto,
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

    const updatedProfile = await Profile.findByIdAndUpdate(
      { createdBy: req.user.userId },
      {
        username,
        profilePhoto,
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
