"use client";

import Image from "next/image";
import Link from "next/link";
import { getToken } from "@/utils";
export default function Card({ name, photo, buttonLabel, itemList, href, chatLink }) {
    const isLogged = getToken()
    return (
        <div className="bg-white p-4 rounded-lg shadow-lg text-black">
            <img src={photo} className="rounded-t-lg" alt={name} />
            <h4 className="text-lg font-bold mt-2">{name}</h4>
            {
                itemList && itemList.map(({ id, name }) => <ul key={id}>
                    <li>{name}</li>
                </ul>)
            }
            {buttonLabel && <button className="bg-orange-500 text-white px-4 py-2 mt-2 rounded mr-2"><Link href={href}>{buttonLabel}</Link></button>}
            {isLogged && chatLink && <button className="bg-orange-500 text-white px-4 py-2 mt-2 rounded"><Link href={chatLink}>Chat Seller</Link></button>}
        </div>
    )
}   