import { useState } from "react";
import ProductCard from "../../components/ProductCard";
import AppLayout from "../../layouts/AppLayout";
import { Check, CircleX, PenLine, Plus, X } from "lucide-react";

export default function Create() {
    const image =
        "https://s3-publishing-cmn-svc-prd.s3.ap-southeast-1.amazonaws.com/article/UoLR8_o3nEHFjV5b1sQ5z/original/045285900_1547016776-4-Cara-Bikin-Kebiasaan-Minum-Kopi-Jadi-Lebih-Sehat-By-Ruslan-Semichev-Shutterstock.jpg";

    const [openModal, setOpenModal] = useState(false);
    // const [categories, setCategories] = useState(["Food", "beverages", "other"]);
    const [categories, setCategories] = useState([
        { name: "Food", isEditing: false },
        { name: "Drink", isEditing: false },
    ]);
    const handleAddCategory = () => {
    setCategories([
        ...categories,
        {
            name: "",
            isEditing: true,
        },
    ]);
};

    const handleEdit = (index) => {
        setCategories(
            categories.map((category, i) =>
                i === index
                    ? { ...category, isEditing: !category.isEditing }
                    : category,
            ),
        );
    };

    const handleChangeCategory = (index, value) => {
        setCategories(
            categories.map((category, i) =>
                i === index ? { ...category, name: value } : category,
            ),
        );
    };
    return (
        <AppLayout>
            <div className="grid grid-cols-2 mt-10">
                <form action="" className="max-w-xl w-full mx-auto">
                    <h1 className="text-3xl font-semibold">
                        Form create product
                    </h1>
                    <label
                        htmlFor="name"
                        className="block font-medium text-gray-900 mt-4"
                    >
                        Product name
                    </label>
                    <div className="mt-2">
                        <input
                            id="name"
                            type="text"
                            name="name"
                            autoComplete="product-name"
                            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                        />
                    </div>
                    <div className="flex flex justify-between items-center mt-4">
                        <label
                            htmlFor="country"
                            className="block font-medium text-gray-900"
                        >
                            Category
                        </label>
                        <button
                            onClick={() => setOpenModal(true)}
                            type="button"
                            className="text-primary cursor-pointer"
                        >
                            Manage categories
                        </button>
                    </div>
                    <div className="mt-2 grid grid-cols-1">
                        <select
                            id="country"
                            name="country"
                            autoComplete="country-name"
                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
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
                    <label
                        htmlFor="price"
                        className="block font-medium text-gray-900 mt-4"
                    >
                        Price
                    </label>
                    <div className="mt-2">
                        <input
                            id="price"
                            type="number"
                            name="price"
                            autoComplete="price"
                            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                        />
                    </div>
                    <label
                        htmlFor="stock"
                        className="block font-medium text-gray-900 mt-4"
                    >
                        Stock
                    </label>
                    <div className="mt-2">
                        <input
                            id="stock"
                            type="number"
                            name="stock"
                            autoComplete="stock"
                            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                        />
                    </div>

                    <div className="col-span-full mt-4">
                        <label
                            htmlFor="cover-photo"
                            className="block text-sm/6 font-medium text-gray-900"
                        >
                            Cover photo
                        </label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    data-slot="icon"
                                    aria-hidden="true"
                                    className="mx-auto size-12 text-gray-300"
                                >
                                    <path
                                        d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                    />
                                </svg>
                                <div className="mt-4 flex text-sm/6 text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md bg-transparent font-semibold text-primary focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary hover:text-indigo-500"
                                    >
                                        <span>Upload a file</span>
                                        <input
                                            id="file-upload"
                                            type="file"
                                            name="file-upload"
                                            className="sr-only"
                                        />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs/5 text-gray-600">
                                    PNG, JPG, GIF up to 10MB
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Cateegory modal --> */}
                    {openModal && (
                        <div
                            tabIndex={-1}
                            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center overflow-y-auto overflow-x-hidden justify-center items-center w-full"
                        >
                            <div className=" p-4 w-full max-w-2xl flex flex-col p-4">
                                {/* <!-- Modal content --> */}
                                <div className=" bg-white max-h-[90vh] overflow-y-auto rounded-lg shadow-sm p-4 md:p-6">
                                    {/* <!-- Modal header --> */}
                                    <div className="flex items-center justify-between border-b pb-4 md:pb-5">
                                        <h3 className="text-xl font-semibold text-heading">
                                            Manage categories
                                        </h3>
                                        <button
                                            type="button"
                                            onClick={() => setOpenModal(false)}
                                            className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
                                            data-modal-hide="default-modal"
                                        >
                                            <X />
                                            <span className="sr-only    ">
                                                Close modal
                                            </span>
                                        </button>
                                    </div>
                                    {/* <!-- Modal body --> */}
                                    <div className="space-y-4 p-4 md:py-6">
                                        {categories.map((category, index) => (
                                            <div
                                                key={index}
                                                className="flex gap-2 items-center "
                                            >
                                                <input
                                                    id="category"
                                                    type="text"
                                                    name="category"
                                                    autoComplete="product-name"
                                                    readOnly={
                                                        !category.isEditing
                                                    }
                                                    value={category.name}
                                                    onChange={(e) =>
                                                        handleChangeCategory(
                                                            index,
                                                            e.target.value,
                                                        )
                                                    }
                                                    className={`block w-full rounded-md px-3 py-2 outline-none ${
                                                        category.isEditing
                                                            ? "border border-primary"
                                                            : "border border-gray-300 bg-gray-100"
                                                    }`}
                                                />
                                                <div className="flex gap-2 items-center">
                                                    {category.isEditing ? (
                                                        <button
                                                            onClick={() =>
                                                                handleEdit(
                                                                    index,
                                                                )
                                                            }
                                                            type="button"
                                                        >
                                                            <Check size={18} />
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() =>
                                                                handleEdit(
                                                                    index,
                                                                )
                                                            }
                                                            type="button"
                                                        >
                                                            <PenLine
                                                                size={18}
                                                            />
                                                        </button>
                                                    )}
                                                    <CircleX />
                                                </div>
                                            </div>
                                        ))}
                                        <button
                                            disabled={categories.some(
                                                (category) =>
                                                    category.name.trim() === "",
                                            )}
                                            onClick={() => handleAddCategory()}
                                            className="border w-fit px-3 py-2 justify-self-center rounded-sm flex gap-1 items-center"
                                            type="button"
                                        >
                                            <Plus />
                                            <span>Add category</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
                <div>
                    <h2 className="text-3xl font-semibold">Preview</h2>
                    <div className="max-w-sm mt-4">
                        <ProductCard
                            stock={20}
                            price="Rp. 20,000"
                            image={image}
                            category="Food"
                            name="Kopi ireng"
                            preview
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
