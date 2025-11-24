import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Calendar, Clock, User } from "react-feather";
import "./BlogList.css";

const BlogList = ({ posts = [], title = "TIN TỨC MỚI NHẤT", limit }) => {
  const displayPosts = limit ? posts.slice(0, limit) : posts;

  if (displayPosts.length === 0) {
    return (
      <section className="py-5">
        <Container>
          <p className="text-center text-muted fs-5">Chưa có bài viết nào.</p>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-5">
      <Container>
        <h2 className="text-center fw-bold mb-5 display-6 text-primary">
          {title}
        </h2>

        <Row className="g-4 g-xl-5">
          {displayPosts.map((post) => (
            <Col md={6} lg={4} key={post.id || post._id}>
              <Card className="blog-card h-100 border-0 shadow-sm overflow-hidden">
                <div className="blog-img-wrapper">
                  <Card.Img
                    variant="top"
                    src={post.image}
                    alt={post.title}
                    className="blog-img"
                  />
                  <div className="blog-overlay"></div>
                  {post.category && (
                    <Badge className="blog-category">
                      {post.category}
                    </Badge>
                  )}
                </div>

                <Card.Body className="d-flex flex-column p-4">
                  <Card.Title className="fw-bold fs-4 text-dark mb-3 line-clamp-2">
                    <Link to={`/blog/${post.slug || post.id}`} className="text-decoration-none text-dark hover-primary">
                      {post.title}
                    </Link>
                  </Card.Title>

                  <Card.Text className="text-muted flex-grow-1 line-clamp-3 mb-4">
                    {post.excerpt || post.description?.slice(0, 120) + "..."}
                  </Card.Text>

                  <div className="d-flex align-items-center justify-content-between text-muted small mt-auto">
                    <div className="d-flex gap-3">
                      <span className="d-flex align-items-center gap-1">
                        <Calendar size={16} />
                        {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                      </span>
                      <span className="d-flex align-items-center gap-1">
                        <Clock size={16} />
                        {post.readTime || "3"} phút đọc
                      </span>
                    </div>

                    {post.author && (
                      <span className="d-flex align-items-center gap-1">
                        <User size={16} />
                        {post.author}
                      </span>
                    )}
                  </div>

                  <Link
                    to={`/blog/${post.slug || post.id}`}
                    className="btn btn-outline-primary rounded-pill mt-3 px-4 py-2 fw-semibold"
                  >
                    Đọc thêm
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {limit && posts.length > limit && (
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