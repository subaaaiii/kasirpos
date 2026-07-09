import { Save } from "lucide-react";
import AppLayout from "../../layouts/AppLayout";

export default function ShowSales() {
    return (
        <AppLayout>
            <div className="p-10">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-semibold">Sales Report</h1>
                    <div className="flex gap-2 items-center">
                        <div className="grid grid-cols-1">
                            <select
                                id="country"
                                name="country"
                                autoComplete="country-name"
                                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                            >
                                <option>Januari</option>
                                <option>Beverages</option>
                                <option>Dish</option>
                            </select>
                            <svg
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                data-slot="icon"
                                aria-hidden="true"
                                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                            >
                                <path
                                    d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="flex gap-2 p-1.5 items-center rounded-md border">
                            <Save size={22} />
                            <span>Export report</span>
                        </div>
                    </div>
                </div>
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
                            <tr className="bg-neutral-primary border-b border-default">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                                >
                                    09 Jul 2026
                                </th>
                                <td className="px-6 py-4">35</td>
                                <td className="px-6 py-4">Rp. 3.250.000</td>
                                <td className="px-6 py-4">98</td>
                            </tr>
                            <tr className="bg-neutral-primary border-b border-default">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                                >
                                    10 Jul 2026
                                </th>
                                <td className="px-6 py-4">28</td>
                                <td className="px-6 py-4">Rp. 3.000.000</td>
                                <td className="px-6 py-4">80</td>
                            </tr>
                            <tr className="bg-neutral-primary">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                                >
                                    11 Jul 2026
                                </th>
                                <td className="px-6 py-4">25</td>
                                <td className="px-6 py-4">Rp.2.250.000 </td>
                                <td className="px-6 py-4">79</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
