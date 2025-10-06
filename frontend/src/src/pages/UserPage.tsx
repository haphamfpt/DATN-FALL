import { useState } from "react";

export default function UserPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="max-w-md mx-auto py-10 px-4">
            {isLogin ? (
                <div>
                    <h1 className="text-2xl font-bold mb-6">Đăng nhập</h1>
                    <form className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full border p-3 rounded-lg"
                        />
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            className="w-full border p-3 rounded-lg"
                        />
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
                        >
                            Đăng nhập
                        </button>
                    </form>
                    <p className="text-center mt-4 text-gray-600">
                        Chưa có tài khoản?{" "}
                        <button
                            onClick={() => setIsLogin(false)}
                            className="text-blue-600 underline"
                        >
                            Đăng ký
                        </button>
                    </p>
                </div>
            ) : (
                <div>
                    <h1 className="text-2xl font-bold mb-6">Đăng ký</h1>
                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Tên"
                            className="w-full border p-3 rounded-lg"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full border p-3 rounded-lg"
                        />
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            className="w-full border p-3 rounded-lg"
                        />
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
                        >
                            Đăng ký
                        </button>
                    </form>
                    <p className="text-center mt-4 text-gray-600">
                        Đã có tài khoản?{" "}
                        <button
                            onClick={() => setIsLogin(true)}
                            className="text-blue-600 underline"
                        >
                            Đăng nhập
                        </button>
                    </p>
                </div>
            )}
        </div>
    );
}
