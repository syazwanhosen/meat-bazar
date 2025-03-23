import Footer from "../footer";
import NavigationBar from "../navigation-bar";

export default function Promotion() {
    return (
        <div className="bg-gray-100">
            <NavigationBar />
            <div className="min-h-screen ">
                <div className="relative">
                    <img src="/promo-banner.jpg" alt="Promo Banner" className="w-full h-96 object-cover" />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                        <h1 className="text-3xl font-bold">Hari Raya 20% Promotion</h1>
                        <button className="bg-orange-500 text-white px-6 py-2 mt-4 rounded">
                            Claim Voucher
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}