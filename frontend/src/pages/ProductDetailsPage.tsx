import { useParams } from "react-router-dom";

export default function ProductDetailsPage() {
    const { id } = useParams();

    return (
        <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex justify-center">
                <img
                    src="/images/product-1.jpg"
                    alt="Product"
                    className="w-full max-w-md rounded-lg shadow-lg"
                />
            </div>
            <div>
                <h1 className="text-3xl font-bold mb-4">Tên sản phẩm #{id}</h1>
                <p className="text-gray-600 mb-4">
                    Đây là mô tả chi tiết của sản phẩm. Bạn có thể thay bằng dữ
                    liệu thật từ API.
                </p>
                <p className="text-2xl font-semibold text-red-500 mb-6">
                    $59.00
                </p>

                <div className="flex items-center space-x-4 mb-6">
                    <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800">
                        Thêm vào giỏ
                    </button>
                    <button className="border px-6 py-2 rounded-lg hover:bg-gray-100">
                        Yêu thích
                    </button>
                </div>

                <ul className="list-disc pl-6 text-gray-700">
                    <li>Chất liệu: Cotton 100%</li>
                    <li>Kích thước: M, L, XL</li>
                    <li>Bảo hành: 6 tháng</li>
                </ul>
            </div>
        </div>
    );
}
