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
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
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
