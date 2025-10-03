import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/**
 * Register Page
 * - Form đăng ký
 * - Chuyển sang Login sau khi tạo tài khoản
 */
const Register: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    // Fake save (sau này gọi API backend)
    alert("Đăng ký thành công! Mời bạn đăng nhập.");
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border px-4 py-2 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          className="w-full border px-4 py-2 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Xác nhận mật khẩu"
          className="w-full border px-4 py-2 rounded mb-6"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Đăng ký
        </button>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Đăng nhập
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
