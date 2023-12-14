import Topic from "../../models/Topic.js";
import TopicStat from "../../models/TopicStat.js";
import User from "../../models/User.js";
import Title from "../../models/Title.js";
import getCountryIso3 from "country-iso-2-to-3";

export const getTopics = async (req, res) => {
  try {
    const Topics = await Topics.find();

    const TopicsWithStats = await Promise.all(
      Topics.map(async (Topics) => {
        const stat = await TopicsStat.find({
          TopicsId: Topics._id,
        });
        return {
          ...Topics._doc,
          stat,
        };
      })
    );

    res.status(200).json(TopicsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSectors = async (req, res) => {
  try {
    const Sectors = await User.find({ role: "user" }).select("-password");
    res.status(200).json(Sectors);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTitles = async (req, res) => {
  try {
    // sort should look like this: { "field": "userId", "sort": "desc"}
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const titles = await Title.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Title.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      titles,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGeography = async (req, res) => {
  try {
    const users = await User.find();

    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});

    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );

    res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};