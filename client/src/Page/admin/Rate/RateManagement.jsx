import React, { useState, useEffect } from "react";
import api from "../../../utils/axiosInstance";
import { toast, Toaster } from "react-hot-toast";
import { Eye, EyeSlash, Trash } from "react-bootstrap-icons";
import { format } from "date-fns";

const CommentManagement = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await api.get("admin/reviews"); 
      setComments(res.data || []);
    } catch (err) {
      toast.error("Không thể tải danh sách bình luận!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleToggleHidden = async (id, currentHidden) => {
    if (!window.confirm(`Bạn có chắc muốn ${currentHidden ? "hiện" : "ẩn"} bình luận này?`)) return;

    try {
      const res = await api.patch(`admin/reviews/${id}/toggle-hidden`);
      setComments(comments.map((c) => (c._id === id ? res.data : c)));
      toast.success(currentHidden ? "Đã hiện bình luận!" : "Đã ẩn bình luận!");
    } catch{
      toast.error("Thao tác thất bại!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa bình luận này? Hành động không thể hoàn tác!")) return;

    try {
      await api.delete(`admin/reviews/${id}`);
      setComments(comments.filter((c) => c._id !== id));
      toast.success("Xóa bình luận thành công!");
    } catch {
      toast.error("Không thể xóa bình luận!");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="mb-0 fw-bold">Quản lý bình luận & đánh giá</h3>
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5 text-secondary">Đang tải...</div>
            ) : comments.length === 0 ? (
              <div className="text-center py-5 text-secondary">
                Chưa có bình luận nào
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0 align-middle">
                  <thead className="table-light text-secondary small text-uppercase">
                    <tr>
                      <th className="ps-4">STT</th>
                      <th>Sản phẩm</th>
                      <th>Người dùng</th>
                      <th>Đánh giá</th>
                      <th>Nội dung bình luận</th>
                      <th>Ngày tạo</th>
                      <th className="text-center">Trạng thái</th>
                      <th className="text-center">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comments.map((comment, index) => {
                      const userName = comment.user?.name || comment.user?.email || "Khách";
                      const productName = comment.product?.name || "Sản phẩm đã xóa";

                      return (
                        <tr key={comment._id}>
                          <td className="ps-4 fw-bold">{index + 1}</td>
                          <td className="fw-medium" style={{ maxWidth: "200px" }}>
                            <div className="text-truncate" title={productName}>
                              {productName}
                            </div>
                          </td>
                          <td>
                            <div>{userName}</div>
                            <small className="text-muted">{comment.user?.email}</small>
                          </td>
                          <td>
                            <span className="fw-bold text-warning">
                              {"★".repeat(comment.rating)}
                              {"☆".repeat(5 - comment.rating)}
                            </span>
                            <small className="text-muted ms-2">({comment.rating})</small>
                          </td>
                          <td style={{ maxWidth: "300px" }}>
                            <div className="text-truncate" title={comment.comment}>
                              {comment.comment || <em className="text-muted">Không có nội dung</em>}
                            </div>
                            {comment.images?.length > 0 && (
                              <small className="text-primary">
                                {" "}
                                • Có {comment.images.length} ảnh
                              </small>
                            )}
                          </td>
                          <td className="small">
                            {format(new Date(comment.createdAt), "dd/MM/yyyy HH:mm")}
                          </td>
                          <td className="text-center">
                            <span
                              className={`badge ${comment.is_hidden ? "bg-secondary" : "bg-success"}`}
                            >
                              {comment.is_hidden ? "Đã ẩn" : "Hiển thị"}
                            </span>
                          </td>
                          <td className="text-center">
                            <button
                              className={`btn btn-sm me-2 ${
                                comment.is_hidden
                                  ? "btn-outline-success"
                                  : "btn-outline-warning"
                              }`}
                              onClick={() => handleToggleHidden(comment._id, comment.is_hidden)}
                              title={comment.is_hidden ? "Hiện bình luận" : "Ẩn bình luận"}
                            >
                              {comment.is_hidden ? <Eye /> : <EyeSlash />}
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(comment._id)}
                              title="Xóa bình luận"
                            >
                              <Trash />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentManagement;