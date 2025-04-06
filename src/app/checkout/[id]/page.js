"use client"
import { useParams } from "next/navigation";

import Checkout from "@/components/checkout";

export default function CheckoutPage() {
    const params = useParams();
    const productId = params.id || "";

    return <Checkout productId={productId} />
}
