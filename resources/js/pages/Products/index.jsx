import ProductCard from "../../components/ProductCard";
import AppLayout from "../../layouts/AppLayout";
import PlusIcon from "../../../images/plus.png";

export default function Show() {
    const image =
        "https://s3-publishing-cmn-svc-prd.s3.ap-southeast-1.amazonaws.com/article/UoLR8_o3nEHFjV5b1sQ5z/original/045285900_1547016776-4-Cara-Bikin-Kebiasaan-Minum-Kopi-Jadi-Lebih-Sehat-By-Ruslan-Semichev-Shutterstock.jpg";
    return (
        <AppLayout>
            <div className="grid grid-cols-5 gap-4">
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
        </AppLayout>
    );
}
