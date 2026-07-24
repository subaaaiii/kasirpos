import {
    ArrowDown,
    ArrowLeftRight,
    ArrowUp,
    BanknoteArrowUp,
    ChartNoAxesCombined,
    CircleAlert,
    CircleDollarSign,
    CreditCard,
    ScanQrCode,
    ShoppingBasket,
    TriangleAlert,
    User,
    LoaderCircle,
} from "lucide-react";

import AppLayout from "../layouts/AppLayout";
import SalesChart from "../components/chart";
import { useState, useEffect } from "react";
import { formatPrice } from "@/helpers/formatPrice";
import { router } from "@inertiajs/react";

export default function Dashboard() {
    const [summaryLoading, setSummaryLoading] = useState(true);
    const [chartLoading, setChartLoading] = useState(true);
    const [topProductsLoading, setTopProductsLoading] = useState(true);
    const [recentLoading, setRecentLoading] = useState(true);
    const [stockLoading, setStockLoading] = useState(true);
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
            } finally {
                setSummaryLoading(false);
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
            try {
                const res = await fetch("/api/sales/chart");
                const data = await res.json();

                setChartData(data);
            } catch (error) {
                console.error(error);
            } finally {
                setChartLoading(false);
            }
        };

        fetchChart();
    }, []);

    const [filterPeriod, setFilterPeriod] = useState("day");
    const [topProducts, setTopProducts] = useState([]);

    useEffect(() => {
        const fetchTopProducts = async () => {
            try {
                const res = await fetch(
                    "/api/sales/top-products?period=" + filterPeriod,
                );
                const data = await res.json();

                setTopProducts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setTopProductsLoading(false);
            }
        };

        fetchTopProducts();
    }, [filterPeriod]);

    const [recentTransactions, setRecentTransactions] = useState([]);

    useEffect(() => {
        const fetchRecentProduct = async () => {
            try {
                const res = await fetch("/api/orders/recent");
                const data = await res.json();

                setRecentTransactions(data);
            } catch (error) {
                console.error(error);
            } finally {
                setRecentLoading(false);
            }
        };

        fetchRecentProduct();
    }, []);

    const [lowStockProducts, setLowStockProducts] = useState([]);

    useEffect(() => {
        const fetchLowStockProducts = async () => {
            try {
                const res = await fetch("/api/products/low-stock");
                const data = await res.json();

                setLowStockProducts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setStockLoading(false);
            }
        };

        fetchLowStockProducts();
    }, []);

    const isLoading =
    summaryLoading ||
    chartLoading ||
    topProductsLoading ||
    recentLoading ||
    stockLoading;

    if (isLoading) {
        return (
            <AppLayout>
                <div className="flex h-screen items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <LoaderCircle className="h-10 w-10 animate-spin text-primary" />
                    <p className="text-sm text-gray-500">
                        Loading dashboard...
                    </p>
                </div>
            </div>
            </AppLayout>
        );
    }
    return (
        <AppLayout>
            <div className="p-6 h-screen overflow-y-auto">
                <h1 className="text-3xl font-semibold">Today's Overview</h1>
                <h2 className="text-gray-400 ">
                    Welcome back, Here's what happening today
                </h2>
                <section className="mt-4 grid grid-cols-2 xl:grid-cols-4  gap-6">
                    <div className="rounded-md rounded-xl bg-white p-6">
                        <div className="flex justify-between">
                            <div className="flex-col">
                                <div className="text-xl text-gray-400">
                                    Total sales
                                </div>
                                <div className="text-3xl font-bold">
                                    {formatPrice(summary?.revenue?.value)}
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
                                    {summary?.transactions?.value}
                                </div>
                            </div>
                            <div>
                                <div className="rounded-full p-3 bg-secondary1/15">
                                    <ArrowLeftRight className="w-8 h-8 text-secondary1 " />
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
                                    {summary?.itemsSold?.value}
                                </div>
                            </div>
                            <div>
                                <div className="rounded-full p-3 bg-secondary1/15">
                                    <ShoppingBasket className="w-8 h-8 text-secondary1 " />
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
                                    {formatPrice(summary?.average?.value)}
                                </div>
                            </div>
                            <div>
                                <div className="rounded-full p-3 bg-secondary1/15">
                                    <ChartNoAxesCombined className="w-8 h-8 text-secondary1 " />
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
                <section className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
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
                                <button
                                    onClick={() => setFilterPeriod("day")}
                                    className={`rounded-full py-1 px-6 text-sm ${filterPeriod === "day" ? "bg-primary1 text-white" : "border border-primary1 text-primary1"} `}
                                >
                                    day
                                </button>
                                <button
                                    onClick={() => setFilterPeriod("week")}
                                    className={`rounded-full py-1 px-6 text-sm ${filterPeriod === "week" ? "bg-primary1 text-white" : "border border-primary1 text-primary1"} `}
                                >
                                    week
                                </button>
                                <button
                                    onClick={() => setFilterPeriod("month")}
                                    className={`rounded-full py-1 px-6 text-sm ${filterPeriod === "month" ? "bg-primary1 text-white" : "border border-primary1 text-primary1"} `}
                                >
                                    month
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-2">
                            {topProducts.length > 0 ? (
                                topProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="flex justify-between items-center"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="aspect-[1.5/1]">
                                                <img
                                                    src={`/storage/${product.image}`}
                                                    className="h-12 w-12 object-contain rounded-lg"
                                                    alt={product.name}
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="font-bold text-lg">
                                                    {product.name}
                                                </div>
                                                <div>
                                                    {product.total_sold} Units
                                                    sold
                                                </div>
                                            </div>
                                        </div>

                                        <div className="font-bold text-lg">
                                            {formatPrice(product.revenue)}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
                                    <p className="text-lg font-medium">
                                        No data available
                                    </p>
                                    <p className="text-sm">
                                        There are no top-selling products for
                                        the {filterPeriod} period.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
                <section className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
                    {/* Recent transactions */}
                    <div className="rounded-xl w-full h-auto bg-white p-6">
                        <h2 className="text-xl font-bold">
                            Recent Transactions
                        </h2>
                        <div className="flex flex-col gap-2 mt-4">
                            {recentTransactions.map((trx) => (
                                <div
                                    key={trx.id}
                                    className="flex justify-between"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="rounded-full p-3 bg-secondary1/20 text-secondary1">
                                            {trx.payment_method === "card" ? (
                                                <CreditCard />
                                            ) : trx.payment_method ===
                                              "qris" ? (
                                                <ScanQrCode />
                                            ) : (
                                                <BanknoteArrowUp />
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="font-bold text-lg">
                                                {trx.payment_method}
                                            </div>
                                            <div>{trx.order_number}</div>
                                            <div className="text-gray-400 text-sm">
                                                {new Date(
                                                    trx.created_at,
                                                ).toLocaleString({
                                                    day: "2-digit",
                                                    month: "long",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end">
                                        <div className="font-bold text-lg">
                                            {formatPrice(trx.grand_total)}
                                        </div>
                                        <div className="flex items-center text-secondary1">
                                            <span className="text-sm rounded-full bg-secondary1/20 py-1 px-2">
                                                completed
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Inventory Alerts */}
                    <div className="rounded-xl w-full h-auto bg-white p-6">
                        <h2 className="text-xl font-bold">Inventory alerts</h2>
                        {lowStockProducts.map((product) =>
                            product.stock <= 5 ? (
                                <div
                                    key={product.id}
                                    className="flex flex-col gap-2 mt-4"
                                >
                                    <div className="flex justify-between rounded-lg bg-red-500/20 items-center p-4">
                                        <div className="flex items-center gap-4">
                                            <div className="rounded-full p-2 bg-red-500/20 text-red-500">
                                                <CircleAlert />
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="font-bold text-lg">
                                                    {product.name}
                                                </div>
                                                <div className="text-red-500 font-semibold">
                                                    Critical alert:{" "}
                                                    {product.stock} units left
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    router.visit(
                                                        `/products/${product.id}/edit`,
                                                    )
                                                }
                                                className="cursor-pointer flex gap-2 items-center text-white font-semibold"
                                            >
                                                <span className="text-sm rounded-lg bg-red-500 py-2 px-3 ">
                                                    Restock Now
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    key={product.id}
                                    className="flex flex-col gap-2 mt-4"
                                >
                                    <div className="flex justify-between rounded-lg bg-yellow-500/20 items-center p-4">
                                        <div className="flex items-center gap-4">
                                            <div className="rounded-full p-2 bg-yellow-500/20 text-yellow-500">
                                                <TriangleAlert />
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="font-bold text-lg">
                                                    {product.name}
                                                </div>
                                                <div className="text-yellow-500 font-semibold">
                                                    Alert: {product.stock} units
                                                    left
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    router.visit(
                                                        `/products/${product.id}/edit`,
                                                    )
                                                }
                                                className="cursor-pointer flex gap-2 items-center text-white font-semibold"
                                            >
                                                <span className="text-sm rounded-lg bg-yellow-500 py-2 px-3 ">
                                                    Restock Now
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ),
                        )}
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
