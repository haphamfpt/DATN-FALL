export default function CartPage() {
    const items = [
        {
            id: 1,
            name: "Áo thun nam",
            price: 29,
            quantity: 1,
            image: "/images/product-1.jpg",
        },
        {
            id: 2,
            name: "Quần jeans",
            price: 49,
            quantity: 2,
            image: "/images/product-2.jpg",
        },
    ];

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );

    return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-6">Giỏ hàng</h1>

            <div className="overflow-x-auto">
                <table className="w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Sản phẩm</th>
                            <th className="p-3">Giá</th>
                            <th className="p-3">Số lượng</th>
                            <th className="p-3">Tổng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id} className="border-t">
                                <td className="p-3 flex items-center space-x-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 rounded-lg"
                                    />
                                    <span>{item.name}</span>
                                </td>
                                <td className="p-3 text-center">
                                    ${item.price}
                                </td>
                                <td className="p-3 text-center">
                                    {item.quantity}
                                </td>
                                <td className="p-3 text-center">
                                    ${item.price * item.quantity}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-end mt-6">
                <div className="text-right">
                    <p className="text-lg font-semibold">Tổng cộng: ${total}</p>
                    <button className="mt-4 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800">
                        Thanh toán
                    </button>
                </div>
            </div>
        </div>
    );
}
