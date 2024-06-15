import mongoose,{Schema} from "mongoose"
import jwt from "jwt"

const userSchema = new Schema({
  username: {
    type: "String",
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    // for enabling searching in optimized way
    index: true,
  },
  email: {
    type: "String",
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  fullName: {
    type: "String",
    required: true,
    lowercase: true,
    trim: true,
  },
  avatar: {
    type: "String",
    required: true,
  },
  coverImage: {
    type: "String",
  },
  watchHistory: [
    {
      type: Schema.Types.ObjectId,
      ref:"Video"
    },
    ],
   password:{
    type: "String",
    required: [true,'Password is required']
   },
   refreshToken:{
    type: "String",

   }
},{timestamps:true});

userSchema.pre("save",async function (next) {
  if(!this.isModified("password")) return exit();

  this.password = await bcrypt.hash(this.password,10)
  next();
});

userSchema.method.isPasswordCorrect = async function(password){
  return await bcrypt.compare(this.password,password);
}

userSchema.method.generateAccessToken = function (){
  return Jwt.sign({
    _id : this._id,
    email : this.email,
    username : this.username,
    fullName : this.fullName
  },
  process.env.ACCESS_TOKEN_SECRET,{
    expiresIn : process.env.ACCESS_TOKEN_EXPIRY
  }  
  )
}

userSchema.method.generateRefreshToken = function () {
  return Jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);