import ProductCard from "../../components/ProductCard";
import AppLayout from "../../layouts/AppLayout";
import PlusIcon from "../../../images/plus.png";
import ProductSearch from "@/components/ProductSearch";
import { router } from "@inertiajs/react";

export default function Index({ products, categories }) {
    return (
        <AppLayout>
            <div className="h-screen overflow-y-auto ">
                <ProductSearch categories={categories} url={"/products"} />
                <div className="grid grid-cols-5 gap-4 pt-10 p-6">
                    <ProductCard
                        key={1}
                        stock={999}
                        price={99999}
                        image={PlusIcon}
                        category="New"
                        name={"Add new product"}
                        onClick={() => router.visit(`/products/create`)}
                    />
                    {products.data.map((product) => (
                        <ProductCard
                            key={product.id}
                            stock={product.stock}
                            price={product.price}
                            image={`/storage/${product.image}`}
                            category={product.category.name}
                            name={product.name}
                            onClick={() =>
                                router.visit(`/products/${product.id}/edit`)
                            }
                        />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
