import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  variant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Variant",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

cartSchema.virtual("totalAmount").get(function () {
  return this.items.reduce((sum, item) => {
    return sum + (item.variant?.sale_price || 0) * item.quantity;
  }, 0);
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;