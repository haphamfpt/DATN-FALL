import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="p-6 text-center">
            <h1 className="text-3xl font-bold">Hello, đây là trang Home!</h1>
            <p className="mt-4">
                <Link to="/shop" className="text-blue-500 underline">
                    Đi đến Shop
                </Link>
            </p>
        </div>
    );
};

export default HomePage;
