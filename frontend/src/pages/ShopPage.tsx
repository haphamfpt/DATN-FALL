import React from "react";
import ProductCard from "../components/ProductCard";
import polo from "../assets/images/Polo.jpg";

export default function ShopPage() {
    const products = [
        {
            id: 1,
            name: "Piqué Biker Jacket",
            price: 67.24,
            image: polo,
            badge: "NEW",
            rating: 0,
        },
        {
            id: 2,
            name: "Piqué Biker Jacket",
            price: 67.24,
            image: polo,
            rating: 0,
        },
        {
            id: 3,
            name: "Multi-pocket Chest Bag",
            price: 43.48,
            image: polo,
            badge: "SALE",
            rating: 4,
        },
        {
            id: 4,
            name: "Diagonal Textured Cap",
            price: 60.9,
            image: polo,
            rating: 0,
        },
        {
            id: 5,
            name: "Basic Black T-Shirt",
            price: 25.0,
            image: polo,
            rating: 0,
        },
        {
            id: 6,
            name: "Wool Scarf",
            price: 19.5,
            image: polo,
            badge: "SALE",
            rating: 0,
        },
    ];

    return (
        <div className="container mx-auto py-10 px-6">
            {/* Tabs */}
            <div className="flex justify-center gap-10 text-lg font-medium mb-8">
                <span className="text-black border-b-2 border-black">
                    Best Sellers
                </span>
                <span className="text-gray-400 cursor-pointer hover:text-black">
                    New Arrivals
                </span>
                <span className="text-gray-400 cursor-pointer hover:text-black">
                    Hot Sales
                </span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {products.map((p) => (
                    <ProductCard key={p.id} {...p} />
                ))}
            </div>
        </div>
    );
}
