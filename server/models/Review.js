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
      min: [1, "Đánh giá phải từ 1 sao"],
      max: [5, "Đánh giá tối đa 5 sao"],
    },
    comment: {
      type: String,
      trim: true,
      default: "",
      maxlength: [1000, "Bình luận không được quá 1000 ký tự"],
    },
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String, default: "Ảnh đánh giá" },
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index({ user: 1, product: 1 }, { unique: true });

reviewSchema.index({ product: 1, createdAt: -1 });

const Review = mongoose.model("Review", reviewSchema);

export default Review;