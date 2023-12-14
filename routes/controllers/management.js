import mongoose from "mongoose";
import User from "../../models/User.js";
import Title from "../../models/Title.js";

export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;

    const userWithStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "affiliatestats",
          localField: "title",
          foreignField: "topic",
          as: "affiliateStats",
        },
      },
      { $unwind: "$affiliateStats" },
    ]);

    const impactTitles = await Promise.all(
      userWithStats[0].affiliateStats.affiliateImpacts.map((id) => {
        return Titles.findById(id);
      })
    );
    const filteredImpactTitles = impactTitles.filter(
      (title) => title !== null
    );

    res
      .status(200)
      .json({ user: userWithStats[0], impacts: filteredImpactTitles });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};