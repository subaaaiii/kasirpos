import { Link } from "@inertiajs/react";
import {
    ChartSpline,
    LayoutDashboard,
    Package,
    ReceiptText,
    ShoppingCart,
} from "lucide-react";

export default function Sidebar() {
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
    return (
        <aside className="w-80 text-white bg-[#023d3b] p-2">
            <h1 className="text-3xl font-bold text-center py-4">KASIRPOS</h1>

            <ul className="mt-4 flex flex-col gap-2">
                {menus.map((menu) => {
                    const Icon = menu.icon;
                    return (
                        <li className="p-4 flex gap-2 items-center hover:bg-[#0abc8a] rounded-xl cursor-pointer">
                            <Icon size={22} />
                            <Link className="text-xl" href={menu.href}>
                                {menu.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}
