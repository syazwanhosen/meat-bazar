import Card from "../card";
import Footer from "../footer";
import NavigationBar from "../navigation-bar";

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
    {
        id: 6,
        name: 'La Dairy Goat Farm',
        photo: '/farm.jpg',
        buttonLabel: 'Visit Store',
        href: '/product-list',
    },
    {
        id: 7,
        name: 'Sanen Dairy Goat Farm',
        photo: '/farm.jpg',
        buttonLabel: 'Visit Store',
        href: '/product-list',
    },
    {
        id: 8,
        name: 'Visha Farm',
        photo: '/farm.jpg',
        buttonLabel: 'Visit Store',
        href: '/product-list',
    },
    {
        id: 9,
        name: 'Khatij Farm',
        photo: '/farm.jpg',
        buttonLabel: 'Visit Store',
        href: '/product-list',
    },
    {
        id: 10,
        name: 'Osman Goat Farm',
        photo: '/farm.jpg',
        buttonLabel: 'Visit Store',
        href: '/product-list',
    },
]

export default function SellerList() {
    return (
        <div className="bg-gray-100">

            <NavigationBar />
            <div className="min-h-screen p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {SELLER_LIST.map((farm) => (
                        <Card key={farm.id} {...farm} />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}
