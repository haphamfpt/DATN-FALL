import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Spinner, Alert, Badge } from "react-bootstrap";
import { Calendar, Clock, User, ArrowLeft } from "react-feather";
import "./BlogDetail.scss";

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const [detailRes] = await Promise.all([
          fetch(`/api/blogs/${slug}`),
          fetch(`/api/blogs/${slug}/view`, { method: "PUT" }),
        ]);

        if (!detailRes.ok) {
          const err = await detailRes.json();
          throw new Error(err.message || "Bài viết không tồn tại");
        }

        const data = await detailRes.json();
        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <section className="py-5">
        <Container className="text-center py-5">
          <Spinner animation="border" variant="primary" size="lg" />
          <p className="mt-3 text-muted fs-5">Đang tải bài viết...</p>
        </Container>
      </section>
    );
  }

  if (error || !blog) {
    return (
      <section className="py-5">
        <Container>
          <Alert variant="danger" className="text-center py-4">
            <h4>Không tìm thấy bài viết</h4>
            <p className="mb-0">{error || "Bài viết đã bị gỡ hoặc không tồn tại"}</p>
            <Link to="/blog" className="btn btn-outline-danger mt-3">
              <ArrowLeft size={18} /> Quay lại danh sách
            </Link>
          </Alert>
        </Container>
      </section>
    );
  }

  return (
    <article className="blog-detail py-5">
      <Container>
        {/* Nút quay lại */}
        <Link to="/blog" className="btn-back mb-4 d-inline-flex align-items-center gap-2">
          <ArrowLeft size={20} />
          <span>Quay lại danh sách</span>
        </Link>

        <div className="blog-header text-center mb-5">
          <h1 className="blog-title display-4 fw-bold">{blog.title}</h1>
          
          <div className="blog-meta mt-4 d-flex justify-content-center align-items-center gap-4 flex-wrap">
            <span className="d-flex align-items-center gap-2">
              <Calendar size={18} />
              {new Date(blog.createdAt).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="d-flex align-items-center gap-2">
              <Clock size={18} />
              {blog.readTime} phút đọc
            </span>
            <span className="d-flex align-items-center gap-2">
              <User size={18} />
              {blog.author || "AVELINE Team"}
            </span>
          </div>

        </div>

        <div className="blog-cover mb-5 rounded-4 overflow-hidden shadow-lg">
          <img src={blog.coverImage} alt={blog.title} className="w-100" />
        </div>

        <div className="blog-excerpt mx-auto">
          {blog.excerpt}
        </div>

        <div className="blog-content mx-auto">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>

      </Container>
    </article>
  );
};

export default BlogDetail;