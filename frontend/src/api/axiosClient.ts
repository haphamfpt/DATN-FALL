import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api", // ⚠️ nếu bạn chạy Laravel trên cổng khác, sửa lại
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default axiosClient;
