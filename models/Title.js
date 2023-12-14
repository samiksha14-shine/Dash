import mongoose from "mongoose";

const TitleSchema = new mongoose.Schema(
  {
    Title: String,
    relevance: Number,
    products: {
      type: [mongoose.Types.ObjectId],
      of: Number,
    },
  },
  { timestamps: true }
);

const Title = mongoose.model("Title", TitleSchema);
export default Title;