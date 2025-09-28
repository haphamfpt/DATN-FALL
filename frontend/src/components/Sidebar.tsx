import React from "react";

export default function Sidebar() {
    return (
        <aside className="w-1/4 space-y-8">
            {/* Categories */}
            <div>
                <h3 className="font-semibold mb-3">CATEGORIES</h3>
                <ul className="space-y-2 text-gray-600">
                    <li>Bags (20)</li>
                    <li>Clothing (20)</li>
                    <li>Shoes (20)</li>
                    <li>Accessories (20)</li>
                </ul>
            </div>

            {/* Filter Price */}
            <div>
                <h3 className="font-semibold mb-3">FILTER PRICE</h3>
                <ul className="space-y-2 text-gray-600">
                    <li>$0 - $50</li>
                    <li>$50 - $100</li>
                    <li>$100 - $150</li>
                    <li>$150 - $200</li>
                </ul>
            </div>
        </aside>
    );
}
