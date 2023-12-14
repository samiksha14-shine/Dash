import User from "../../models/User.js";
import OverallStat from "../../models/OverallStat.js";
import Title from "../../models/Title.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    // hardcoded values
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";

    /* Recent Title */
    const Title = await Title.find()
      .limit(50)
      .sort({ createdOn: -1 });

    /* Overall Stats */
    const overallStat = await OverallStat.find({ year: currentYear });

    const {
      totalSectors,
      yearlyTotalSoldUnits,
      yearlyImpactsTotal,
      monthlyData,
      impactsByPestle,
    } = overallStat[0];

    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = overallStat[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });

    res.status(200).json({
      totalSectors,
      yearlyTotalSoldUnits,
      yearlyImpactTotal,
      monthlyData,
      impactsByPestle,
      thisMonthStats,
      todayStats,
      titles,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};