import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema(
  {
    title: String,
    source: Number,
    insight: String,
    sector: String,
  },
  { timestamps: true }
);

const Topic = mongoose.model("Topic", TopicSchema);
export default Topic;