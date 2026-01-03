import React, { useState } from "react";
import toast from "react-hot-toast";
import { Star, StarFill } from "react-bootstrap-icons";

const ProductReviewForm = ({ productId, productName }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Vui lòng chọn số sao đánh giá!");
      return;
    }

    setSubmitting(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`/api/reviews/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rating,
          comment: comment.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gửi đánh giá thất bại");
      }

      toast.success(`Cảm ơn bạn đã đánh giá "${productName}"!`);
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(err.message || "Có lỗi xảy ra khi gửi đánh giá");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-4 p-4 bg-light rounded border">
      <h6 className="fw-bold mb-3 text-primary">
        Đánh giá sản phẩm: <span className="text-dark">{productName}</span>
      </h6>

      {/* Sao đánh giá */}
      <div className="mb-3">
        <label className="form-label fw-semibold small">Chọn số sao *</label>
        <div className="d-flex align-items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className="cursor-pointer me-2"
              onClick={() => setRating(star)}
              style={{ fontSize: "28px" }}
            >
              {rating >= star ? (
                <StarFill className="text-warning" />
              ) : (
                <Star className="text-muted" />
              )}
            </span>
          ))}
          <span className="ms-3 text-muted">
            {rating > 0 ? `${rating} sao` : "Chưa chọn"}
          </span>
        </div>
      </div>

      {/* Bình luận */}
      <div className="mb-3">
        <label className="form-label fw-semibold small">Nhận xét của bạn (tùy chọn)</label>
        <textarea
          className="form-control"
          rows="3"
          placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={submitting || rating === 0}
        className="btn btn-primary btn-sm px-4"
      >
        {submitting ? "Đang gửi..." : "Gửi đánh giá"}
      </button>
    </div>
  );
};

export default ProductReviewForm;