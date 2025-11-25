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
        const limitParam = limit ? limit : 12;
        const res = await fetch(`/api/blogs?page=1&limit=${limitParam}`);

        if (!res.ok) throw new Error("Không thể tải bài viết");
        const data = await res.json();
        setPosts(data.blogs || []);
      } catch (err) {
        setError(err.message || "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [limit]);

  if (loading) {
    return (
      <section className="py-5">
        <Container className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">Đang tải bài viết...</p>
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
    <section className="blog-section py-5">
      <Container>
        <h2 className="section-title">{title}</h2>

        <Row className="g-4 g-xl-5">
          {displayPosts.map((post) => (
            <Col md={6} lg={4} key={post._id}>
              <Card className="blog-card">
                <div className="blog-img-wrapper">
                  <Card.Img
                    variant="top"
                    src={post.coverImage}
                    alt={post.title}
                    className="blog-img"
                  />
                  <div className="blog-overlay" />
                  {post.tags?.[0] && (
                    <Badge className="blog-category">{post.tags[0]}</Badge>
                  )}
                </div>

                <Card.Body className="d-flex flex-column">
                  <Card.Title className="blog-title text-center">
                    <Link to={`/blog/${post.slug}`} className="title-link">
                      {post.title}
                    </Link>
                  </Card.Title>

                  <Card.Text className="blog-excerpt">{post.excerpt}</Card.Text>

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
                    style={{ width: "100%" }}
                    className="text-center btn-readmore mt-3"
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
            <Link to="/blog" className="btn-viewall">
              Xem tất cả bài viết
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
};

export default BlogList;
