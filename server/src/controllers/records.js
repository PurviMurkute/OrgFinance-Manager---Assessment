import Record from "../models/Record.js";

const getRecords = async (req, res) => {
  try {
    const records = await Record.find().populate("createdBy", "username email");

    res.status(200).json({
      success: true,
      data: records,
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
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create record",
      error: error.message,
    });
  }
};

const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
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

export { getRecords, createRecord, deleteRecord };
