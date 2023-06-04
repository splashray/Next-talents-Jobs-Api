const _ = require("lodash");
const { User, Profile } = require("../models/user.model");

// Create a user
async function createUser(req, res) {
  try {
    const { name, email, password, isAdmin } = req.body;

    // Create a new user instance
    const user = new User({
      name,
      email,
      password,
      isAdmin,
    });

    // Save the user to the database
    const savedUser = await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

// Get a user by ID
async function getUserById(req, res) {
  try {
    const userId = _.trim(req.params.Id);
    console.log(userId);
    console.log(req.user.isAdmin);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

// Create a profile for a user
async function newProfile(req, res) {
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
      language,
      workExperience,
      awards,
    } = req.body;

    // Find the user by ID
    const userId = _.trim(req.params.Id);
    console.log(userId);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new profile instance
    const newProfile = new Profile({
      user: user._id,
      username,
      profilePhoto,
      skills,
      location,
      sallary,
      about,
      education,
      cv,
      gender,
      language,
      workExperience,
      awards,
    });

    // Save the new profile to the database
    const savedProfile = await newProfile.save();

    // Update the user's profileDetails field with the new profile ID
    user.profileDetails = savedProfile._id;
    await user.save();

    res.status(201).json({ message: "Profile created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

// Edit user profile
async function editProfile(req, res) {
  const userId = _.trim(req.params.Id);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.redirect("/"); // Redirect to home if user not found
    }
    if (req.method === "POST") {
      // Retrieve form data and update user profile
      user.name = req.body.name;
      user.email = req.body.email;
      await user.save();

      const profile = await Profile.findOne({ user: userId });
      if (!profile) {
        return res.send("No profile found for the user!").redirect("/");
        // Redirect to home if profile not found
      }

      // Retrieve form data and update profile
      profile.username = req.body.username;
      profile.profilePhoto = req.body.profilePhoto;
      profile.skills = req.body.skills;
      profile.location = req.body.location;
      profile.salary = req.body.salary;
      profile.about = req.body.about;
      profile.education = req.body.education;
      profile.cv = req.body.cv;
      profile.gender = req.body.gender;
      profile.language = req.body.language;
      profile.workExperience = req.body.workExperience;
      profile.awards = req.body.awards;
      await profile.save();

      res.redirect(`/profile/${userId}`);
    } else {
      const profile = await Profile.findOne({ user: userId });
      res.status(200).json({ profile: profile });
    }
  } catch (err) {
    // Handle error
    console.error(err);
    res.redirect("/");
  }
}

// Display user profile
async function showProfile(req, res) {
  const userId = _.trim(req.params.Id);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.send("No such user!");
    }
    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      return res.send("No profile found for the user!");
    }
    res.status(201).json({ profile: profile });
  } catch (err) {
    // Handle error
    console.error(err);
    res.redirect("/");
  }
}

// Display all profile in DB
async function showAllProfiles(req, res) {
  try {
    const profiles = await Profile.find();
    if (!profiles || profiles.length === 0) {
      return res.send("No profiles found in the database!");
    }
    res.status(200).json({ profiles: profiles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

async function deleteProfile(req, res) {
  const profileId = _.trim(req.params.Id);
  try {
    const profile = await Profile.findByIdAndRemove(profileId);
    if (!profile) {
      return res.send("No profile found for the user!");
    }
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = {
  createUser,
  getUserById,
  newProfile,
  showProfile,
  editProfile,
  showAllProfiles,
  deleteProfile,
};
