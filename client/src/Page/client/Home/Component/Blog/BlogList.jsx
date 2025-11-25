import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Spinner,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Calendar, Clock, User } from "react-feather";
import "./BlogList.scss";

const BlogList = ({ title = "TIN TỨC MỚI NHẤT", limit }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        const page = 1;
        const limitParam = limit ? limit : 12;
        const res = await fetch(`/api/blogs?page=${page}&limit=${limitParam}`);

        if (!res.ok) throw new Error("Không thể tải bài viết");

        const data = await res.json();
        setPosts(data.blogs || []);
      } catch (err) {
        setError(err.message || "Đã có lỗi xảy ra khi tải bài viết");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [limit]);

  if (loading) {
    return (
      <section className="py-5">
        <Container>
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3 text-muted">Đang tải bài viết...</p>
          </div>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-5">
        <Container>
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        </Container>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section className="py-5">
        <Container>
          <p className="text-center text-muted fs-5">Chưa có bài viết nào.</p>
        </Container>
      </section>
    );
  }

  const displayPosts = limit ? posts.slice(0, limit) : posts;

  return (
    <section className="py-5">
      <Container>
        <h2 className="text-center fw-bold mb-5 display-6 text-primary">
          {title}
        </h2>

        <Row className="g-4 g-xl-5">
          {displayPosts.map((post) => (
            <Col md={6} lg={4} key={post._id}>
              <Card className="blog-card h-100 border-0 shadow-sm overflow-hidden">
                <div className="blog-img-wrapper position-relative">
                  <Card.Img
                    variant="top"
                    src={post.coverImage}
                    alt={post.title}
                    className="blog-img"
                    style={{ objectFit: "cover", height: "220px" }}
                  />
                  <div className="blog-overlay"></div>
                </div>

                <Card.Body className="d-flex flex-column p-4">
                  <Card.Title className="fw-bold fs-4 text-dark mb-3 line-clamp-2 text-center">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-decoration-none text-dark hover-primary"
                    >
                      {post.title}
                    </Link>
                  </Card.Title>

                  <Card.Text className="text-muted flex-grow-1 line-clamp-3 mb-4">
                    {post.excerpt}
                  </Card.Text>

                  <div className="d-flex align-items-center text-muted small mt-auto">
                    <div className="d-flex gap-3 flex-wrap justify-content-center w-100">
                      <span className="d-flex align-items-center gap-1">
                        <Calendar size={16} />
                        {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                      </span>

                      <span className="d-flex align-items-center gap-1">
                        <Clock size={16} />
                        {post.readTime} phút đọc
                      </span>

                      <span className="d-flex align-items-center gap-1">
                        <User size={16} />
                        {post.author}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="btn btn-outline-primary rounded-pill mt-3 px-5 py-2 fw-semibold align-self-start"
                    style={{ width: "100%" }}
                  >
                    Đọc thêm
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {limit && posts.length >= limit && (
          <div className="text-center mt-5">
            <Link
              to="/blog"
              className="btn btn-primary rounded-pill px-5 py-3 fw-bold"
            >
              Xem tất cả bài viết
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
};

export default BlogList;
