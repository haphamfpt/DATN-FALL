import ProductCard from "../components/ProductCard";

export default function ShopPage() {
  const products = [
    {
      id: 1,
      name: "Áo bóng rổ",
      price: 140.0,
      image: "assets/images/aobongro.jpg",
    },
    {
      id: 2,
      name: "Áo bóng đá",
      price: 49,
      image: "assets/images/aobongro.jpg",
    },
    {
      id: 3,
      name: "Áo bóng đá",
      price: 99,
      image: "assets/images/aobongro.jpg",
    },
    {
      id: 4,
      name: "Áo bóng đá",
      price: 99,
      image: "assets/images/aobongro.jpg",
    },
    {
      id: 5,
      name: "Áo bóng đá",
      price: 99,
      image: "assets/images/aobongro.jpg",
    },
    {
      id: 6,
      name: "Áo bóng đá",
      price: 99,
      image: "assets/images/aobongro.jpg",
    },
    {
      id: 7,
      name: "Áo bóng đá",
      price: 99,
      image: "assets/images/aobongro.jpg",
    },
    {
      id: 8,
      name: "Áo bóng đá",
      price: 99,
      image: "assets/images/aobongro.jpg",
    },
    {
      id: 9,
      name: "Áo bóng đá",
      price: 99,
      image: "assets/images/aobongro.jpg",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
}
