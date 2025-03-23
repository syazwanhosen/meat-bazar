import React from "react";
import Head from "next/head";

import NavigationBar from "../navigation-bar";
import Footer from "../footer";
import Card from "../card";

const SELLER_LIST = [
    {
        id: 1,
        name: 'Janda Baik Farm',
        photo: '/farm.jpg',
        buttonLabel: 'Visit Store',
        href: '/product-list',
    },
    {
        id: 2,
        name: 'Golden Farm',
        photo: '/farm.jpg',
        buttonLabel: 'Visit Store',
        href: '/product-list',
    },
    {
        id: 3,
        name: 'Berkat Farm',
        photo: '/farm.jpg',
        buttonLabel: 'Visit Store',
        href: '/product-list',
    },
    {
        id: 4,
        name: 'Visa Rani Goat Farm',
        photo: '/farm.jpg',
        buttonLabel: 'Visit Store',
        href: '/product-list',
    },
    {
        id: 5,
        name: 'Golden Farm',
        photo: '/farm.jpg',
        buttonLabel: 'Visit Store',
        href: '/product-list',
    },
]

export default function Home() {
    return (
        <div className="bg-gray-100">
            <Head>
                <title>Meat Bazar - Home</title>
                <meta name="description" content="Online marketplace for halal meat" />
            </Head>
            <NavigationBar />
            <div className="min-h-screen ">
                <section className="relative text-center text-white py-16 bg-cover bg-center" style={{ backgroundImage: "url('/hero-bg.jpg')" }}>
                    <h2 className="text-3xl font-semibold">Welcome to Meat Bazar</h2>
                    <p className="text-lg italic">Quality Halal Meat, Straight from the Farm</p>
                </section>
                <main className="p-6 text-center">
                    <h3 className="text-xl font-semibold mb-4 bg-blue-200 py-2 inline-block px-6 rounded-full">Top Farm</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {SELLER_LIST.map((farm) => (
                            <Card key={farm.id} {...farm} />
                        ))}
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}
