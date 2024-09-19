import mongoose, { Schema } from "mongoose";
import bycrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // aws /coudaniry /azure file uploded URL
      required: true,
    },
    coverImage: {
      type: String, // aws /coudaniry /azure file uploded URL
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

//Hash the password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = bycrypt.hash(this.password, 9);
  }
  next();
});

//compare the password usng custom methods
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bycrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function (token) {
  return Jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userName: this.userName,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = async function (token) {
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
