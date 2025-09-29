export default function Footer() {
    return (
        <footer className="bg-white border-t mt-10">
            <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between gap-6 text-sm text-gray-600">
                <div>
                    <div className="font-semibold text-gray-900">
                        MALE FASHION
                    </div>
                    <div className="mt-2">
                        © {new Date().getFullYear()} Male Fashion. All rights
                        reserved.
                    </div>
                </div>

                <div className="flex gap-6">
                    <a href="#" className="hover:underline">
                        Terms
                    </a>
                    <a href="#" className="hover:underline">
                        Privacy
                    </a>
                    <a href="#" className="hover:underline">
                        Help
                    </a>
                </div>
            </div>
        </footer>
    );
}
