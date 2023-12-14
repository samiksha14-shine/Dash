import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    url: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    city: String,
    region: String,
    country: String,
    pestle: String,
    insights: String,
    title: Array,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;