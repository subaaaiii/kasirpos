import { ClipboardList, Ellipsis, Save } from "lucide-react";
import AppLayout from "../../layouts/AppLayout";
import { DatePicker } from "../../components/DatePicker";
import { useEffect, useState } from "react";
import { formatPrice } from "@/helpers/formatPrice";
import { format } from "date-fns";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import CustomPagination from "@/components/CustomPagination";
import { router } from "@inertiajs/react";

export default function ShowOrders({ orders, filters }) {
    const [date, setDate] = useState(
        filters?.date ? new Date(filters.date) : new Date(),
    );

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);

        router.get(
            "/orders",
            {
                date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    const handleExport = () => {
    const query = date
        ? `?date=${format(date, "yyyy-MM-dd")}`
        : "";

    window.location.href = `/orders/export${query}`;
};
    return (
        <AppLayout>
            <div className="p-10">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-semibold">Orders Report</h1>
                    <div className="flex gap-2 items-center">
                        <DatePicker value={date} onChange={handleDateChange} />
                        <button disabled={!orders.data.length} onClick={handleExport} className="bg-primary1 text-white flex gap-2 p-2 items-center rounded-md border">
                            <Save size={22} />
                            <span>Export report</span>
                        </button>
                    </div>
                </div>
                {orders.data.length ? (<div className="mt-4 relative overflow-x-auto bg-gray-100 shadow-xs rounded-md border border-default">
                    <table className="w-full text-sm text-left rtl:text-right text-body">
                        <thead className="text-sm text-body bg-gray-200 border-b rounded-md border-default">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-2 py-1 font-medium"
                                >
                                    Order Number
                                </th>
                                <th
                                    scope="col"
                                    className="px-2 py-1 font-medium"
                                >
                                    Items
                                </th>
                                <th
                                    scope="col"
                                    className="px-2 py-1 font-medium"
                                >
                                    Payment
                                </th>
                                <th
                                    scope="col"
                                    className="px-2 py-1 font-medium"
                                >
                                    Total
                                </th>
                                <th
                                    scope="col"
                                    className="px-2 py-1 font-medium"
                                >
                                    Time
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.data.map((order) => (
                                <tr
                                    key={order.id}
                                    className="bg-neutral-primary border-b border-default"
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                                    >
                                        {order.order_number}
                                    </th>
                                    <td className="px-6 py-4">
                                        <Popover>
                                            <PopoverTrigger aschild="true">
                                                <div className="">
                                                    <Ellipsis
                                                        size={30}
                                                        className="text-gray-600"
                                                    />
                                                </div>
                                            </PopoverTrigger>

                                            <PopoverContent className="w-80 p-2">
                                                <div className="grid gap-2">
                                                    <table className="w-full border-collapse">
                                                        <thead>
                                                            <tr>
                                                                <th className="px-2 py-1">
                                                                    Qty
                                                                </th>
                                                                <th className="px-2 py-1">
                                                                    Product
                                                                </th>
                                                                <th className="px-2 py-1">
                                                                    Price
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        {order.items.map(
                                                            (product) => (
                                                                <tbody
                                                                    key={
                                                                        product.id
                                                                    }
                                                                >
                                                                    <tr>
                                                                        <td className="px-6 py-4">
                                                                            {
                                                                                product.qty
                                                                            }
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            {
                                                                                product
                                                                                    .product
                                                                                    .name
                                                                            }
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            {
                                                                                product.price
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            ),
                                                        )}
                                                    </table>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </td>
                                    <td className="px-6 py-4">
                                        {order.payment_method}
                                    </td>
                                    <td className="px-6 py-4">
                                        {formatPrice(order.grand_total)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {format(
                                            new Date(order.created_at),
                                            "HH:mm:ss",
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="rounded-full bg-gray-100 p-4">
                <ClipboardList className="h-10 w-10 text-gray-400" />
            </div>

            <h2 className="mt-6 text-xl font-semibold text-gray-900">
                No orders found
            </h2>

            <p className="mt-2 text-gray-500">
                No orders were made on{" "}
                <span className="font-medium text-gray-700">
                    {format(new Date(date), "MMMM d, yyyy")}
                </span>
                .
            </p>
        </div>
                )}
            {orders.last_page > 1 && (
                <div className="pt-10">
                    <CustomPagination links={orders.links} />
                </div>
            )}
            </div>
        </AppLayout>
    );
}
