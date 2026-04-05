import { model, Schema } from "mongoose";

const userRecords = new Schema(
  {
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },

    category: {
      type: String,
      default: "Other",
    },

    date: {
      type: Date,
      default: Date.now,
    },

    description: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Record = model("Record", userRecords);

export default Record;
