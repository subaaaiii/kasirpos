import {
    ArrowDown,
    ArrowLeftRight,
    ArrowUp,
    BanknoteArrowUp,
    ChartNoAxesCombined,
    CircleAlert,
    CircleDollarSign,
    CreditCard,
    ShoppingBasket,
    TriangleAlert,
    User,
} from "lucide-react";
import AppLayout from "../layouts/AppLayout";
import SalesChart from "../components/chart";
import { useState, useEffect } from "react";
import { formatPrice } from "@/helpers/formatPrice";

export default function Dashboard() {
    const image =
        "https://s3-publishing-cmn-svc-prd.s3.ap-southeast-1.amazonaws.com/article/UoLR8_o3nEHFjV5b1sQ5z/original/045285900_1547016776-4-Cara-Bikin-Kebiasaan-Minum-Kopi-Jadi-Lebih-Sehat-By-Ruslan-Semichev-Shutterstock.jpg";

    const [summary, setSummary] = useState({
        revenue: null,
        transactions: null,
        itemsSold: null,
        average: null,
    });

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const [revenueRes, transactionsRes, itemsSoldRes, averageRes] =
                    await Promise.all([
                        fetch("/api/sales/revenue"),
                        fetch("/api/sales/transactions"),
                        fetch("/api/sales/items-sold"),
                        fetch("/api/sales/average"),
                    ]);

                if (
                    !revenueRes.ok ||
                    !transactionsRes.ok ||
                    !itemsSoldRes.ok ||
                    !averageRes.ok
                ) {
                    throw new Error("Failed to fetch summary");
                }

                const [revenue, transactions, itemsSold, average] =
                    await Promise.all([
                        revenueRes.json(),
                        transactionsRes.json(),
                        itemsSoldRes.json(),
                        averageRes.json(),
                    ]);

                setSummary({
                    revenue,
                    transactions,
                    itemsSold,
                    average,
                });
            } catch (error) {
                console.error(error);
            }
        };

        fetchSummary();
    }, []);

    const previousDate = summary?.revenue?.previous_date;

    const previousLabel = (() => {
        if (!previousDate) return "-";

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const previous = new Date(previousDate);

        if (previous.toDateString() === yesterday.toDateString()) {
            return "yesterday";
        }

        return previous.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    })();

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchChart = async () => {
            const res = await fetch("/api/sales/chart");
            const data = await res.json();

            setChartData(data);
        };

        fetchChart();
    }, []);

    const [filterPeriod, setFilterPeriod] = useState("day");
    const [topProducts, setTopProducts] = useState([]);

    useEffect(() => {
        const fetchTopProducts = async () => {
            const res = await fetch(
                "/api/sales/top-products?period=" + filterPeriod,
            );
            const data = await res.json();

            setTopProducts(data);
        };

        fetchTopProducts();
    }, [filterPeriod]);

    if (!summary) return <p>Loading...</p>;

    useEffect(() => {
        console.log(topProducts);
    }, [topProducts]);
    return (
        <AppLayout>
            <div className="p-6 h-screen overflow-y-auto">
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
                                    {formatPrice(
                                        summary?.revenue?.value.toLocaleString(),
                                    )}
                                </div>
                            </div>
                            <div>
                                <div className="rounded-full p-3 bg-secondary1/15">
                                    <CircleDollarSign className="w-8 h-8 text-secondary1 " />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between mt-4">
                            {summary?.revenue?.percent >= 0 ? (
                                <div className="flex text-secondary1 items-center">
                                    <ArrowUp />
                                    <span className="text-xl">
                                        {summary?.revenue?.percent.toFixed(2)}%
                                    </span>
                                </div>
                            ) : (
                                <div className="flex text-red-500 items-center">
                                    <ArrowDown />
                                    <span className="text-xl">
                                        {summary?.revenue?.percent.toFixed(2)}%
                                    </span>
                                </div>
                            )}
                            <div className="text-xl text-gray-400">
                                From {previousLabel}
                            </div>
                        </div>
                    </div>
                    <div className="rounded-md rounded-xl bg-white p-6">
                        <div className="flex justify-between">
                            <div className="flex-col">
                                <div className="text-xl text-gray-400">
                                    Transactions
                                </div>
                                <div className="text-3xl font-bold">
                                    {summary?.transactions?.value.toLocaleString()}
                                </div>
                            </div>
                            <div>
                                <div className="rounded-full p-3 bg-blue-600/15">
                                    <ArrowLeftRight className="w-8 h-8 text-blue-600 " />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between mt-6">
                            {summary?.transactions?.percent >= 0 ? (
                                <div className="flex text-secondary1 items-center">
                                    <ArrowUp />
                                    <span className="text-xl">
                                        {summary?.transactions?.percent.toFixed(
                                            2,
                                        )}
                                        %
                                    </span>
                                </div>
                            ) : (
                                <div className="flex text-red-500 items-center">
                                    <ArrowDown />
                                    <span className="text-xl">
                                        {summary?.transactions?.percent.toFixed(
                                            2,
                                        )}
                                        %
                                    </span>
                                </div>
                            )}
                            <div className="text-xl text-gray-400">
                                From {previousLabel}
                            </div>
                        </div>
                    </div>
                    <div className="rounded-md rounded-xl bg-white p-6">
                        <div className="flex justify-between">
                            <div className="flex-col">
                                <div className="text-xl text-gray-400">
                                    Items Sold
                                </div>
                                <div className="text-3xl font-bold">
                                    {summary?.itemsSold?.value.toLocaleString()}
                                </div>
                            </div>
                            <div>
                                <div className="rounded-full p-3 bg-purple-600/15">
                                    <ShoppingBasket className="w-8 h-8 text-purple-600 " />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between mt-4">
                            {summary?.itemsSold?.percent >= 0 ? (
                                <div className="flex text-secondary1 items-center">
                                    <ArrowUp />
                                    <span className="text-xl">
                                        {summary?.itemsSold?.percent.toFixed(2)}
                                        %
                                    </span>
                                </div>
                            ) : (
                                <div className="flex text-red-500 items-center">
                                    <ArrowDown />
                                    <span className="text-xl">
                                        {summary?.itemsSold?.percent.toFixed(2)}
                                        %
                                    </span>
                                </div>
                            )}
                            <div className="text-xl text-gray-400">
                                From {previousLabel}
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
                                    {formatPrice(
                                        summary?.average?.value.toLocaleString(),
                                    )}
                                </div>
                            </div>
                            <div>
                                <div className="rounded-full p-3 bg-yellow-600/15">
                                    <ChartNoAxesCombined className="w-8 h-8 text-yellow-600 " />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between mt-4">
                            {summary?.average?.percent >= 0 ? (
                                <div className="flex text-secondary1 items-center">
                                    <ArrowUp />
                                    <span className="text-xl">
                                        {summary?.average?.percent.toFixed(2)}%
                                    </span>
                                </div>
                            ) : (
                                <div className="flex text-red-500 items-center">
                                    <ArrowDown />
                                    <span className="text-xl">
                                        {summary?.average?.percent.toFixed(2)}%
                                    </span>
                                </div>
                            )}
                            <div className="text-xl text-gray-400">
                                From {previousLabel}
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
                        <SalesChart data={chartData} />
                    </div>
                    {/* top products */}
                    <div className="rounded-xl w-full h-auto bg-white p-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">Top Products</h2>
                            <div className="flex gap-2">
                                <button onClick={()=>setFilterPeriod('day')}
                                    className={`rounded-full py-1 px-6 text-sm ${filterPeriod === "day" ? "bg-primary1 text-white" : "border border-primary1 text-primary1"} `}
                                >
                                    day
                                </button>
                                <button onClick={()=>setFilterPeriod('week')}
                                    className={`rounded-full py-1 px-6 text-sm ${filterPeriod === "week" ? "bg-primary1 text-white" : "border border-primary1 text-primary1"} `}
                                >
                                    week
                                </button>
                                <button onClick={()=>setFilterPeriod('month')}
                                    className={`rounded-full py-1 px-6 text-sm ${filterPeriod === "month" ? "bg-primary1 text-white" : "border border-primary1 text-primary1"} `}
                                >
                                    month
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-2">
                            {topProducts.map((product) => (
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="aspect-[1.5/1]">
                                            <img
                                                src={`/storage/${product.image}`}
                                                className="h-15 w-20 object-contain rounded-lg"
                                                alt="kopi"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="font-bold text-lg">
                                                {product.name}
                                            </div>
                                            <div>
                                                {product.total_sold} Units sold
                                            </div>
                                        </div>
                                    </div>
                                    <div className="font-bold text-lg">
                                        {formatPrice(product.revenue)}
                                    </div>
                                </div>
                            ))}
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
                                    <div className="flex gap-2 items-center text-secondary1">
                                        <span className="text-sm rounded-full bg-secondary1/20 py-1 px-2">
                                            completed
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full p-2 bg-secondary1/20 text-secondary1">
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
                                    <div className="flex gap-2 items-center text-secondary1">
                                        <span className="text-sm rounded-full bg-secondary1/20 py-1 px-2">
                                            completed
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full p-2 bg-secondary1/20 text-secondary1">
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
                                    <div className="flex gap-2 items-center text-secondary1">
                                        <span className="text-sm rounded-full bg-secondary1/20 py-1 px-2">
                                            completed
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full p-2 bg-secondary1/20 text-secondary1">
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
                                    <div className="flex gap-2 items-center text-secondary1">
                                        <span className="text-sm rounded-full bg-secondary1/20 py-1 px-2">
                                            completed
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Inventory Alerts */}
                    <div className="rounded-xl w-full h-auto bg-white p-6">
                        <h2 className="text-xl font-bold">Inventory alerts</h2>
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
                                        <div className="text-red-500 font-semibold">
                                            Critical alert: 2 units left
                                        </div>
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
                                        <div className="text-yellow-500 font-semibold">
                                            Critical alert: 2 units left
                                        </div>
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
