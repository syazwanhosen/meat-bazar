import { useState } from "react";

import Footer from "../footer";
import NavigationBar from "../navigation-bar";

export default function HalalCertificate() {
    const [selectedFarm, setSelectedFarm] = useState("Janda Baik Farm");

    return (
        <div className="bg-gray-100">

            <NavigationBar />
            <div className="min-h-screen p-6">
                <div className="relative">
                    <img src="/farm-background.jpg" alt="Farm Background" className="w-full h-96 object-cover" />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-black">
                        <select
                            className="bg-green-300 px-4 py-2 rounded text-black font-bold"
                            value={selectedFarm}
                            onChange={(e) => setSelectedFarm(e.target.value)}
                        >
                            <option value="Janda Baik Farm">Janda Baik Farm</option>
                            <option value="Kuala Farm">Kuala Farm</option>
                            <option value="Selangor Farm">Selangor Farm</option>
                        </select>
                        <h1 className="text-2xl font-bold mt-4">Halal Certificate of {selectedFarm}</h1>
                        <div className="mt-4 p-4 border-2 border-blue-600 bg-white">
                            <img src="/halal-certificate.jpg" alt="Halal Certificate" className="w-96 shadow-lg" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}