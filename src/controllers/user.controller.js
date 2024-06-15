import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/Apierror.js";
import {uploadOnCloudinary} from "../utils/uploadOnCloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  
  // User data fetched
  const [fullName,username,email,password] = req.body;

  // user data validated
    if ([username || email || password || fullname].some((filed) => filed?.trim ==="")) {
      throw new ApiError(400,"All fileds are not filled !!");
    }
 
    // user aldready exists
    const existedUser=username.findOne({
      $or: ["username || email"],
    });

    if(existedUser){
      throw new ApiError(409,"user with same username of email already exists");
    }
    
    const avatarLocalPath =req.files?.avatar[0]?.path;
    const coverImageLocalPath =req.files?.cover[0]?.path;

    if(!avatarLocalPath){
      throw new ApiError(400,"Avatar Image Required...");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
      throw new ApiError(400,"Avatar image required...");
    }

    // uploading data to database
    const User = User.create({
      fullName,
      avatar:avatar.url,
      coverImage:coverImage?.url || "",
      email,
      password,
      username: username.toLowercase(), 
    })
    
})

export {
  registerUser,
};