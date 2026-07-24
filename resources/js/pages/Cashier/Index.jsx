import { Minus, Pen, PenLine, Plus, Search, Trash } from "lucide-react";
import ProductCard from "../../components/ProductCard";
import AppLayout from "../../layouts/AppLayout";
import card from "../../../images/card.jpg";
import cash from "../../../images/cash.png";
import qris from "../../../images/qris.png";
import ProductSearch from "@/components/ProductSearch";
import { useState } from "react";
import { formatPrice } from "@/helpers/formatPrice";
import { router } from "@inertiajs/react";
import toast from "react-hot-toast";

export default function Cashier({ products, categories, filters }) {
    const [orderItems, setOrderItems] = useState([]);
    const [payment, setPayment] = useState();
    const handleClickProduct = (product) => {
        setOrderItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, qty: item.qty + 1 }
                        : item,
                );
            }
            return [
                ...prev,
                {
                    id: product.id,
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    qty: 1,
                },
            ];
        });
    };

    const handleAddQty = (id) => {
        setOrderItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, qty: item.qty + 1 } : item,
            ),
        );
    };
    const handleReduceQty = (product) => {
        if (product.qty === 1) {
            setOrderItems((prev) =>
                prev.filter((item) => item.id !== product.id),
            );
        }
        setOrderItems((prev) =>
            prev.map((item) =>
                item.id === product.id ? { ...item, qty: item.qty - 1 } : item,
            ),
        );
    };
    const handleEmptyOrderItems = () => {
        setOrderItems([]);
    };

    const handleDeleteOrderItem = (id) => {
        setOrderItems((prev) => prev.filter((item) => item.id !== id));
    };

    const handleSetQty = (value, id) => {
        setOrderItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, qty: Number(value) } : item,
            ),
        );
    };

    const subtotal = orderItems.reduce(
        (total, item) => total + item.price * item.qty,
        0,
    );

    const tax = subtotal * 0.1; // PPN 10%

    const total = subtotal + tax;

    const handlePlaceOrder = () => {
        if (orderItems.length === 0) {
            toast.error("Order item still empty");
            return;
        }
        if (!payment) {
            toast.error("Choose payment method");
            return;
        }
        router.post("/orders", { items: orderItems, payment_method: payment }, {onSuccess: ()=>{
            setOrderItems([]);
            setPayment("");
        }});
    };

    return (
        <AppLayout>
            <div className="flex h-screen relative">
                <div className="flex-1 min-w-0 h-screen overflow-x-auto no-scrollbar">
                    <ProductSearch categories={categories} url={"/cashier"} filters={filters}/>
                    <div className={`grid xl:grid-cols-5 justify-center gap-4 p-6 ${orderItems.length > 0 ? "grid-cols-2" : "grid-cols-3" }`}>
                        {products.data.map((product) => (
                            <ProductCard
                                key={product.id}
                                stock={product.stock}
                                price={product.price}
                                image={`/storage/${product.image}`}
                                category={product.category.name}
                                name={product.name}
                                onClick={() => handleClickProduct(product)}
                            />
                        ))}
                    </div>
                </div>
                {orderItems.length > 0 && (
                    <div className="w-70 xl:w-100 h-screen relative bg-white">
                    <div className="flex justify-between items-center p-4 border-b border-gray-300 ">
                        <div className="text-2xl font-medium">
                            Current Order
                        </div>
                        <button
                            type="button"
                            onClick={handleEmptyOrderItems}
                            className="p-4 rounded-lg"
                        >
                            <Trash />
                        </button>
                    </div>
                    <div className="flex h-[calc(100vh-370px)] flex-col p-4 overflow-y-auto">
                        {orderItems.map((item) => (
                            <div
                                className="grid grid-cols-7 gap-2 items-center"
                                key={item.id}
                            >
                                <div className="col-span-2 aspect-square bg-[#f0f6f6] rounded-md flex items-center">
                                    <img
                                        src={`/storage/${item.image}`}
                                        alt="image product"
                                        className="object-contain"
                                    />
                                </div>
                                <div className="col-span-5 space-y-1">
                                    <div className="text-lg font-medium">
                                        {item.name}
                                    </div>
                                    <div className="text-gray-500">
                                        {formatPrice(item.price)}
                                    </div>

                                    <div className="flex gap-2 ">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDeleteOrderItem(item.id)
                                            }
                                            className="w-fit p-2 bg-[#f0f6f6] rounded-md"
                                        >
                                            <Trash
                                                className="text-gray-500"
                                                size={15}
                                            />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleReduceQty(item)
                                            }
                                            className="px-2 py-0.5 bg-[#f0f6f6]"
                                        >
                                            <Minus size={20} />
                                        </button>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            value={item.qty}
                                            onChange={(e) =>
                                                handleSetQty(
                                                    e.target.value,
                                                    item.id,
                                                )
                                            }
                                            size={String(item.qty).length}
                                            className="text-center"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleAddQty(item.id)
                                            }
                                            className="px-2 py-0.5 bg-[#f0f6f6]"
                                        >
                                            <Plus size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="absolute bottom-0 left-0 p-4 bg-white w-full">
                        <div className="text-lg">Payment summary</div>
                        <div className="grid grid-cols-3 w-full  text-gray-400">
                            <div className="col-span-2">Sub total</div>
                            <div className="col-span-1 flex justify-end ">
                                <div>{formatPrice(subtotal)}</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 w-full  text-gray-400">
                            <div className="col-span-2">Tax (10%)</div>
                            <div className="col-span-1 flex justify-end ">
                                <div>{formatPrice(tax)}</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 w-full">
                            <div className="col-span-2 font-medium">Total</div>
                            <div className="col-span-1 flex justify-end ">
                                <div>{formatPrice(total)}</div>
                            </div>
                        </div>
                        <div className="text-lg font-medium mt-4">
                            Payment Method
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setPayment("card");
                                }}
                                className={`px-3 xl:px-6 py-1 border   flex items-center rounded-md hover:border-secondary1 ${payment === "card" ? "border border-secondary1" : ""}`}
                            >
                                <img src={card} alt="icon card" />
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setPayment("cash");
                                }}
                                className={`px-3 xl:px-6 py-1 border   flex items-center rounded-md hover:border-secondary1 ${payment === "cash" ? "border border-secondary1" : ""}`}
                            >
                                <img src={cash} alt="icon cash" />
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setPayment("qris");
                                }}
                                className={`px-3 xl:px-6 py-1 border  flex items-center rounded-md hover:border-secondary1 ${payment === "qris" ? "border border-secondary1" : ""} `}
                            >
                                <img src={qris} alt="icon qris" />
                            </button>
                        </div>
                        <button
                            type="button"
                            onClick={handlePlaceOrder}
                            className="p-3 text-center bg-secondary1 rounded-md text-white w-full my-2"
                        >
                            Place Order
                        </button>
                    </div>
                </div>
                )}
            </div>
        </AppLayout>
    );
}
