import Link from "next/link";

export default function NavigationBar() {
    return (
        <header className="bg-blue-300 text-white p-4 flex justify-between items-center shadow-md">
            <h1 className="text-2xl font-bold">MeatBazar</h1>
            <nav>
                <ul className="flex space-x-6">
                    <li><Link href="/" className="hover:underline">Home</Link></li>
                    <li><Link href="/seller-list" className="hover:underline">Seller List</Link></li>
                    <li><Link href="/promotion" className="hover:underline">Promotion</Link></li>
                    <li><Link href="/news" className="hover:underline">News</Link></li>
                    <li><Link href="/halal-certificate" className="hover:underline">Halal Certificate</Link></li>
                </ul>
            </nav>
            <div className="flex space-x-4">
                <button className="bg-white text-blue-600 px-4 py-2 rounded"><Link href="/checkout">🛒 Add to Cart</Link></button>
                <button className="bg-white text-blue-600 px-4 py-2 rounded"><Link href="/login">👤</Link></button>
            </div>
        </header>
    )
}