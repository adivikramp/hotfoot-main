const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    clerkId: {
      type: String,
      requried: true,
      unique: true,
    },
    email: {
      type: String,
      requried: true,
    },
    firstName: {
      type: String,
      requried: true,
    },
    lastName: {
      type: String,
      requried: true,
    },
    preferences: {
      type: Object,
      default: {},
    },
    personalInfo: {
      type: Object,
      default: {},
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User = new model("User", UserSchema);

module.exports = User;
