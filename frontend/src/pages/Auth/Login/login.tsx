import { FC, useState, useContext } from "react";
import { FaUser } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
// Make sure the path is correct; adjust as needed if the file is elsewhere
import { AuthContext } from "../../../context/AuthContext";

const Login: FC = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username && password) {
      login(username);
      navigate("/");
    } else {
      alert("Vui lòng nhập đầy đủ thông tin!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-[#342e79]">
            Chào mừng trở lại!
          </h2>
          <p className="text-gray-600 text-lg">
            Xin hãy đăng nhập vào tài khoản của bạn
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
                className="w-full pl-12 pr-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#342e79]"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                className="w-full pl-12 pr-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#342e79]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-between text-base">
            <Link
              to="/auth/register"
              className="text-gray-600 hover:text-[#342e79]"
            >
              Đăng ký tài khoản
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-lg rounded-lg bg-[#342e79] text-white font-semibold hover:bg-[#2a2566] transition"
          >
            Đăng Nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
