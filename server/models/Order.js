// models/Order.js
import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  variant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Variant",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  name: String,
  color: String,
  size: String,
  image: String,
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [orderItemSchema],

    subtotal: { type: Number, required: true },
    shippingFee: { type: Number, default: 30000 },
    discountAmount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },

    voucher: {
      code: String,
      voucherId: { type: mongoose.Schema.Types.ObjectId, ref: "Voucher" },
      type: { type: String, enum: ["fixed", "percent"] },
      value: Number,
      max_price: { type: Number, default: 0 },
    },

    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      note: String,
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
      default: "cod",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    orderStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "shipped",
        "delivered",
        "complete",
        "cancelled",
      ],
      default: "pending",
    },

    vnp_TxnRef: {
      type: String,
      index: true,
    },

    vnp_TransactionNo: {
      type: String,
    },

    vnp_BankCode: {
      type: String,
    },

    vnp_BankTranNo: {
      type: String,
    },

    vnp_CardType: {
      type: String,
    },

    vnp_PayDate: {
      type: String,
    },

    vnp_ResponseCode: {
      type: String,
    },

    vnpayResponse: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
