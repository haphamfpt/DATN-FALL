import { FC, useState } from "react";
import { FaUser, FaAt } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const Register: FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    // Fake đăng ký thành công
    alert("Đăng ký thành công! Mời bạn đăng nhập.");
    navigate("/auth/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-[#342e79]">
            Tạo tài khoản mới!
          </h2>
          <p className="text-gray-600 text-lg">
            Nhập thông tin của bạn vào bên dưới
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Tên đăng nhập <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-lg">
                <FaUser />
              </span>
              <input
                type="text"
                placeholder="Nhập tên đăng nhập"
                className="w-full pl-12 pr-4 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-[#342e79]"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-lg">
                <FaAt />
              </span>
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="w-full pl-12 pr-4 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-[#342e79]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Mật khẩu <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-lg">
                <FiLock />
              </span>
              <input
                type="password"
                placeholder="Nhập mật khẩu"
                className="w-full pl-12 pr-4 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-[#342e79]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Xác nhận mật khẩu <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-lg">
                <FiLock />
              </span>
              <input
                type="password"
                placeholder="Nhập lại mật khẩu"
                className="w-full pl-12 pr-4 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-[#342e79]"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-between text-base">
            <Link
              to="/auth/login"
              className="text-gray-600 hover:text-[#342e79]"
            >
              Đã có tài khoản chưa?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-lg rounded-lg bg-[#342e79] text-white font-semibold hover:bg-[#2a2566] transition"
          >
            Đăng Ký
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
