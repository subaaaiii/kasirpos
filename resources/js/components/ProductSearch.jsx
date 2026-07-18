import { router } from "@inertiajs/react";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProductSearch({ categories, filters }) {
    const [search, setSearch] = useState(filters?.search || "");
    const [category, setCategory] = useState(filters?.category || "");

    const applyFilters = (newSearch = search, newCategory = category) => {
        router.get(
            "/products",
            {
                search: newSearch,
                category: newCategory,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            applyFilters(search, category);
        }, 500);

        return () => clearTimeout(timeout);
    }, [search]);

    return (
        <div className="sticky top-0 z-10 bg-[#f0f6f6] ">
            <div className="grid grid-cols-8 w-full p-6 pb-0 pr-4 gap-4 ">
                <div className="col-span-6 bg-white rounded-xl border border-gray-300 hover:border-secondary relative">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari produk..."
                        className="p-3.5 pl-12 w-full text-xl outline-none text-gray-600"
                    />

                    <div className="absolute left-3 top-0 h-full flex items-center">
                        <Search size={30} className="text-gray-600" />
                    </div>
                </div>
                <div className="col-span-2 w-full grid grid-cols-1">
                    <select
                        value={category.name}
                        className="col-start-1 text-xl text-gray-600 border border-gray-300  focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none  row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3  outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                        onChange={(e) => {
                            const value = e.target.value;
                            setCategory(value);
                            applyFilters(search, value);
                        }}
                    >
                        <option value="">Semua Kategori</option>

                        {categories.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
