import RecentActivity from "../models/RecentActivity.js";
import Record from "../models/Record.js";
import buildFilter from "../utils/recordFilters.js";

const getSummaryService = async (filters) => {
  const matchStage = buildFilter(filters);
  const result = await Record.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
      },
    },
  ]);

  let income = 0;
  let expense = 0;

  result.forEach((item) => {
    if (item._id === "income") income = item.total;
    if (item._id === "expense") expense = item.total;
  });

  return {
    income,
    expense,
    netBalance: income - expense,
  };
};

const categorySummary = async (filters) => {
  const matchStage = buildFilter(filters);
  const result = await Record.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        total: 1,
      },
    },
  ]);

  return result;
};

const recentActivity = async () => {
  const activities = await RecentActivity.find()
    .sort({ createdAt: -1 })
    .populate("user", "name email");

    return activities.map(item => ({
    action: item.action,
    entityType: item.entityType,
    message: item.message,
    doneBy: item.user, // 👈 renamed here
    createdAt: item.createdAt
  }));
};

export { getSummaryService, categorySummary, recentActivity };
