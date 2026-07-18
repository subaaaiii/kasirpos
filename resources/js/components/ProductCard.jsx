import { formatPrice } from "@/helpers/formatPrice";
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
            <div className="min-w-60 flex flex-col bg-white rounded-lg p-4">
                <div className="aspect-[1.5/1] flex items-center rounded-md justify-center">
                    {image ? (
                        <img
                            src={image}
                            className="h-40 object-contain"
                            alt="image card"
                        />
                    ) : (
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            data-slot="icon"
                            aria-hidden="true"
                            className="mx-auto size-12 text-gray-300"
                        >
                            <path
                                d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                                clipRule="evenodd"
                                fillRule="evenodd"
                            />
                        </svg>
                    )}
                </div>
                <div className="font-semibold text-lg">{name}</div>
                <div className="mt-2 w-fit py-1 px-3 text-sm rounded-lg text-gray-500 border border-gray-500">
                    {category}
                </div>
                <div className="flex justify-between items-center mt-2">
                    <div>{formatPrice(price)}</div>
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
        <Link
            href={hreff}
            className="min-w-60 flex flex-col bg-white rounded-lg p-4"
        >
            <div className="aspect-[1.5/1] flex items-center justify-center">
                <img
                    src={image}
                    className="h-40 rounded-md object-contain"
                    alt="image card"
                />
            </div>
            <div className="font-semibold text-lg">{name}</div>
            <div className="mt-2 w-fit py-1 px-3 text-sm rounded-lg text-gray-500 border border-gray-500">
                {category}
            </div>
            <div className="flex justify-between items-center mt-2">
                <div>{formatPrice(price)}</div>
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
