import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User: mongoose.Model<User> =
  mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
