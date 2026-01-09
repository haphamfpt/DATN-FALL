import { useState, useEffect } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, User, Mail, Lock } from "react-feather";
import "../../styles/auth.css";
import api from "../../utils/axiosInstance"; 

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
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.includes("/register")) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [location.pathname]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    setError("");
    setSuccess("");
  };

  const validateForm = () => {
    if (!formData.email || !formData.email.includes("@") || !formData.email.includes(".")) {
      setError("Vui lòng nhập email hợp lệ");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    }
    if (!isLogin) {
      if (!formData.name || formData.name.length < 2) {
        setError("Họ và tên phải có ít nhất 2 ký tự");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Mật khẩu xác nhận không khớp");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!isLogin) {
        await api.post("/auth/register", {
          name: formData.name,
          email: formData.email.toLowerCase(),
          password: formData.password,
        });

        setSuccess("Đăng ký thành công! Đang chuyển sang đăng nhập...");
        setTimeout(() => {
          setIsLogin(true);
          setFormData({ ...formData, name: "", password: "", confirmPassword: "" });
          navigate("/login", { replace: true });
        }, 2000);
      } else {
        const res = await api.post("/auth/login", {
          email: formData.email.toLowerCase(),
          password: formData.password,
        });

        const { token, user } = res.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setSuccess("Đăng nhập thành công! Đang chuyển hướng...");

        setTimeout(() => {
          if (user.role === "admin") {
            navigate("/admin", { replace: true });
          } else {
            navigate("/", { replace: true });
          }
        }, 1000);
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Đã có lỗi xảy ra. Vui lòng thử lại!";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <Container className="h-100 d-flex align-items-center justify-content-center">
        <Card className="auth-card border-0 shadow-lg">
          <Card.Body className="p-5">
            <div className="auth-header text-center mb-4">
              <Link to="/" className="text-decoration-none">
                <h1 className="logo-text fw-bold text-dark">AVELINE</h1>
              </Link>
              <p className="text-muted mt-2">
                {isLogin ? "Chào mừng trở lại!" : "Tạo tài khoản mới"}
              </p>
            </div>

            {error && (
              <Alert variant="danger" className="mb-4 py-3">
                <small>{error}</small>
              </Alert>
            )}
            {success && (
              <Alert variant="success" className="mb-4 py-3">
                <small>{success}</small>
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="auth-input-group mb-3 position-relative">
                  <User className="input-icon" size={22} />
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Họ và tên"
                    className="auth-input ps-5"
                  />
                </div>
              )}

              <div className="auth-input-group mb-3 position-relative">
                <Mail className="input-icon" size={22} />
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email"
                  className="auth-input ps-5"
                />
              </div>

              <div className="auth-input-group mb-3 position-relative">
                <Lock className="input-icon" size={22} />
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Mật khẩu"
                  className="auth-input ps-5 pe-5"
                />
                <Button
                  variant="link"
                  className="eye-btn position-absolute end-0 top-50 translate-middle-y"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </Button>
              </div>

              {!isLogin && (
                <div className="auth-input-group mb-4 position-relative">
                  <Lock className="input-icon" size={22} />
                  <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Nhập lại mật khẩu"
                    className="auth-input ps-5 pe-5"
                  />
                  <Button
                    variant="link"
                    className="eye-btn position-absolute end-0 top-50 translate-middle-y"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowConfirmPassword(!showConfirmPassword);
                    }}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </Button>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="btn-submit w-100 mt-4 py-3 fw-bold text-uppercase"
                variant="dark"
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Đang xử lý...
                  </>
                ) : isLogin ? (
                  "Đăng nhập"
                ) : (
                  "Tạo tài khoản"
                )}
              </Button>
            </Form>

            <div className="switch-container text-center mt-4">
              <span className="text-muted">
                {isLogin ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
              </span>
              <button
                type="button"
                className="switch-link fw-bold text-primary bg-transparent border-0"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                  setSuccess("");
                  setFormData({
                    ...formData,
                    name: "",
                    password: "",
                    confirmPassword: "",
                  });
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