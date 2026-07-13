import { Save } from "lucide-react";
import AppLayout from "../../layouts/AppLayout";
import { DatePicker } from "../../components/DatePicker";

export default function ShowOrders() {
    return (
        <AppLayout>
            <div className="p-10">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-semibold">Orders Report</h1>
                    <div className="flex gap-2 items-center">
                        <DatePicker/>
                        <button className="bg-primary1 text-white flex gap-2 p-2 items-center rounded-md border">
                            <Save size={22} />
                            <span>Export report</span>
                        </button>
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
                                    Order Number
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 font-medium"
                                >
                                    Items
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 font-medium"
                                >
                                    Payment
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 font-medium"
                                >
                                    Total
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 font-medium"
                                >
                                    Time
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
                                <td className="px-6 py-4">79</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
