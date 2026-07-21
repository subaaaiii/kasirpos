import { router } from "@inertiajs/react";
import { Filter, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function ProductSearch({ categories, filters, url }) {
    const [search, setSearch] = useState(filters?.search || "");
    const [category, setCategory] = useState(filters?.category || "");

    const applyFilters = (newSearch = search, newCategory = category) => {
        router.get(
            url,
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

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

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
                <div className="col-span-2 w-full grid grid-cols-1 hidden xl:block">
                    <select
                        value={category}
                        className="col-start-1 text-xl text-gray-600 border border-gray-300  focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none  row-start-1 w-full appearance-none rounded-xl bg-white py-3.5 pr-8 pl-3  outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
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
                <Popover>
                    <PopoverTrigger aschild="true">
                        <div className="xl:hidden outline p-3 rounded-xl">
                            <Filter size={30} className="text-gray-600" />
                        </div>
                    </PopoverTrigger>

                    <PopoverContent className="w-56 p-2">
                        <select
                            value={category}
                            onChange={(e) => {
                                const value = e.target.value;
                                setCategory(value);
                                applyFilters(search, value);
                            }}
                            className="w-full rounded-md border"
                        >
                            <option value="">Semua Kategori</option>

                            {categories.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
