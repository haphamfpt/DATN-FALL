import mongoose from "mongoose";

const refundSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      unique: true, // gộp luôn index vào đây
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    payment_method: {
      type: String,
      enum: ["vnpay", "cod"],
      required: true,
    },

    transaction_id: {
      type: String,
      required: true,
    },

    refund_amount: {
      type: Number,
      required: true,
      min: 0,
    },

    refund_reason: {
      type: String,
      trim: true,
    },

    refund_status: {
      type: String,
      enum: ["pending", "confirm", "success", "failed", "rejected"],
      default: "pending",
    },

    refund_response: {
      type: Object,
    },

    refunded_at: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Refund = mongoose.model("Refund", refundSchema);
export default Refund;
