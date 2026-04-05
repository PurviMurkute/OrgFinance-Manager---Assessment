import mongoose from "mongoose";
import Record from "../models/Record.js";

const getRecords = async (req, res) => {
  try {
    const records = await Record.find({ isDeleted: false }).populate(
      "createdBy",
      "username email",
    );

    res.status(200).json({
      success: true,
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
  createRecord,
  updateRecord,
  softDelete,
  getTempDeletedRecords,
  restoreRecord,
  deleteRecord,
};
