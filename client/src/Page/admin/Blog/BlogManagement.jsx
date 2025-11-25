import React, { useState, useEffect } from "react";
import api from "../../../utils/axiosInstance";
import { toast, Toaster } from "react-hot-toast";
import {
  PencilSquare,
  Trash,
  PlusLg,
  Eye,
  EyeSlash,
} from "react-bootstrap-icons";
import { format } from "date-fns";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    coverImage: "",
    author: "AVELINE Team",
    readTime: 5,
    tags: "",
    isPublished: true,
  });

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/blogs");
      setBlogs(res.data.blogs || []);
    } catch {
      toast.error("Không thể tải danh sách bài viết!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openModal = (blog = null) => {
    setEditingBlog(blog);
    if (blog) {
      setFormData({
        title: blog.title || "",
        excerpt: blog.excerpt || "",
        content: blog.content || "",
        coverImage: blog.coverImage || "",
        author: blog.author || "AVELINE Team",
        readTime: blog.readTime || 5,
        tags: blog.tags?.join(", ") || "",
        isPublished: blog.isPublished ?? true,
      });
    } else {
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        coverImage: "",
        author: "AVELINE Team",
        readTime: 5,
        tags: "",
        isPublished: true,
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingBlog(null);
  };

  const handleCreate = async () => {
    if (!validateForm()) return;

    try {
      const res = await api.post("/blogs", {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      });
      setBlogs([res.data, ...blogs]);
      toast.success("Thêm bài viết thành công!");
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.message || "Thêm bài viết thất bại!");
    }
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    try {
      const res = await api.put(`/blogs/${editingBlog._id}`, {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      });
      setBlogs(blogs.map((b) => (b._id === editingBlog._id ? res.data : b)));
      toast.success("Cập nhật bài viết thành công!");
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.message || "Cập nhật thất bại!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa bài viết này?")) return;
    try {
      await api.delete(`/blogs/${id}`);
      setBlogs(blogs.filter((b) => b._id !== id));
      toast.success("Xóa bài viết thành công!");
    } catch {
      toast.error("Không thể xóa bài viết!");
    }
  };

  const validateForm = () => {
    if (!formData.title.trim())
      return toast.error("Tiêu đề không được để trống!");
    if (!formData.excerpt.trim())
      return toast.error("Tóm tắt không được để trống!");
    if (!formData.content.trim())
      return toast.error("Nội dung không được để trống!");
    if (!formData.coverImage.trim())
      return toast.error("Vui lòng nhập link ảnh bìa!");
    if (formData.readTime < 1)
      return toast.error("Thời gian đọc phải ≥ 1 phút!");
    return true;
  };

  return (
    <>
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <button className="btn btn-dark px-4" onClick={() => openModal()}>
            <PlusLg className="me-2" />
            Viết bài mới
          </button>
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5 text-secondary">Đang tải...</div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-5 text-secondary">
                Chưa có bài viết nào
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0 align-middle">
                  <thead className="table-light text-secondary small text-uppercase">
                    <tr>
                      <th className="ps-4">STT</th>
                      <th className="w-50">Tiêu đề</th>
                      <th>Tác giả</th>
                      <th>Ngày đăng</th>
                      <th>Lượt xem</th>
                      <th className="text-center">Trạng thái</th>
                      <th className="text-center">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs.map((blog, index) => (
                      <tr key={blog._id}>
                        <td className="ps-4 fw-bold">{index + 1}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={blog.coverImage}
                              alt={blog.title}
                              className="me-3 rounded"
                              style={{
                                width: 200,
                                height: 100,
                                objectFit: "cover",
                              }}
                              onError={(e) =>
                                (e.target.src =
                                  "https://via.placeholder.com/60")
                              }
                            />
                            <div>
                              <div className="fw-bold text-dark">
                                {blog.title}
                              </div>
                              <small
                                className="text-muted text-truncate d-block"
                                style={{ maxWidth: "400px" }}
                              >
                                {blog.excerpt}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td>{blog.author}</td>
                        <td className="small">
                          {format(new Date(blog.createdAt), "dd/MM/yyyy")}
                        </td>
                        <td>{blog.views || 0}</td>
                        <td className="text-center">
                          <span
                            className={`badge ${
                              blog.isPublished ? "bg-success" : "bg-secondary"
                            }`}
                          >
                            {blog.isPublished ? <Eye /> : <EyeSlash />}{" "}
                            {blog.isPublished ? "Công khai" : "Ẩn"}
                          </span>
                        </td>
                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => openModal(blog)}
                          >
                            <PencilSquare />
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(blog._id)}
                          >
                            <Trash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content border-0 shadow">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">
                  {editingBlog ? "Sửa bài viết" : "Viết bài mới"}
                </h5>
                <button className="btn-close" onClick={closeModal}></button>
              </div>

              <div className="modal-body pt-0">
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      Tiêu đề bài viết *
                    </label>
                    <input
                      type="text"
                      name="title"
                      className="form-control form-control-lg"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Nhập tiêu đề..."
                    />
                  </div>

                  <div className="col-md-8">
                    <label className="form-label fw-semibold">
                      Link ảnh bìa *
                    </label>
                    <input
                      type="text"
                      name="coverImage"
                      className="form-control"
                      value={formData.coverImage}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Thời gian đọc (phút)
                    </label>
                    <input
                      type="number"
                      name="readTime"
                      className="form-control"
                      value={formData.readTime}
                      onChange={handleInputChange}
                      min="1"
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      Tóm tắt ngắn *
                    </label>
                    <textarea
                      name="excerpt"
                      className="form-control"
                      rows="3"
                      value={formData.excerpt}
                      onChange={handleInputChange}
                      placeholder="Mô tả ngắn gọn..."
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold mb-2">
                      Nội dung bài viết *
                    </label>
                    <div
                      className="border rounded"
                      style={{ minHeight: "400px" }}
                    >
                      <CKEditor
                        editor={ClassicEditor}
                        data={formData.content}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setFormData((prev) => ({ ...prev, content: data }));
                        }}
                        config={{
                          toolbar: [
                            "heading",
                            "|",
                            "bold",
                            "italic",
                            "link",
                            "bulletedList",
                            "numberedList",
                            "|",
                            "outdent",
                            "indent",
                            "|",
                            "imageUpload",
                            "blockQuote",
                            "insertTable",
                            "mediaEmbed",
                            "|",
                            "undo",
                            "redo",
                          ],
                          height: 400,
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-5">
                    <label className="form-label fw-semibold">Tác giả</label>
                    <input
                      type="text"
                      name="author"
                      className="form-control"
                      value={formData.author}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="col-md-5">
                    <label className="form-label fw-semibold">
                      Tags (cách nhau bằng dấu phẩy)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      className="form-control"
                      value={formData.tags}
                      onChange={handleInputChange}
                      placeholder="tập gym, quần áo thể thao, người mới"
                    />
                  </div>

                  <div className="col-md-2 d-flex align-items-end">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="isPublished"
                        checked={formData.isPublished}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            isPublished: e.target.checked,
                          }))
                        }
                      />
                      <label
                        className="form-check-label fw-semibold"
                        htmlFor="isPublished"
                      >
                        Công khai
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer border-0">
                <button className="btn btn-secondary px-4" onClick={closeModal}>
                  Hủy
                </button>
                <button
                  className="btn btn-dark px-5"
                  onClick={editingBlog ? handleUpdate : handleCreate}
                >
                  {editingBlog ? "Cập nhật" : "Đăng bài"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogManagement;
