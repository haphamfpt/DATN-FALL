import { FaUser } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="w-full max-w-md ml-auto mr-4">
      {/* Tiêu đề */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold text-[#342e79]">
          Chào mừng trở lại !
        </h2>
        <p className="text-gray-600 text-lg">
          Xin hãy đăng nhập vào tài khoản của bạn
        </p>
      </div>

      {/* Form */}
      <form className="space-y-4">
        {/* Tên đăng nhập */}
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
              placeholder="Mời bạn nhập tên đăng nhập"
              className="w-full pl-12 pr-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#342e79] focus:border-[#342e79]"
            />
          </div>
        </div>

        {/* Mật khẩu */}
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
              placeholder="Mời bạn nhập mật khẩu"
              className="w-full pl-12 pr-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#342e79] focus:border-[#342e79]"
            />
          </div>
        </div>

        {/* Links */}
        <div className="flex justify-between text-base">
          <Link
            to="/xac-thuc/quen-mat-khau"
            className="text-gray-600 hover:text-[#342e79]"
          >
            Quên mật khẩu?
          </Link>
          <Link
            to="/auth/register"
            className="text-gray-600 hover:text-[#342e79]"
          >
            Đăng ký tài khoản
          </Link>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 text-lg rounded-lg bg-[#342e79] text-white font-semibold hover:bg-[#2a2566] transition"
        >
          Đăng Nhập
        </button>
      </form>
    </div>
  );
};

export default Login;
