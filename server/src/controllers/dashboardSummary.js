import {
  getSummaryService,
  categorySummary,
  recentActivity,
} from "../services/dashboard.service.js";

export const getSummary = async (req, res) => {
  try {
    const filters = req.query;

    const summaryData = await getSummaryService(filters);
    const categoryData = await categorySummary(filters);
    const recentActivities = await recentActivity();

    res.status(200).json({
      success: true,
      summaryData,
      categoryData,
      recentActivities,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "failed to fetch dashboard summary.",
        error: error.message,
      });
  }
};
