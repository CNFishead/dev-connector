import asyncHandler from "../middleware/async.js";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import gravatar from "gravatar";
import sendEmail from "../utils/sendEmail.js";

/*
  @Desc:   Create new user
  @Route:  POST /api/users
  @Access: Public
*/
export const createNewUser = asyncHandler(async (req, res) => {
  // Check if user exists in the database
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res.status(400).json({
      success: false,
      message: `A user with email: ${req.body.email} already exists in our system`,
    });
  }
  // check if password beats regex
  // if (
  //   !/^(?=\P{Ll}*\p{Ll})(?=\P{Lu}*\p{Lu})(?=\P{N}*\p{N})(?=[\p{L}\p{N}]*[^\p{L}\p{N}])[\s\S]{8,}$/.test(
  //     req.body.password
  //   )
  // ) {
  //   return res.status(400).json({
  //     success: false,
  //     message: `Password failed Validation check`,
  //   });
  // }
  const avatar = gravatar.url(req.body.email, {
    s: "200",
    r: "pg",
    d: "mm",
  });
  req.body.avatar = avatar;
  // create user
  const user = await User.create(req.body);
  if (user) {
    // const message = `A new User has Registered for the app: {App Name}, Congrats on the new user: ${
    //   req.body.firstName + " " + req.body.lastName
    // }`;

    // await sendEmail({
    //   email: process.env.SUPPORT_EMAIL,
    //   subject: `New User - Honey Do App`,
    //   message: message,
    // });
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      email: user.email,
      avatar: user.avatar,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json({ success: true, users });
});
