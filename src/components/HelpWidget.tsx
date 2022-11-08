import React, { useState } from "react";
import Image from "next/image";
import Message from "./message";

type messagesProp = {
    key: string;
    message: string;
    sender?: string;
}
export default function HelpWidget() {
    const [isChatPanelDisplayed, setIsChatPanelDisplayed] = useState<boolean>(false);
    const [messages, setMessages] = useState<messagesProp[]>([
        { key: "0", message: "hello, how can we help?", sender: "admin" },
        { key: "1", message: "I need help with fixing my pc" },
        { key: "2", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in repreh" },
    ]);

    return (isChatPanelDisplayed ?
        <div
            className="fixed flex flex-col justify-between bottom-10 right-10 h-96 w-72 p-4 bg-gray-50 border border-slate-400 rounded-md"
        >
            <ul className="relative p-2 mt-10 border-2 rounded-md h-full mb-2 overflow-x-auto scrollCustom">
                {messages.map(({ key, message, sender }) => (
                    (<Message message={message} key={key} sender={sender ?? ''} />)
                ))}
            </ul>
            <button
                className="font-bold font-sans absolute top-4 right-4"
                onClick={() => setIsChatPanelDisplayed(false)
                }>
                <Image
                    src="/close-icon.svg"
                    alt="close"
                    width={25}
                    height={25}
                    className="rounded-full hover:bg-white hover:invert transition-all delay-75"
                />
            </button>
            <form
                onSubmit={(e) => { e.preventDefault(); }}
                className="flex border-2 p-1 m-0 rounded-md w-full flex-1">
                <input type="text" className="w-full " />
                <button type="submit" className="bg-blue-400 text-white p-1 px-4 rounded-sm hover:bg-blue-500">Send</button>
            </form>
        </div> :
        <div
            className="fixed bottom-10 right-10 bg-blue-400 text-white p-2 px-3 rounded-sm hover:bg-blue-500"
            onClick={() => setIsChatPanelDisplayed(true)}
        >
            Speak to our support team
        </div>);
}
