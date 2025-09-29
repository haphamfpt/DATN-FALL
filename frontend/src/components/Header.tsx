import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold tracking-wide">
                    MALE FASHION
                </Link>

                {/* Menu */}
                <nav className="hidden md:flex gap-6 text-sm text-gray-600">
                    <Link to="/" className="hover:text-black">
                        Home
                    </Link>
                    <Link to="/shop" className="hover:text-black">
                        Shop
                    </Link>
                    <Link to="/user" className="hover:text-black">
                        User
                    </Link>
                    <Link to="/cart" className="hover:text-black">
                        Cart
                    </Link>
                </nav>

                {/* Search + user/cart actions */}
                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="hidden sm:block border rounded-md px-3 py-1 text-sm bg-gray-50"
                    />
                    <Link
                        to="auth/login"
                        className="px-3 py-1 text-sm hover:bg-gray-100 rounded"
                    >
                        Login
                    </Link>
                    <Link
                        to="/cart"
                        className="px-3 py-1 bg-black text-white rounded text-sm"
                    >
                        Cart (0)
                    </Link>
                </div>
            </div>
        </header>
    );
}
