
"use client"
import { useParams } from "next/navigation";

import AddProduct from "@/components/add-product";

export default function AddProductPage() {
    const params = useParams();
    const productId = params.id || "";

    return <AddProduct productId={productId} />
}
