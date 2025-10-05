import { FaUser, FaAt } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="w-full max-w-md ml-auto mr-4">
      {/* Tiêu đề */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold text-[#342e79]">
          Tạo tài khoản mới !
        </h2>
        <p className="text-gray-600 text-lg">
          Xin hãy nhập thông tin chi tiết vào bên dưới !
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

        {/* Email */}
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-lg">
              <FaAt />
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

        {/* Nhập lại mật khẩu */}
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Nhập lại mật khẩu <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-lg">
              <FiLock />
            </span>
            <input
              type="password"
              placeholder="Mời bạn nhập lại mật khẩu"
              className="w-full pl-12 pr-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#342e79] focus:border-[#342e79]"
            />
          </div>
        </div>

        {/* Links */}
        <div className="flex justify-between text-base">
          <Link to="/auth/login" className="text-gray-600 hover:text-[#342e79]">
            Đã có tài khoản?
          </Link>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 text-lg rounded-lg bg-[#342e79] text-white font-semibold hover:bg-[#2a2566] transition"
        >
          Đăng Ký
        </button>
      </form>
    </div>
  );
};

export default Register;
