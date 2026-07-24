import { CalendarX2, Save } from "lucide-react";
import AppLayout from "../../layouts/AppLayout";
import { useEffect, useState } from "react";
import { MonthYearPicker } from "@/components/MonthYearPicker";
import { router } from "@inertiajs/react";
import { formatPrice } from "@/helpers/formatPrice";

export default function ShowSales({ sales, filters, years }) {

    const [month, setMonth] = useState(filters.month);
    const [year, setYear] = useState(filters.year);

    useEffect(() => {
        router.get(
            "/sales",
            {
                month,
                year,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    }, [month, year]);

    const monthName = new Date(year, month - 1).toLocaleString("en-US", {
        month: "long",
    });

    const handleExport = () => {
        window.location.href = `/sales/export?month=${month}&year=${year}`;
    };
    return (
        <AppLayout>
            <div className="p-10">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-semibold">Sales Report</h1>
                    <div className="flex gap-2 items-center">
                        <MonthYearPicker
                            month={month}
                            year={year}
                            years={years}
                            setMonth={setMonth}
                            setYear={setYear}
                        />
                        <button onClick={handleExport} disabled={!sales.length} className="flex gap-2 p-2 bg-primary1 text-white items-center rounded-md border">
                            <Save size={22} />
                            <span>Export report</span>
                        </button>
                    </div>
                </div>
                {sales.length ? (
                    <div className="mt-4 relative overflow-x-auto bg-gray-100 shadow-xs rounded-md border border-default">
                        <table className="w-full text-sm text-left rtl:text-right text-body">
                            <thead className="text-sm text-body bg-gray-200 border-b rounded-md border-default">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 font-medium"
                                    >
                                        Date
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 font-medium"
                                    >
                                        Transactions
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 font-medium"
                                    >
                                        Revenue
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 font-medium"
                                    >
                                        Items Sold
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {sales.map((sale) => (
                                    <tr
                                        key={sale.date}
                                        className="bg-neutral-primary border-b border-default"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                                        >
                                            {sale.date}
                                        </th>
                                        <td className="px-6 py-4">
                                            {sale.transactions}
                                        </td>
                                        <td className="px-6 py-4">
                                            {formatPrice(sale.revenue)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {sale.items_sold}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 mt-4 py-20">
                        <div className="rounded-full bg-gray-100 p-5">
                            <CalendarX2 className="h-12 w-12 text-gray-400" />
                        </div>

                        <h2 className="mt-6 text-2xl font-semibold text-gray-800">
                            No Sales Found
                        </h2>

                        <p className="mt-2 text-center text-gray-500">
                            There were no sales recorded during{" "}
                            <span className="font-medium">
                                {monthName} {year}
                            </span>
                            .
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
