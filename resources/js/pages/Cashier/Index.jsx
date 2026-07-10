import { Minus, Pen, PenLine, Plus, Search, Trash } from "lucide-react";
import ProductCard from "../../components/ProductCard";
import AppLayout from "../../layouts/AppLayout";
import card from "../../../images/card.jpg";
import cash from "../../../images/cash.png";
import qris from "../../../images/qris.png";

export default function Cashier() {
    const image =
        "https://s3-publishing-cmn-svc-prd.s3.ap-southeast-1.amazonaws.com/article/UoLR8_o3nEHFjV5b1sQ5z/original/045285900_1547016776-4-Cara-Bikin-Kebiasaan-Minum-Kopi-Jadi-Lebih-Sehat-By-Ruslan-Semichev-Shutterstock.jpg";

    return (
        <AppLayout>
            <div className="flex h-screen relative">
                <div className="flex-1 min-w-0 h-screen overflow-x-auto no-scrollbar">
                    <div className="sticky top-0 z-10 bg-[#f0f6f6] ">
                        <div className="grid grid-cols-8 w-full p-6 pb-0 pr-4 gap-4 ">
                            <div className="col-span-6 bg-white rounded-xl border border-gray-300 hover:border-secondary rounded-lg relative outline-none">
                                <input
                                    type="text"
                                    className="p-3.5 pl-12 w-full text-xl outline-none text-gray-600"
                                />
                                <div className="absolute pl-3 h-full top-0 flex items-center">
                                    <Search
                                        size={30}
                                        className="text-gray-600"
                                    />
                                </div>
                            </div>
                            <div className="col-span-2 w-full grid grid-cols-1">
                                <select
                                    id="country"
                                    name="country"
                                    autoComplete="country-name"
                                    className="col-start-1 text-xl text-gray-600 border border-gray-300  focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none  row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3  outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                                >
                                    <option>Food</option>
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
                        </div>
                    </div>
                    <div className="grid grid-cols-4 justify-center gap-4 p-6 pr-0">
                        {Array.from({ length: 36 }).map((_, index) => (
                            <ProductCard
                                key={index + 1}
                                stock={20}
                                price="Rp. 20,000"
                                image={image}
                                category="Food"
                                name="Kopi ireng"
                                hreff="Products.Create"
                            />
                        ))}
                    </div>
                </div>
                <div className="w-100 h-screen relative bg-white">
                    <div className="flex justify-between items-center p-4 border-b border-gray-300 ">
                        <div className="text-2xl font-medium">
                            Current Order
                        </div>
                        <div className="p-4 rounded-lg">
                            <Trash />
                        </div>
                    </div>
                    <div className="flex h-[calc(100vh-370px)] flex-col p-4 overflow-y-auto">
                        {Array.from({ length: 12 }).map((_, index) => (
                            <div
                                className="grid grid-cols-7 gap-2 items-center"
                                key={index}
                            >
                                <div className="col-span-2 aspect-square bg-[#f0f6f6] rounded-md flex items-center">
                                    <img
                                        src={image}
                                        alt="image product"
                                        className="object-contain"
                                    />
                                </div>
                                <div className="col-span-3 space-y-1">
                                    <div className="text-lg font-medium">
                                        Lemon
                                    </div>
                                    <div className="text-gray-500">
                                        Rp. 10,000
                                    </div>
                                    <div className="w-fit p-1.5 bg-[#f0f6f6] rounded-md">
                                        <PenLine
                                            className="text-gray-500"
                                            size={15}
                                        />
                                    </div>
                                </div>
                                <div className="col-span-2 flex gap-2 ">
                                    <div className="px-2 py-0.5 bg-[#f0f6f6]">
                                        <Minus size={20} />
                                    </div>
                                    <span>1</span>
                                    <div className="px-2 py-0.5 bg-[#f0f6f6]">
                                        <Plus size={20} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="absolute bottom-0 left-0 p-4 bg-white w-full">
                        <div className="text-lg">Payment summary</div>
                        <div className="grid grid-cols-3 w-full  text-gray-400">
                            <div className="col-span-2">Sub total</div>
                            <div className="col-span-1 flex justify-between ">
                                <div>IDR</div>
                                <div>Rp 20,000</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 w-full  text-gray-400">
                            <div className="col-span-2">Tax (10%)</div>
                            <div className="col-span-1 flex justify-between ">
                                <div>IDR</div>
                                <div>Rp. 2,000</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 w-full">
                            <div className="col-span-2 font-medium">Total</div>
                            <div className="col-span-1 flex justify-between ">
                                <div>IDR</div>
                                <div>Rp 22,000</div>
                            </div>
                        </div>
                        <div className="text-lg font-medium mt-4">
                            Payment Method
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <div className="px-6 py-1 border border-gray-200 flex items-center rounded-md hover:border-secondary">
                                <img src={card} alt="" />
                            </div>
                            <div className="px-6 py-1 border border-gray-200 flex items-center rounded-md hover:border-secondary">
                                <img src={cash} alt="" />
                            </div>
                            <div className="px-6 py-1 border border-gray-200 flex items-center rounded-md hover:border-secondary">
                                <img src={qris} alt="" />
                            </div>
                        </div>
                        <button className="p-3 text-center bg-secondary rounded-md text-white w-full my-2">
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
