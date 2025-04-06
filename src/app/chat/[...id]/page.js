
"use client"
import { useParams } from "next/navigation";

import Chat from "@/components/chat";

const ChatPage = () => {
    const params = useParams();
    const [userId, receiverId] = params.id || [];

    return (
        <div className="container mx-auto mt-6">
            <h1 className="text-3xl font-bold text-center">Live Chat</h1>
            <Chat userId={userId} receiverId={receiverId} />
        </div>
    );
};

export default ChatPage;
