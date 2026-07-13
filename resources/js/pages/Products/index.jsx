import ProductCard from "../../components/ProductCard";
import AppLayout from "../../layouts/AppLayout";
import PlusIcon from "../../../images/plus.png";
import { Search } from "lucide-react";

export default function Show() {
    const image =
        "https://s3-publishing-cmn-svc-prd.s3.ap-southeast-1.amazonaws.com/article/UoLR8_o3nEHFjV5b1sQ5z/original/045285900_1547016776-4-Cara-Bikin-Kebiasaan-Minum-Kopi-Jadi-Lebih-Sehat-By-Ruslan-Semichev-Shutterstock.jpg";
    return (
        <AppLayout>
            <div className="h-screen overflow-y-auto ">
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
            <div className="grid grid-cols-5 gap-4 pt-10 p-6">
                <ProductCard
                    key={1}
                    stock={999}
                    price="Set your price"
                    image={PlusIcon}
                    category="New"
                    name={"Add new product"}
                    hreff="products/create"
                />
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
        </AppLayout>
    );
}
