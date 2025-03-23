import Image from "next/image";
import Link from "next/link";

export default function Card({ name, photo, buttonLabel, itemList, href }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-lg text-black">
            <Image src={photo} width={200} height={150} className="rounded-t-lg" alt={name} />
            <h4 className="text-lg font-bold mt-2">{name}</h4>
            {
                itemList && itemList.map(({ id, name }) => <ul key={id}>
                    <li>{name}</li>
                </ul>)
            }
            <button className="bg-orange-500 text-white px-4 py-2 mt-2 rounded"><Link href={href}>{buttonLabel}</Link></button>
        </div>
    )
}   