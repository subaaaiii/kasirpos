import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import AppLayout from "../../layouts/AppLayout";
import {
    ArrowLeft,
    Check,
    CircleX,
    Link,
    PenLine,
    Plus,
    Save,
    SquarePen,
    Tag,
    Trash,
    X,
} from "lucide-react";
import { router, useForm } from "@inertiajs/react";
import { ConfirmDialog } from "@/components/ConfirmDialog";

export default function Form({ categories: initialCategories, product }) {
    const [openModal, setOpenModal] = useState(false);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        setCategories(
            (initialCategories || []).map((category) => ({
                ...category,
                isEditing: false,
            })),
        );
    }, [initialCategories]);
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

    const saveCategory = (category, index) => {
        if (category.id) {
            router.put(`/categories/${category.id}`, {
                name: category.name,
            });
        } else {
            router.post("/categories", {
                name: category.name,
            });
        }
        handleEdit(index);
    };

    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryName, setCategoryName] = useState(
        product?.category.name ?? "category",
    );
    const handleDeleteCategory = () => {
        router.delete(`/categories/${selectedCategory.id}`, {
            onSuccess: () => {
                router.reload({
                    only: ["categories"],
                });
            },
        });
        setOpen(false);
    };

    const {
        data,
        setData,
        post,
        errors,
        patch,
        delete: destroy,
    } = useForm({
        name: product?.name ?? "",
        category_id: product?.category_id ?? "",
        image: null,
        price: product ? Number(product?.price) : 0,
        stock: product?.stock ?? 0,
    });

    const initialImage = product ? `/storage/${product.image}` : null;

    const [preview, setPreview] = useState(initialImage);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData("image", file);

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    const handleDeleteImage = () => {
        setData("image", null);
        if (preview) {
            URL.revokeObjectURL(preview);
        }
        setPreview(null);
    };

    const [isEditing, setIsEditing] = useState(!product);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (product) {
            patch("/products/" + product.id, {
                onSuccess: () => {
                    setIsEditing(false);
                },
            });
        } else {
            post("/products");
        }
    };

    const handleDeleteProduct = () => {
        destroy("/products/" + product.id);
    };

    return (
        <AppLayout>
            <div className="grid grid-cols-2 mt-10">
                <form
                    onSubmit={handleSubmit}
                    className="max-w-xl w-full mx-auto"
                >
                    {product && (
                        <div className="flex items-center gap-2 ">
                            <button
                                onClick={() => router.visit("/products")}
                                type="button"
                                className="flex items-center cursor-pointer rounded-md shadow-md p-2 gap-2 "
                            >
                                <ArrowLeft size={20} />{" "}
                                <span>Back to products</span>
                            </button>
                            {isEditing ? (
                                <button
                                    type="submit"
                                    onClick={() => console.log("klik save")}
                                    className="flex items-center bg-secondary1 text-white cursor-pointer rounded-md shadow-md p-2 gap-2 "
                                >
                                    <Save size={20} /> <span>Save changes</span>
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsEditing(true);
                                    }}
                                    className="flex items-center cursor-pointer rounded-md shadow-md p-2 gap-2 "
                                >
                                    <SquarePen size={20} />{" "}
                                    <span>Edit product</span>
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={()=>setOpen(true)}
                                className="flex items-center cursor-pointer rounded-md shadow-md p-2 gap-2 "
                            >
                                <Trash size={20} /> <span>Delete product</span>
                            </button>
                        </div>
                    )}
                    <h1 className="mt-4 text-3xl font-semibold">
                        Form product
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
                            placeholder="Input product name"
                            value={data.name}
                            disabled={!isEditing}
                            onChange={(e) => setData("name", e.target.value)}
                            autoComplete="product-name"
                            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                        />
                    </div>
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.name}
                        </p>
                    )}
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
                            className="text-primary cursor-pointer flex items-center gap-2"
                        >
                            Manage categories
                            <Tag size={20} />
                        </button>
                    </div>
                    <div className="mt-2 grid grid-cols-1">
                        <select
                            id="category"
                            name="category_id"
                            value={data.category_id}
                            disabled={!isEditing}
                            onChange={(e) => {
                                const categoryId = Number(e.target.value);
                                setData("category_id", categoryId);
                                const category = categories.find(
                                    (category) => category.id === categoryId,
                                );
                                setCategoryName(category?.name ?? "");
                            }}
                            autoComplete="category-id"
                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                        >
                            <option value="" disabled>
                                Select Category
                            </option>
                            {categories.map((category, index) => (
                                <option key={index} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
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
                    {errors.category_id && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.category_id}
                        </p>
                    )}
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
                            value={data.price}
                            disabled={!isEditing}
                            onChange={(e) => setData("price", e.target.value)}
                            autoComplete="price"
                            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                        />
                    </div>
                    {errors.price && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.price}
                        </p>
                    )}
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
                            value={data.stock}
                            disabled={!isEditing}
                            onChange={(e) => setData("stock", e.target.value)}
                            autoComplete="stock"
                            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                        />
                    </div>
                    {errors.stock && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.stock}
                        </p>
                    )}
                    <div className="col-span-full mt-4">
                        <label
                            htmlFor="cover-photo"
                            className="block text-sm/6 font-medium text-gray-900"
                        >
                            Image
                        </label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-3 py-10 relative">
                            <div className="text-center">
                                {preview ? (
                                    <div className="">
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="w-60 h-40 object-cover rounded"
                                        />
                                        {isEditing && (
                                            <button
                                                type="button"
                                                onClick={handleDeleteImage}
                                                className="absolute top-4 right-4 p-2 rounded-lg bg-red-500/20 cursor-pointer text-red-500 flex gap-2 items-center"
                                            >
                                                <span>Delete image</span>
                                                <Trash size={20} className="" />
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    <>
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
                                                htmlFor="image"
                                                className="relative cursor-pointer rounded-md bg-transparent font-semibold text-primary focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input
                                                    id="image"
                                                    type="file"
                                                    name="image"
                                                    accept="image/*"
                                                    className="sr-only"
                                                    onChange={handleImageChange}
                                                />
                                            </label>
                                            <p className="pl-1">
                                                or drag and drop
                                            </p>
                                        </div>
                                        <p className="text-xs/5 text-gray-600">
                                            PNG, JPG, GIF up to 10MB
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                        {errors.image && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.image}
                            </p>
                        )}
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
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            if (
                                                                category.isEditing
                                                            ) {
                                                                saveCategory(
                                                                    category,
                                                                    index,
                                                                );
                                                            } else {
                                                                handleEdit(
                                                                    index,
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        {category.isEditing ? (
                                                            <Check size={18} />
                                                        ) : (
                                                            <PenLine
                                                                size={18}
                                                            />
                                                        )}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setOpen(true);
                                                            setSelectedCategory(
                                                                category,
                                                            );
                                                        }}
                                                    >
                                                        <CircleX />
                                                    </button>
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
                    <ConfirmDialog
                        open={open}
                        onOpenChange={setOpen}
                        title="Delete category?"
                        description="This action can't be undone"
                        onConfirm={handleDeleteCategory}
                    />

                    <ConfirmDialog
                        open={open}
                        onOpenChange={setOpen}
                        title="Delete this product?"
                        description="This action can't be undone"
                        onConfirm={handleDeleteProduct}
                    />
                    {!product && (
                        <div className="flex justify-center gap-2 mt-4">
                            <button
                                type="button"
                                className="py-2 px-8 border border-secondary shadow-md rounded-md"
                                onClick={() => router.visit("/products")}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="py-2 px-8 bg-secondary1 rounded-md shadow-md text-white"
                            >
                                Submit
                            </button>
                        </div>
                    )}
                </form>
                <div>
                    <h2 className="text-3xl font-semibold">Preview</h2>
                    <div className="max-w-sm mt-4">
                        <ProductCard
                            stock={data.stock}
                            price={data.price}
                            image={preview}
                            category={categoryName}
                            name={data.name}
                            preview
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
