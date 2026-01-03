// controllers/reviewController.js
import mongoose from "mongoose";
import Review from "../models/Review.js";
import Product from "../models/Product.js";

// Tạo đánh giá
export const createReview = async (req, res) => {
  try {
    const { rating, comment, images } = req.body;
    const productId = req.params.productId;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "ID sản phẩm không hợp lệ" });
    }

    const existingReview = await Review.findOne({ user: userId, product: productId });
    if (existingReview) {
      return res.status(400).json({ message: "Bạn đã đánh giá sản phẩm này rồi" });
    }

    const review = await Review.create({
      user: userId,
      product: productId,
      rating: Number(rating),
      comment: comment?.trim() || "",
      images: images || [],
    });

    await updateProductRating(productId);

    const populatedReview = await Review.findById(review._id)
      .populate("user", "name avatar")
      .lean();

    res.status(201).json({
      message: "Đánh giá thành công",
      review: populatedReview,
    });
  } catch (error) {
    console.error("Create review error:", error);
    res.status(500).json({ message: "Lỗi server khi tạo đánh giá" });
  }
};

// Lấy đánh giá theo sản phẩm (có phân trang)
export const getReviewsByProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = 10;
    const skip = (page - 1) * limit;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "ID sản phẩm không hợp lệ" });
    }

    const [reviews, total] = await Promise.all([
      Review.find({ product: productId })
        .populate("user", "name avatar")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Review.countDocuments({ product: productId }),
    ]);

    res.json({
      reviews,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalReviews: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Get reviews error:", error);
    res.status(500).json({ message: "Lỗi server khi lấy đánh giá" });
  }
};

// Xóa đánh giá
export const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user._id;
    const userRole = req.user.role;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Không tìm thấy đánh giá" });
    }

    if (review.user.toString() !== userId.toString() && userRole !== "admin") {
      return res.status(403).json({ message: "Bạn không có quyền xóa đánh giá này" });
    }

    await Review.findByIdAndDelete(reviewId);
    await updateProductRating(review.product);

    res.json({ message: "Xóa đánh giá thành công" });
  } catch (error) {
    console.error("Delete review error:", error);
    res.status(500).json({ message: "Lỗi server khi xóa đánh giá" });
  }
};

// Đánh dấu hữu ích / bỏ hữu ích
export const toggleHelpful = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Không tìm thấy đánh giá" });
    }

    const userIdStr = req.user._id.toString();
    const index = review.helpful.findIndex((id) => id.toString() === userIdStr);

    if (index === -1) {
      review.helpful.push(req.user._id);
    } else {
      review.helpful.splice(index, 1);
    }

    await review.save();

    res.json({
      message: "Cập nhật thành công",
      helpfulCount: review.helpful.length,
      isHelpful: index === -1,
    });
  } catch (error) {
    console.error("Toggle helpful error:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Cập nhật rating trung bình cho sản phẩm
const updateProductRating = async (productId) => {
  try {
    const stats = await Review.aggregate([
      { $match: { product: new mongoose.Types.ObjectId(productId) } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
          numReviews: { $sum: 1 },
        },
      },
    ]);

    const avgRating = stats.length > 0 ? Math.round(stats[0].avgRating * 10) / 10 : 0;
    const numReviews = stats.length > 0 ? stats[0].numReviews : 0;

    await Product.findByIdAndUpdate(
      productId,
      { rating: avgRating, numReviews },
      { new: true }
    );
  } catch (error) {
    console.error("Update product rating error:", error);
  }
};