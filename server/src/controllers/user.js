import User from "../models/User.js";
import { logActivity } from "../services/activity.service.js";

const fetchAllUsers = async (req, res) => {
  try {
    const activeUsers = await User.find(
      { role: { $ne: "admin" }, status: "active" },
      "-password",
    );
    const inactiveUsers = await User.find(
      { role: { $ne: "admin" }, status: "inactive" },
      "-password",
    );
    if (activeUsers.length === 0 && inactiveUsers.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
        users: { activeUsers: [], inactiveUsers: [] },
      });
    }
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users: {
        activeUsers,
        inactiveUsers,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "failed to fetch users",
      error: error.message,
    });
  }
};

const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { role }, { new: true });

    await logActivity({
      action: "ROLE_UPDATE",
      entityType: "USER",
      entityId: user._id,
      user: req.user._id,
      message: `Changed role of ${user.username} to ${user.role}`,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update user role",
      error: error.message,
    });
  }
};

const updateUserStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { status }, { new: true });

    await logActivity({
      action: "STATUS_UPDATE",
      entityType: "USER",
      entityId: user._id,
      user: req.user._id,
      message: `Status of ${user.username} changed to ${user.status}`,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User status updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update user status",
      error: error.message,
    });
  }
};

export { fetchAllUsers, updateUserRole, updateUserStatus };
