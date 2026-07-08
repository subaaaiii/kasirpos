import {
    ArrowLeftRight,
    ArrowUp,
    BanknoteArrowUp,
    ChartNoAxesCombined,
    CircleAlert,
    CircleDollarSign,
    CreditCard,
    TriangleAlert,
    User,
} from "lucide-react";
import AppLayout from "../layouts/AppLayout";
import SalesChart from "../components/chart";

export default function Dashboard() {
    const image = "https://s3-publishing-cmn-svc-prd.s3.ap-southeast-1.amazonaws.com/article/UoLR8_o3nEHFjV5b1sQ5z/original/045285900_1547016776-4-Cara-Bikin-Kebiasaan-Minum-Kopi-Jadi-Lebih-Sehat-By-Ruslan-Semichev-Shutterstock.jpg"
    return (
        <AppLayout>
            <div>
                <h1 className="text-3xl font-semibold">Today's Overview</h1>
                <h2 className="text-gray-400 ">
                    Welcome back, Here's what happening today
                </h2>
                <section className="mt-4 grid grid-cols-4 gap-6">
                    <div className="rounded-md rounded-xl bg-white p-6">
                        <div className="flex justify-between">
                            <div className="flex-col">
                                <div className="text-xl text-gray-400">
                                    Total sales
                                </div>
                                <div className="text-3xl font-bold">
                                    RP. 2,000,000
                                </div>
                            </div>
                            <div>
                                <div className="rounded-full p-3 bg-[#0abc8a]/15">
                                    <CircleDollarSign className="w-8 h-8 text-[#0abc8a] " />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between mt-4">
                            <div className="flex text-[#0abc8a] items-center">
                                <ArrowUp />
                                <span className="text-xl">18%</span>
                            </div>
                            <div className="text-xl text-gray-400">
                                From yesterday
                            </div>
                        </div>
                    </div>
                    <div className="rounded-md rounded-xl bg-white p-6">
                        <div className="flex justify-between">
                            <div className="flex-col">
                                <div className="text-xl text-gray-400">
                                    Transactions
                                </div>
                                <div className="text-3xl font-bold">158</div>
                            </div>
                            <div>
                                <div className="rounded-full p-3 bg-blue-600/15">
                                    <ArrowLeftRight className="w-8 h-8 text-blue-600 " />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between mt-6">
                            <div className="flex text-[#0abc8a] items-center">
                                <ArrowUp />
                                <span className="text-xl">18%</span>
                            </div>
                            <div className="text-xl text-gray-400">
                                From yesterday
                            </div>
                        </div>
                    </div>
                    <div className="rounded-md rounded-xl bg-white p-6">
                        <div className="flex justify-between">
                            <div className="flex-col">
                                <div className="text-xl text-gray-400">
                                    Customers
                                </div>
                                <div className="text-3xl font-bold">100</div>
                            </div>
                            <div>
                                <div className="rounded-full p-3 bg-purple-600/15">
                                    <User className="w-8 h-8 text-purple-600 " />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between mt-4">
                            <div className="flex text-[#0abc8a] items-center">
                                <ArrowUp />
                                <span className="text-xl">18%</span>
                            </div>
                            <div className="text-xl text-gray-400">
                                From yesterday
                            </div>
                        </div>
                    </div>
                    <div className="rounded-md rounded-xl bg-white p-6">
                        <div className="flex justify-between">
                            <div className="flex-col">
                                <div className="text-xl text-gray-400">
                                    Avg. Sales
                                </div>
                                <div className="text-3xl font-bold">
                                    RP. 200,000
                                </div>
                            </div>
                            <div>
                                <div className="rounded-full p-3 bg-yellow-600/15">
                                    <ChartNoAxesCombined className="w-8 h-8 text-yellow-600 " />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between mt-4">
                            <div className="flex text-[#0abc8a] items-center">
                                <ArrowUp />
                                <span className="text-xl">18%</span>
                            </div>
                            <div className="text-xl text-gray-400">
                                From yesterday
                            </div>
                        </div>
                    </div>
                </section>
                <section className="grid grid-cols-2 gap-6 mt-6">
                    {/* Sales overvie */}
                    <div className="rounded-xl w-full h-auto bg-white p-4">
                        <h2 className="text-xl font-bold mb-4">
                            Sales overview
                        </h2>
                        <SalesChart />
                    </div>
                    {/* top products */}
                    <div className="rounded-xl w-full h-auto bg-white p-6">
                        <h2 className="text-xl font-bold">Top Products</h2>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between">
                                <div className="flex items-center gap-4">
                                    <div>
                                        <img src={image} className="w-32 h-16 rounded-lg" alt="kopi" />
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="font-bold text-lg">
                                            nama produk
                                        </div>
                                        <div>100 units</div>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <div className="font-bold text-lg">
                                        RP.200,000
                                    </div>
                                    <div className="flex gap-2 items-center text-[#0abc8a]">
                                        <ArrowUp className="w-4 h-4" />
                                        <span>18%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex items-center gap-4">
                                    <div>
                                        <img src={image} className="w-32 h-16 rounded-lg" alt="kopi" />

                                    </div>
                                    <div className="flex flex-col">
                                        <div className="font-bold text-lg">
                                            nama produk
                                        </div>
                                        <div>100 units</div>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <div className="font-bold text-lg">
                                        RP.200,000
                                    </div>
                                    <div className="flex gap-2 items-center text-[#0abc8a]">
                                        <ArrowUp className="w-4 h-4" />
                                        <span>18%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex items-center gap-4">
                                    <div>
                                        <img src={image} className="w-32 h-16 rounded-lg" alt="kopi" />
                                        
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="font-bold text-lg">
                                            nama produk
                                        </div>
                                        <div>100 units</div>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <div className="font-bold text-lg">
                                        RP.200,000
                                    </div>
                                    <div className="flex gap-2 items-center text-[#0abc8a]">
                                        <ArrowUp className="w-4 h-4" />
                                        <span>18%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex items-center gap-4">
                                    <div>
                                        <img src={image} className="w-32 h-16 rounded-lg" alt="kopi" />
                                        
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="font-bold text-lg">
                                            nama produk
                                        </div>
                                        <div>100 units</div>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <div className="font-bold text-lg">
                                        RP.200,000
                                    </div>
                                    <div className="flex gap-2 items-center text-[#0abc8a]">
                                        <ArrowUp className="w-4 h-4" />
                                        <span>18%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="grid grid-cols-2 gap-6 mt-6">
                    {/* Recent transactions */}
                    <div className="rounded-xl w-full h-auto bg-white p-6">
                        <h2 className="text-xl font-bold">
                            Recent Transactions
                        </h2>
                        <div className="flex flex-col gap-2 mt-4">
                            <div className="flex justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full p-2 bg-blue-600/20 text-blue-600">
                                        <CreditCard />
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="font-bold text-lg">
                                            Credit card
                                        </div>
                                        <div>Subairi . 14.22</div>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <div className="font-bold text-lg">
                                        RP.200,000
                                    </div>
                                    <div className="flex gap-2 items-center text-[#0abc8a]">
                                        <span className="text-sm rounded-full bg-[#0abc8a]/20 py-1 px-2">
                                            completed
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full p-2 bg-[#0abc8a]/20 text-[#0abc8a]">
                                        <BanknoteArrowUp />
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="font-bold text-lg">
                                            Cash
                                        </div>
                                        <div>Subairi . 14.22</div>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <div className="font-bold text-lg">
                                        RP.200,000
                                    </div>
                                    <div className="flex gap-2 items-center text-[#0abc8a]">
                                        <span className="text-sm rounded-full bg-[#0abc8a]/20 py-1 px-2">
                                            completed
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full p-2 bg-[#0abc8a]/20 text-[#0abc8a]">
                                        <CreditCard />
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="font-bold text-lg">
                                            Credit card
                                        </div>
                                        <div>Subairi . 14.22</div>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <div className="font-bold text-lg">
                                        RP.200,000
                                    </div>
                                    <div className="flex gap-2 items-center text-[#0abc8a]">
                                        <span className="text-sm rounded-full bg-[#0abc8a]/20 py-1 px-2">
                                            completed
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full p-2 bg-[#0abc8a]/20 text-[#0abc8a]">
                                        <CreditCard />
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="font-bold text-lg">
                                            Credit card
                                        </div>
                                        <div>Subairi . 14.22</div>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <div className="font-bold text-lg">
                                        RP.200,000
                                    </div>
                                    <div className="flex gap-2 items-center text-[#0abc8a]">
                                        <span className="text-sm rounded-full bg-[#0abc8a]/20 py-1 px-2">
                                            completed
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Inventory Alerts */}
                    <div className="rounded-xl w-full h-auto bg-white p-6">
                        <h2 className="text-xl font-bold">
                            Recent Transactions
                        </h2>
                        <div className="flex flex-col gap-2 mt-4">
                            <div className="flex justify-between rounded-lg bg-red-500/20 items-center p-4">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full p-2 bg-red-500/20 text-red-500">
                                        <CircleAlert />
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="font-bold text-lg">
                                            Nama produk
                                        </div>
                                        <div className="text-red-500 font-semibold">Critical alert: 2 units left</div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center">
                                    <div className="flex gap-2 items-center text-white font-semibold">
                                        <span className="text-sm rounded-lg bg-red-500 py-2 px-3 ">
                                            Reorder Now
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            <div className="flex justify-between rounded-lg bg-yellow-500/20 items-center p-4">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full p-2 bg-yellow-500/20 text-yellow-500">
                                        <TriangleAlert />
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="font-bold text-lg">
                                            Nama produk
                                        </div>
                                        <div className="text-yellow-500 font-semibold">Critical alert: 2 units left</div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center">
                                    <div className="flex gap-2 items-center text-white font-semibold">
                                        <span className="text-sm rounded-lg bg-yellow-500 py-2 px-3 ">
                                            Reorder Now
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
