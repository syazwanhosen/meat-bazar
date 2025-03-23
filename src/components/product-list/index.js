import Card from "../card";
import Footer from "../footer";
import NavigationBar from "../navigation-bar";

const SELLER_LIST = [
    {
        id: 1,
        name: "Australian Cross Breed Cow",
        photo: "/australian-cow.jpg",
        buttonLabel: "Add to Cart",
        href: "/checkout",
        itemList: [
            { id: 1, name: "Height: 150 cm" },
            { id: 2, name: "Length: 220 cm" },
            { id: 3, name: "Weight: 332 kg" },
            { id: 4, name: "Price per kg: RM 30" },
            { id: 5, name: "Total: RM 9960" }
        ]
    },
    {
        id: 2,
        name: "Brahman Cross Cow",
        photo: "/brahman-cow.jpg",
        buttonLabel: "Add to Cart",
        href: "/checkout",
        itemList: [
            { id: 1, name: "Height: 160 cm" },
            { id: 2, name: "Length: 240 cm" },
            { id: 3, name: "Weight: 407 kg" },
            { id: 4, name: "Price per kg: RM 32" },
            { id: 5, name: "Total: RM 13024" }
        ]
    },
    {
        id: 3,
        name: "Kedah-Kelantan Cow",
        photo: "/kedah-kelantan-cow.jpg",
        buttonLabel: "Add to Cart",
        href: "/checkout",
        itemList: [
            { id: 1, name: "Height: 135 cm" },
            { id: 2, name: "Length: 215 cm" },
            { id: 3, name: "Weight: 192 kg" },
            { id: 4, name: "Price per kg: RM 28" },
            { id: 5, name: "Total: RM 5340" }
        ]
    },
    {
        id: 4,
        name: "Brangus Cow",
        photo: "/brangus-cow.jpg",
        buttonLabel: "Add to Cart",
        href: "/checkout",
        itemList: [
            { id: 1, name: "Height: 155 cm" },
            { id: 2, name: "Length: 230 cm" },
            { id: 3, name: "Weight: 397 kg" },
            { id: 4, name: "Price per kg: RM 33" },
            { id: 5, name: "Total: RM 13110" }
        ]
    },
    {
        id: 5,
        name: "Limousin Cow",
        photo: "/limousin-cow.jpg",
        buttonLabel: "Add to Cart",
        href: "/checkout",
        itemList: [
            { id: 1, name: "Height: 165 cm" },
            { id: 2, name: "Length: 250 cm" },
            { id: 3, name: "Weight: 155 kg" },
            { id: 4, name: "Price per kg: RM 35" },
            { id: 5, name: "Total: RM 5425" }
        ]
    },
    {
        id: 6,
        name: "Boer Goat",
        photo: "/boer-goat.jpg",
        buttonLabel: "Add to Cart",
        href: "/checkout",
        itemList: [
            { id: 1, name: "Height: 95 cm" },
            { id: 2, name: "Length: 120 cm" },
            { id: 3, name: "Weight: 100 kg" },
            { id: 4, name: "Price per kg: RM 25" },
            { id: 5, name: "Total: RM 2500" }
        ]
    },
    {
        id: 7,
        name: "Kalahari Red Goat",
        photo: "/kalahari-goat.jpg",
        buttonLabel: "Add to Cart",
        href: "/checkout",
        itemList: [
            { id: 1, name: "Height: 85 cm" },
            { id: 2, name: "Length: 140 cm" },
            { id: 3, name: "Weight: 140 kg" },
            { id: 4, name: "Price per kg: RM 23" },
            { id: 5, name: "Total: RM 3220" }
        ]
    },
    {
        id: 8,
        name: "Saanen Goat",
        photo: "/saanen-goat.jpg",
        buttonLabel: "Add to Cart",
        href: "/checkout",
        itemList: [
            { id: 1, name: "Height: 95 cm" },
            { id: 2, name: "Length: 125 cm" },
            { id: 3, name: "Weight: 110 kg" },
            { id: 4, name: "Price per kg: RM 27" },
            { id: 5, name: "Total: RM 2970" }
        ]
    },
    {
        id: 9,
        name: "Gokwe Goat",
        photo: "/gokwe-goat.jpg",
        buttonLabel: "Add to Cart",
        href: "/checkout",
        itemList: [
            { id: 1, name: "Height: 80 cm" },
            { id: 2, name: "Length: 110 cm" },
            { id: 3, name: "Weight: 82 kg" },
            { id: 4, name: "Price per kg: RM 22" },
            { id: 5, name: "Total: RM 1800" }
        ]
    },
    {
        id: 10,
        name: "Kiko Goat",
        photo: "/kiko-goat.jpg",
        buttonLabel: "Add to Cart",
        href: "/checkout",
        itemList: [
            { id: 1, name: "Height: 100 cm" },
            { id: 2, name: "Length: 170 cm" },
            { id: 3, name: "Weight: 120 kg" },
            { id: 4, name: "Price per kg: RM 28" },
            { id: 5, name: "Total: RM 3360" }
        ]
    }
];

export default function ProductList() {
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
