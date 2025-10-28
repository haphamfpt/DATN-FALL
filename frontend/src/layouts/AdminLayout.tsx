import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-5 text-2xl font-bold border-b border-gray-700">
          <Link to="/admin">🏋️‍♂️ SportShop Admin</Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/admin"
            className="block py-2 px-3 rounded hover:bg-gray-800"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/categories"
            className="block py-2 px-3 rounded hover:bg-gray-800"
          >
            Danh mục
          </Link>
          <Link
            to="/admin/attributes"
            className="block py-2 px-3 rounded hover:bg-gray-800"
          >
            Thuộc tính
          </Link>
          <Link
            to="/admin/products"
            className="block py-2 px-3 rounded hover:bg-gray-800"
          >
            Sản phẩm
          </Link>
          <Link
            to="/admin/users"
            className="block py-2 px-3 rounded hover:bg-gray-800"
          >
            Người dùng
          </Link>
          <Link
            to="/admin/orders"
            className="block py-2 px-3 rounded hover:bg-gray-800"
          >
            Đơn hàng
          </Link>
          <Link
            to="/admin/revenue"
            className="block py-2 px-3 rounded hover:bg-gray-800"
          >
            Doanh thu
          </Link>
          <Link
            to="/admin/blogs"
            className="block py-2 px-3 rounded hover:bg-gray-800"
          >
            Bài viết
          </Link>
          <Link
            to="/admin/comments"
            className="block py-2 px-3 rounded hover:bg-gray-800"
          >
            Bình luận
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            Trang quản trị
          </h1>
          <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded">
            Đăng xuất
          </button>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
