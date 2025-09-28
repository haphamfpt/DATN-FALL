import React from "react";
import { FaStar } from "react-icons/fa";

type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    badge?: "NEW" | "SALE";
    rating?: number;
};

export default function ProductCard({
    name,
    price,
    image,
    badge,
    rating = 0,
}: Product) {
    return (
        <div className="text-center relative">
            {/* Badge */}
            {badge && (
                <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 z-10">
                    {badge}
                </span>
            )}

            {/* Image */}
            <div className="w-full h-72 bg-gray-100 flex items-center justify-center">
                <img
                    src={image}
                    alt={name}
                    className="max-h-full object-contain"
                />
            </div>

            {/* Info */}
            <div className="mt-3">
                <h4 className="font-normal text-gray-700">{name}</h4>

                {/* Rating */}
                <div className="flex justify-center gap-1 my-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar
                            key={i}
                            className={`w-4 h-4 ${
                                i < rating ? "text-yellow-400" : "text-gray-300"
                            }`}
                        />
                    ))}
                </div>

                {/* Price */}
                <p className="text-black font-semibold">${price}</p>
            </div>
        </div>
    );
}
