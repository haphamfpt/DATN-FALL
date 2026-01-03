import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
      default: "",
    },
    images: [
      {
        url: { type: String },
        alt: { type: String, default: "Review image" },
      },
    ],
    helpful: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ], 
  },
  {
    timestamps: true,
  }
);

reviewSchema.index({ product: 1 });
reviewSchema.index({ user: 1, product: 1 }, { unique: true }); 

const Review = mongoose.model("Review", reviewSchema);

export default Review;