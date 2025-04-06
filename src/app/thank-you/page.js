import Footer from "@/components/footer";
import NavigationBar from "@/components/navigation-bar";

export default function ThankYouPage() {
    return (
        <div className="bg-gray-100 min-h-screen text-black">
            <NavigationBar />
            <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
            <p className="text-lg">We’ve received your order and will process it shortly.</p>
            <Footer />
        </div>
    );
}
