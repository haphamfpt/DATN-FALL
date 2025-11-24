import { useState, useEffect } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  InputGroup,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, User, Mail, Lock } from "react-feather";
import "../../styles/auth.css";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // Tự động chuyển form theo URL
  useEffect(() => {
    if (location.pathname.includes("/register")) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [location.pathname]);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  // Validate form realtime
  const validateForm = () => {
    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setError("Email không hợp lệ");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Mật khẩu phải ít nhất 6 ký tự");
      return false;
    }
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return false;
    }
    if (!isLogin && formData.name.trim().length < 2) {
      setError("Họ tên phải ít nhất 2 ký tự");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (!isLogin) {
        // ĐĂNG KÝ
        const res = await axios.post("/api/auth/register", {
          name: formData.name.trim(),
          email: formData.email.toLowerCase(),
          password: formData.password,
        });

        setSuccess("Đăng ký thành công! Đang chuyển sang đăng nhập...");
        setTimeout(() => {
          setIsLogin(true);
          setFormData({
            ...formData,
            name: "",
            password: "",
            confirmPassword: "",
          });
          navigate("/login", { replace: true });
        }, 2000);
      } else {
        // ĐĂNG NHẬP
        const res = await axios.post("/api/auth/login", {
          email: formData.email.toLowerCase(),
          password: formData.password,
        });

        // Lưu token + user
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        setSuccess("Đăng nhập thành công! Đang chuyển về trang chủ...");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Đã có lỗi xảy ra, vui lòng thử lại!";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <Container className="h-100 d-flex align-items-center justify-content-center">
        <Card className="auth-card border-0">
          <Card.Body className="p-5">
            {/* Header */}
            <div className="auth-header">
              <Link to="/" className="text-decoration-none">
                <h1 className="logo-text">AVELINE</h1>
              </Link>
            </div>

            {/* Thông báo */}
            {error && (
              <Alert variant="danger" className="mb-4">
                {error}
              </Alert>
            )}
            {success && (
              <Alert variant="success" className="mb-4">
                {success}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              {/* Tên */}
              {!isLogin && (
                <div className="auth-input-group">
                  <User className="input-icon" size={22} />
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Họ và tên"
                    className="auth-input"
                  />
                </div>
              )}

              {/* Email */}
              <div className="auth-input-group">
                <Mail className="input-icon" size={22} />
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email"
                  className="auth-input"
                />
              </div>

              {/* Mật khẩu */}
              <div className="auth-input-group">
                <Lock className="input-icon" size={22} />
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Mật khẩu"
                  className="auth-input"
                />
                <Button
                  variant="link"
                  className="eye-btn p-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </Button>
              </div>

              {/* Xác nhận mật khẩu */}
              {!isLogin && (
                <div className="auth-input-group">
                  <Lock className="input-icon" size={22} />
                  <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Nhập lại mật khẩu"
                    className="auth-input"
                  />
                  <Button
                    variant="link"
                    className="eye-btn p-0"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </Button>
                </div>
              )}

              {/* Nút submit */}
              <Button
                type="submit"
                disabled={loading}
                className="btn-submit w-100 mt-3"
              >
                {loading ? (
                  <>Đang xử lý...</>
                ) : isLogin ? (
                  "Đăng nhập"
                ) : (
                  "Tạo tài khoản"
                )}
              </Button>
            </Form>

            {/* Chuyển đổi */}
            <div className="switch-container">
              <span className="switch-text">
                {isLogin ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
              </span>
              <button
                type="button"
                className="switch-link bg-transparent border-0"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                  setSuccess("");
                  navigate(isLogin ? "/register" : "/login", { replace: true });
                }}
              >
                {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
              </button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AuthPage;
