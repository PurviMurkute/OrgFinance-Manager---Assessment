import mongoose from "mongoose";
import Record from "../models/Record.js";
import { logActivity } from "../services/activity.service.js";

const getRecords = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const total = await Record.countDocuments({ isDeleted: false });

    const records = await Record.find({ isDeleted: false })
      .populate("createdBy", "username email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalRecords: total,
      data: records,
      message: "Records fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch records",
      error: error.message,
    });
  }
};

const filterRecords = async (req, res) => {
  try {
    const { category, type, date, page = 1, limit = 5 } = req.query;

    let query = { isDeleted: false };

    if (category) {
      query.category = category;
    }

    if (type) {
      query.type = type.toLowerCase();
    }

    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);

      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      query.date = { $gte: start, $lte: end };
    }

    const skip = (page - 1) * limit;

    const total = await Record.countDocuments(query);

    const records = await Record.find(query)
      .populate("createdBy", "username email")
      .sort({ date: -1 })
      .skip(skip)
      .limit(Number(limit));

    if (records.length === 0) {
      return res.status(404).json({
        success: false,
        currentPage: Number(page),
        totalPages: 0,
        totalRecords: 0,
        data: [],
        message: `No records found`,
      });
    }

    res.status(200).json({
      success: true,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      totalRecords: total,
      data: records,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const searchRecords = async (req, res) => {
  try {
    const { query, page = 1, limit = 5 } = req.query;

    let searchQuery = { isDeleted: false };

    if (query) {
      const numericValue = Number(query);

      searchQuery.$or = [
        { type: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },

        ...(isNaN(numericValue) ? [] : [{ amount: numericValue }]),
      ];
    }

    const skip = (page - 1) * limit;

    const total = await Record.countDocuments(searchQuery);

    const records = await Record.find(searchQuery)
      .populate("createdBy", "username email")
      .sort({ date: -1 })
      .skip(skip)
      .limit(Number(limit));

    if (records.length === 0) {
      return res.status(404).json({
        success: false,
        currentPage: Number(page),
        totalPages: 0,
        totalRecords: 0,
        data: [],
        message: `No records found for the search ${query}`,
      });
    }

    res.status(200).json({
      success: true,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      totalRecords: total,
      data: records,
      message: "Search results fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createRecord = async (req, res) => {
  try {
    const { amount, category, type, description } = req.body;
    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Amount is required",
      });
    }

    if (!type || !["income", "expense"].includes(type.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: "Type must be either 'income' or 'expense'",
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }
    const newRecord = new Record({
      amount,
      category,
      type,
      description,
      createdBy: req.user._id,
    });
    await newRecord.save();

    await logActivity({
      action: "CREATE",
      entityType: "RECORD",
      entityId: newRecord._id,
      user: req.user._id,
      message: `Added ${newRecord.category} as ${newRecord.type} with amount ${newRecord.amount}`,
    });
    res.status(201).json({
      success: true,
      data: newRecord,
      message: "Record created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create record",
      error: error.message,
    });
  }
};

const updateRecord = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid record ID",
      });
    }

    const { amount, category, type, description } = req.body;
    const record = await Record.findById(id);
    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }
    const updatedRecord = await Record.findByIdAndUpdate(
      id,
      { amount, category, type, description },
      { new: true },
    );

    await logActivity({
      action: "UPDATE",
      entityType: "RECORD",
      entityId: record._id,
      user: req.user._id,
      message: `Updated ${record.category} ${record.type}`,
    });
    res.status(200).json({
      success: true,
      data: updatedRecord,
      message: "Record updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update record",
      error: error.message,
    });
  }
};

const softDelete = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid record ID",
      });
    }

    const record = await Record.findOneAndUpdate(
      { _id: id, isDeleted: false },
      {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: req.user._id,
      },
      { new: true },
    );

    await logActivity({
      action: "DELETE",
      entityType: "RECORD",
      entityId: record._id,
      user: req.user._id,
      message: `Moved to trash ${record.category} ${record.type}`,
    });

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: record,
      message: "Record moved to trash",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete record",
      error: error.message,
    });
  }
};

const getTempDeletedRecords = async (req, res) => {
  try {
    const deletedRecords = await Record.find({
      isDeleted: true,
    }).sort({ deletedAt: -1 });

    if (deletedRecords.length === 0) {
      return res.status(404).json({
        success: false,
        data: [],
        message: "Trash is empty",
      });
    }

    return res.status(200).json({
      success: true,
      data: deletedRecords,
      message: "deleted records fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: [],
      message: error?.message,
    });
  }
};

const restoreRecord = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid record ID",
    });
  }

  try {
    const record = await Record.findOne({
      _id: id,
    });

    if (!record || record.isDeleted !== true) {
      return res.status(404).json({
        success: false,
        data: [],
        message: "Record not found",
      });
    }

    (((record.isDeleted = false),
    (record.deletedAt = null),
    (record.deletedBy = null)),
      await record.save());

    await logActivity({
      action: "RESTORE",
      entityType: "RECORD",
      entityId: record._id,
      user: req.user._id,
      message: `Restored ${record.category} ${record.type}`,
    });

    return res.status(200).json({
      success: true,
      data: record,
      message: "Record restored successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: null,
      message: error?.message,
    });
  }
};

const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid record ID",
      });
    }

    const record = await Record.findById(id);
    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }
    await Record.deleteOne({ _id: id });

    await logActivity({
      action: "DELETE",
      entityType: "RECORD",
      entityId: record._id,
      user: req.user._id,
      message: `Deleted permenantly ${record.category} ${record.type}`,
    });
    res.status(200).json({
      success: true,
      message: "Record deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete record",
      error: error.message,
    });
  }
};

export {
  getRecords,
  filterRecords,
  searchRecords,
  createRecord,
  updateRecord,
  softDelete,
  getTempDeletedRecords,
  restoreRecord,
  deleteRecord,
};
