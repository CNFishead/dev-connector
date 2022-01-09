import asyncHandler from "../middleware/async.js";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

/*
  @desc:  Auth User
  @route: POST /api/auth/login
  @access Public
*/
export const login = asyncHandler(async (req, res, next) => {
  // Destructure body data
  const { email, password } = req.body;

  // Validate email/password
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: `Please send an email and a Password` });
  }
  // Check if user in system
  // Check if user deleted
  const user = await User.findOne({ email }).select("+password");
  if (!user || user.isActive === false) {
    return res
      .status(401)
      .json({ message: "Invalid Credentials / User Not Found" });
  }

  // User Auth
  if (user && (await user.matchPassword(password))) {
    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      email: user.email,
      avatar: user.avatar,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid email or password" });
  }
});

/* @desc   Get current logged in user
   @route  POST /api/auth
   @access Private
 */
export const getMe = asyncHandler(async (req, res, nex) => {
  const user = await User.findById(req.user.id).select("-isAdmin -isActive");
  res.status(200).json({
    success: true,
    data: user,
  });
});

/* @desc    Forgot password
   @route   POST /api/auth/forgotpassword
   @access  Public
 */
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: `There is no user with email: ${req.body.email}`,
    });
  }
  // Get reset token
  const resetToken = await user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}s://${req.get(
    "host"
  )}/auth/resetpassword/${resetToken}`;

  const message =
    `You are receiving this email because you (or someone else) has requested the reset of a password. \n` +
    `Please Go to this link to reset password ${resetUrl}`;
  try {
    await sendEmail({
      email: user.email,
      subject: `Password Reset Token`,
      message: message,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorResponse("Email could not be sent", 500));
  }
});

/* @desc    Reset Password
     @route   PUT /api/auth/resetpassword/:resettoken
     @access  Public
   */
export const resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPassToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");
  const user = await User.findOne({
    resetPassToken: resetPassToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  // doesnt exist or password token expired
  if (!user) {
    return next(new ErrorResponse("Invalid Token", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendTokenResponse(user, 200, res);
});

/*
  @desc:  Register User
  @route: POST /api/auth/register
  @access Public
*/
export const register = asyncHandler(async (req, res, next) => {
  // Check if user exists in the database
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res.status(400).json({
      success: false,
      message: `A user with email: ${req.body.email} already exists in our system`,
    });
  }
  // create user
  try {
    const user = await User.create(req.body);
    // New user notification
    // const message = `A new User has Registered for the app: Dev-Connector, Congrats on the new user: ${
    //   req.body.firstName + " " + req.body.lastName
    // }`;

    // await sendEmail({
    //   email: process.env.SUPPORT_EMAIL,
    //   subject: `New User - Honey Do App`,
    //   message: message,
    // });
    res.status(201).json({
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      email: user.email,
      avatar: user.avatar,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "Bad Request, Please fill out all Required Fields",
    });
  }
});
