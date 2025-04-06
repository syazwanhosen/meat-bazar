"use client"
import { useParams } from "next/navigation";

import ProductList from "@/components/product-list";

export default function ProductListPage() {
    const params = useParams();
    const sellerId = params.id || "";

    return <ProductList sellerId={sellerId} />
}
