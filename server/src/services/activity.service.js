import RecentActivity from "../models/RecentActivity.js";

export const logActivity = async ({
  action,
  entityType,
  entityId,
  user,
  message
}) => {
  await RecentActivity.create({
    action,
    entityType,
    entityId,
    user,
    message
  });
};