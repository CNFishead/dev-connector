import asyncHandler from "../middleware/async.js";
import Profile from "../models/Profile.js";
import User from "../models/User.js";

/*
  @Route   GET api/profile/me
  @desc    Get current users profile
  @access  Private
*/
export const getUser = asyncHandler(async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile) {
      return res.status(400).json({
        success: false,
        message: `No Profile for user: ${req.user.id}`,
      });
    }
    res.status(200).json({ success: true, profile });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ success: false, message: e });
  }
});

/*
  @Route   POST api/profile
  @desc    Create or Update user Profile
  @access  Private
*/
export const createOrUpdate = asyncHandler(async (req, res) => {
  try {
    // Check validators to make sure certain fields are in the req.body
    if (!req.body.status || !req.body.skills) {
      return res
        .status(400)
        .json({ success: false, message: `Please add required fields` });
    }
    // destructure the request
    const {
      website,
      skills,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      // spread the rest of the fields we don't need to check
      ...rest
    } = req.body;
    // build a profile
    const profileFields = {
      user: req.user.id,
      website:
        website && website !== ""
          ? normalize(website, { forceHttps: true })
          : "",
      skills: Array.isArray(skills)
        ? skills
        : // removes the preceeding and trailing whitespace, splits the values into an array
          skills.split(",").map((skill) => " " + skill.trim()),
      ...rest,
    };

    // Build socialFields object
    const socialFields = { youtube, twitter, instagram, linkedin, facebook };

    // normalize social fields to ensure valid url
    for (const [key, value] of Object.entries(socialFields)) {
      if (value && value.length > 0)
        socialFields[key] = normalize(value, { forceHttps: true });
    }
    // add to profileFields
    profileFields.social = socialFields;

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return res.json({ success: true, profile });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ success: false, message: "Server Error" });
    }
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ success: false, message: e });
  }
});

/*
  @Route   GET api/profile
  @desc    Return All Profiles
  @access  Public
*/
export const getAllProfiles = asyncHandler(async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.status(200).json({ success: true, profiles });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: "Server Error" });
  }
});

/*
  @Route   GET api/profile/user/:user_id
  @desc    Return single user
  @access  Public
*/
export const getProfile = asyncHandler(async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res
        .status(400)
        .json({ success: false, message: "No Profile For User" });
    }
    res.status(200).json({ success: true, profile });
  } catch (e) {
    console.error(e.message);

    // Checks for a specific error message so we dont always return a Server Error.
    if (e.kind == "ObjectId") {
      return res
        .status(400)
        .json({ success: false, message: "Profile Not Found" });
    }
    res.status(500).json({ message: "Server Error" });
  }
});

/*
  @Route   DELETE api/profile
  @desc    Delete profile, user & post
  @access  Private
*/
export const deleteProfile = asyncHandler(async (req, res) => {
  try {
    // TODO: Remove users posts

    // Remove Profile
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.status(200).json({ success: true });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: "Server Error" });
  }
});

/*
  @Route   PUT api/profile
  @desc    Update User Profile Experience
  @access  Private
*/
export const experienceUpdate = asyncHandler(async (req, res) => {
  try {
    // Check validators to make sure certain fields are in the req.body
    if (!req.body.title || !req.body.company || !req.body.from) {
      return res
        .status(400)
        .json({ success: false, message: `Please add required fields` });
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (!profile) {
        return res.status(400).json({
          success: false,
          message: "Please first complete your profile",
        });
      }
      profile.experience.unshift(req.body);

      await profile.save();

      res.status(200).json({ success: true, profile });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, message: "Database Error" });
    }
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: "Server Error" });
  }
});

/*
  @Route   DELETE api/profile/experience/:exp_id
  @desc    remove user work experience
  @access  Private
*/
export const experienceDelete = asyncHandler(async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });

    foundProfile.experience = foundProfile.experience.filter(
      (exp) => exp._id.toString() !== req.params.exp_id
    );

    await foundProfile.save();
    return res.status(200).json({ success: true, foundProfile });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});
