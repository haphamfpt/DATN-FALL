import React from "react";

const products = [
    {
        id: 1,
        name: "Ankle Boots",
        price: 98.49,
        image: "https://via.placeholder.com/300",
    },
    {
        id: 2,
        name: "T-shirt Contrast Pocket",
        price: 49.66,
        image: "https://via.placeholder.com/300",
    },
    {
        id: 3,
        name: "Basic Flowing Scarf",
        price: 26.28,
        image: "https://via.placeholder.com/300",
    },
    {
        id: 4,
        name: "Multi-pocket Chest Bag",
        price: 43.48,
        image: "https://via.placeholder.com/300",
    },
];

const ShopPage = () => {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Shop</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((p) => (
                    <div
                        key={p.id}
                        className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                    >
                        <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-60 object-cover"
                        />
                        <div className="p-4">
                            <h4 className="font-semibold">{p.name}</h4>
                            <p className="text-red-500 font-bold">
                                ${p.price.toFixed(2)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShopPage;
