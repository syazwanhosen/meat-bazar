"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import NavigationBar from "../navigation-bar";
import Footer from "../footer";

export default function ProductForm({ productId }) {
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        weight: "",
        halalCertified: false,
    });
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!productId) return;
            setIsEditMode(true);
            try {
                const res = await axios.get(`http://localhost:5000/api/products/${productId}`);
                const data = res.data;
                setProduct({
                    name: data.name || "",
                    description: data.description || "",
                    price: data.price || "",
                    category: data.category || "",
                    weight: data.weight || "",
                    halalCertified: data.halalCertified || false,
                });
            } catch (err) {
                setMessage("Failed to load product for editing.");
            }
        };

        fetchProduct();
    }, [productId]);

    const handleSubmit = async () => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");
        if (!token) return setMessage("Unauthorized. Please login.");

        const formData = new FormData();
        Object.keys(product).forEach((key) => formData.append(key, product[key]));
        formData.append("seller", storedUser.id);
        if (image) formData.append("image", image);

        try {
            if (isEditMode) {
                await axios.put(`http://localhost:5000/api/products/${productId}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                });
                setMessage("Product updated successfully.");
            } else {
                await axios.post("http://localhost:5000/api/products", formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                });
                setMessage("Product added successfully.");
            }
        } catch (err) {
            setMessage(err.response?.data?.message || "Failed to save product.");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen text-black">
            <NavigationBar />
            <div className="p-6 flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-4">{isEditMode ? "Edit Product" : "Add Product"}</h2>
                {message && <p className="text-red-500">{message}</p>}

                <input type="text" placeholder="Product Name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} className="p-2 border rounded mb-4 w-96" />
                <textarea placeholder="Description" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} className="p-2 border rounded mb-4 w-96"></textarea>
                <input type="number" placeholder="Price (RM)" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} className="p-2 border rounded mb-4 w-96" />
                <input type="text" placeholder="Category" value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })} className="p-2 border rounded mb-4 w-96" />
                <input type="number" placeholder="Weight (kg)" value={product.weight} onChange={(e) => setProduct({ ...product, weight: e.target.value })} className="p-2 border rounded mb-4 w-96" />

                <label className="flex items-center space-x-2 mb-4">
                    <input type="checkbox" checked={product.halalCertified} onChange={(e) => setProduct({ ...product, halalCertified: e.target.checked })} />
                    <span>Halal Certified</span>
                </label>

                <input type="file" onChange={(e) => setImage(e.target.files[0])} className="p-2 border rounded mb-4 w-96" />

                <button onClick={handleSubmit} className="bg-green-600 text-white px-6 py-2 rounded">
                    {isEditMode ? "Update Product" : "Add Product"}
                </button>
            </div>
            <Footer />
        </div>
    );
}
