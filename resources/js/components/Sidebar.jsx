import { Link, usePage } from "@inertiajs/react";
import {
    ChartSpline,
    LayoutDashboard,
    Package,
    ReceiptText,
    ShoppingCart,
} from "lucide-react";

export default function Sidebar() {
    const { url } = usePage();
    const menus = [
        {
            name: "Dashboard",
            href: "/",
            icon: LayoutDashboard,
        },
        {
            name: "Cashier",
            href: "/cashier",
            icon: ShoppingCart,
        },
        {
            name: "Sales",
            href: "/sales",
            icon: ChartSpline,
        },
        {
            name: "Orders",
            href: "/orders",
            icon: ShoppingCart,
        },
        {
            name: "Products",
            href: "/products",
            icon: Package,
        },
    ];

    const isActive = (href) => {
        if (href === "/") {
            return url === "/";
        }

        return url.startsWith(href);
    };
    return (
        <aside className="w-80 text-white bg-primary1 p-2">
            <h1 className="text-3xl font-bold text-center py-4">KASIRPOS</h1>

            <ul className="mt-4 flex flex-col gap-2">
                {menus.map((menu, index) => {
                    const Icon = menu.icon;
                    return (
                        <li key={index}>
                            <Link
                                href={menu.href}
                                className={`p-4 flex gap-2 items-center hover:bg-secondary1 rounded-xl cursor-pointer ${isActive(menu.href) ? "bg-secondary1" : ""} `}
                            >
                                <Icon size={22} />
                                <span className="text-xl">{menu.name}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}
