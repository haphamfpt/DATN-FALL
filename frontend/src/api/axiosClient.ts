import axios from "axios";

// ✅ Đọc baseURL từ biến môi trường .env
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ✅ Gắn token (nếu có) vào tất cả request
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // hoặc sessionStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Tự động xử lý lỗi response (401, 500, v.v.)
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Phiên đăng nhập hết hạn, cần đăng nhập lại");
      localStorage.removeItem("token");
      // có thể redirect tới /login nếu muốn
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
