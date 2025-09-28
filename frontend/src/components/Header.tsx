import React from "react";

export default function Header() {
    return (
        <header className="border-b shadow-sm bg-white">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                <h1 className="text-2xl font-bold">Male Fashion.</h1>
                <nav className="space-x-6 font-medium">
                    <a href="/" className="hover:text-red-500">
                        Home
                    </a>
                    <a
                        href="/shop"
                        className="text-red-500 border-b-2 border-red-500"
                    >
                        Shop
                    </a>
                    <a href="/pages" className="hover:text-red-500">
                        Pages
                    </a>
                    <a href="/blog" className="hover:text-red-500">
                        Blog
                    </a>
                    <a href="/contact" className="hover:text-red-500">
                        Contact
                    </a>
                </nav>
                <div className="flex items-center gap-4">
                    <button>🔍</button>
                    <button>❤️</button>
                    <button>🛒 $0.00</button>
                </div>
            </div>
        </header>
    );
}
