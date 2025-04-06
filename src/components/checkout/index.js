"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import NavigationBar from "../navigation-bar";
import Footer from "../footer";
import { getUser, getToken } from "@/utils";

export default function Checkout({ productId }) {
    const token = getToken()
    const user = getUser()
    const router = useRouter();

    const [product, setProduct] = useState(null);
    const [order, setOrder] = useState({
        address: "",
        phone: "",
        quantity: 1,
        total: 0,
        deliveryFee: 4.0,
        paymentMethod: "Cash on Delivery",
        orderNotes: "",
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/products/${productId}`);
                setProduct(res.data);
                setOrder((prev) => ({
                    ...prev,
                    total: res.data.price // initialize total based on price and quantity
                }));
            } catch (err) {
                console.error("Failed to fetch product:", err);
            }
        };

        if (productId) fetchProduct();
    }, [productId]);

    const handleInputChange = (e) => {
        setOrder({ ...order, [e.target.name]: e.target.value });
    };

    const handleQuantityChange = (value) => {
        let newQuantity = order.quantity + value;
        if (newQuantity < 1) newQuantity = 1;
        const newTotal = product ? product.price * newQuantity : 0;
        setOrder({ ...order, quantity: newQuantity, total: newTotal });
    };

    const handlePaymentChange = (e) => {
        setOrder({ ...order, paymentMethod: e.target.value });
    };


    const handleConfirm = async () => {
        if (!order.address || !order.phone) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/orders", {
                buyer: user.id,
                productId: productId,
                quantity: order.quantity,
                total: order.total,
                address: order.address,
                phone: order.phone,
                deliveryFee: order.deliveryFee,
                paymentMethod: order.paymentMethod,
                orderNotes: order.orderNotes,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 201 || response.status === 200) {
                router.push("/thank-you");
            } else {
                alert("Failed to confirm order.");
            }
        } catch (err) {
            console.error("Error placing order:", err);
            alert("Something went wrong while placing the order.");
        }
    };



    return (
        <div className="bg-gray-100 min-h-screen">
            <NavigationBar />

            {/* Checkout Section */}
            <div className="relative flex justify-center items-center min-h-screen">
                <img src="/farm-background.jpg" alt="Farm Background" className="w-full h-full object-cover absolute" />
                <div className="relative  p-6 rounded-lg shadow-lg w-2/3 flex justify-between text-black">
                    {/* Left Section */}
                    <div className="w-1/2 p-4">
                        <h2 className="text-lg font-bold mb-4">Details</h2>
                        <div>
                            <label className="block text-sm font-semibold">Address:</label>
                            <input type="text" name="address" value={order.address} onChange={handleInputChange} className="w-full p-2 border rounded" required />
                        </div>
                        <div className="mt-2">
                            <label className="block text-sm font-semibold">Phone Number:</label>
                            <input type="text" name="phone" value={order.phone} onChange={handleInputChange} className="w-full p-2 border rounded" required />
                        </div>

                        <h2 className="text-lg font-bold mt-4">Payment Option</h2>
                        <div className="mt-2">
                            <label className="flex items-center space-x-2">
                                <input type="radio" name="paymentMethod" value="Cash on Delivery" checked={order.paymentMethod === "Cash on Delivery"} onChange={handlePaymentChange} />
                                <span>Cash on Delivery</span>
                            </label>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="w-1/2 p-4">
                        <h2 className="text-lg font-bold mb-4">My Order ({order.quantity})</h2>

                        {product ? (
                            <>
                                <div className="flex items-center space-x-2">
                                    <button className="bg-gray-300 px-2 py-1 rounded" onClick={() => handleQuantityChange(-1)}>-</button>
                                    <span>{order.quantity}</span>
                                    <button className="bg-gray-300 px-2 py-1 rounded" onClick={() => handleQuantityChange(1)}>+</button>
                                    <span className="ml-4">{product.name}</span>
                                </div>


                            </>
                        ) : (
                            <p>Loading product...</p>
                        )}

                        <h2 className="text-lg font-bold mt-4">Order Notes</h2>
                        <textarea className="w-full p-2 border rounded h-16" name="orderNotes" value={order.orderNotes} onChange={handleInputChange}></textarea>

                        <div className="mt-4">
                            <p>Total: RM {order.total.toFixed(2)}</p>
                            <p>Delivery Fee: RM {order.deliveryFee.toFixed(2)}</p>
                        </div>

                        <button onClick={handleConfirm} className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full">CONFIRM</button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
