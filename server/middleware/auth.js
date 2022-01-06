import jwt from "jsonwebtoken";
import asyncHandler from "./async.js";
import User from "../models/User.js";

export const protect = asyncHandler(async (req, res, next) => {
  // init a variable
  let token;
  // Check for token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Split the Bearer and token into an array, and grab the token.
    token = req.headers.authorization.split(" ")[1];
  } //else if (req.cookies.token) {
  //token = req.cookies.token;
  //}

  // Make sure token exists
  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: `Not authorized to access this route` });
  }
  try {
    // verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // dev purposes
    // console.log(decoded);
    // Find User
    req.user = await User.findById(decoded.id);
    next();
  } catch (e) {
    return res
      .status(400)
      .json({
        success: false,
        message: `Not authorized to access this route: ${e}`,
      });
  }
});

// Grant access to specific roles
export const authorize = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401.).json({success: false, message: "Not authorized Admin"});
  }
};
