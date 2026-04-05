import { Schema, model } from "mongoose";

const activitySchema = new Schema(
  {
    action: {
      type: String,
      required: true
    },

    entityType: {
      type: String,
      enum: ["RECORD", "USER"],
      required: true
    },

    entityId: {
      type: Schema.Types.ObjectId,
      required: true
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },

    message: String
  },
  { timestamps: true }
);

const RecentActivity = model("RecentActivity", activitySchema);

export default RecentActivity;