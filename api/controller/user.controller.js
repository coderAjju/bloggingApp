import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const updateUserInfo = async (req, res, next) => {
  try {
    if (req.userId !== req.params.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.body.username) {
      if (!req.body.username.length > 7 && !req.body.username.length < 20) {
        return next(
          errorHandler(400, "Username must be between 7 and 20 characters")
        );
      }
      if (req.body.username.includes(" ")) {
        return next(errorHandler(400, "Username cannot contain spaces"));
      }
      if (req.body.username !== req.body.username.toLowerCase()) {
        return next(errorHandler(400, "Username must be lowercase"));
      }
      if (!req.body.username.match(/^[a-z0-9_]+$/)) {
        return next(
          errorHandler(
            400,
            "Username can only contain letters, numbers, and underscores"
          )
        );
      }
    }
    let UpdatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        username: req.body.username,
        email: req.body.email,
        // profilePicture:req.body.profilePicture
      },
      { new: true }
    );
    const { password, ...rest } = UpdatedUser._doc;
    return res
      .status(200)
      .json({ user: rest, message: "updation successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    console.log(req.userId, req.params.userId);
    if (req.userId !== req.params.userId) {
      return next(errorHandler(401, "Unauthorized"));
    }
    await User.findByIdAndDelete(req.params.userId);
    return res.cookie("token", null).status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};


export const signOut = (req,res,next)=>{
    try {
        return res.cookie("token",null).status(200).json({message:"User signed out successfully"})
    } catch (error) {
        next(error)
    }
}