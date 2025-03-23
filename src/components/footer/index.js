import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-blue-300 text-white p-6 mt-6 flex flex-col md:flex-row justify-between items-center" >
            <div>
                <h4 className="font-bold">MeatBazar</h4>
                <p>Real-time Web Based System</p>
                <p>Copyright © MeatBazar</p>
            </div>
            <div>
                <h4 className="font-bold">Contact Us</h4>
                <p>meatbazar@gmail.com</p>
                <p>+6013-3173750</p>
            </div>
            <div>
                <h4 className="font-bold">Follow Us On</h4>
                <div className="flex space-x-2">
                    <Link href="#"><Image src="/facebook.png" width={24} height={24} alt="Facebook" /></Link>
                    <Link href="#"><Image src="/youtube.png" width={24} height={24} alt="YouTube" /></Link>
                    <Link href="#"><Image src="/instagram.png" width={24} height={24} alt="Instagram" /></Link>
                </div>
            </div>
        </footer >
    )
}