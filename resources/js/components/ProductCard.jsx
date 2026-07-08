import { Link } from "@inertiajs/react";
import { Box } from "lucide-react";

export default function ProductCard({
    image,
    category,
    price,
    stock,
    name,
    hreff,
    preview = false,
}) {
    if (preview) {
        return (
            <div className=" flex flex-col bg-white rounded-lg p-4">
                <div className="aspect-[1.5/1] flex items-center justify-center">
                    <img
                        src={image}
                        className="h-40 object-contain"
                        alt="image card"
                    />
                </div>
                <div className="font-semibold text-lg">{name}</div>
                <div className="mt-2 w-fit py-1 px-3 text-sm rounded-lg text-gray-500 border border-gray-500">
                    {category}
                </div>
                <div className="flex justify-between items-center mt-2">
                    <div>{price}</div>
                    <span
                        className={`rounded-full px-3 py-1 text-sm font-medium flex gap-1 items-center ${
                            stock > 20
                                ? "bg-green-100 text-green-700"
                                : stock > 5
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                        }`}
                    >
                        <Box />
                        {stock} pcs
                    </span>
                </div>
            </div>
        );
    }
    return (
        <Link href={hreff} className=" flex flex-col bg-white rounded-lg p-4">
            <div className="aspect-[1.5/1] flex items-center justify-center">
                <img
                    src={image}
                    className="h-40 object-contain"
                    alt="image card"
                />
            </div>
            <div className="font-semibold text-lg">{name}</div>
            <div className="mt-2 w-fit py-1 px-3 text-sm rounded-lg text-gray-500 border border-gray-500">
                {category}
            </div>
            <div className="flex justify-between items-center mt-2">
                <div>{price}</div>
                <span
                    className={`rounded-full px-3 py-1 text-sm font-medium flex gap-1 items-center ${
                        stock > 20
                            ? "bg-green-100 text-green-700"
                            : stock > 5
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                    }`}
                >
                    <Box />
                    {stock} pcs
                </span>
            </div>
        </Link>
    );
}
