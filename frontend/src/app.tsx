import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShopPage from "./pages/ShopPage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/shop" element={<ShopPage />} />
                <Route
                    path="/"
                    element={<h1 className="p-10 text-3xl">Home Page</h1>}
                />
            </Routes>
        </BrowserRouter>
    );
}
