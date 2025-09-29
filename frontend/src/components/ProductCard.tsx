import { Link } from "react-router-dom";

interface ProductCardProps {
    id: number;
    name: string;
    price: number;
    image: string;
}

export default function ProductCard({
    id,
    name,
    price,
    image,
}: ProductCardProps) {
    return (
        <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            <Link to={`/product/${id}`}>
                <img
                    src={image}
                    alt={name}
                    className="w-full h-64 object-cover"
                />
                <div className="p-4">
                    <h3 className="text-lg font-semibold">{name}</h3>
                    <p className="text-red-500 font-bold">${price}</p>
                </div>
            </Link>
        </div>
    );
}
