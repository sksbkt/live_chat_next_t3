import React from "react";

interface messageProp {
    message: string,
    sender?: string,
}
export default function Message({ message, sender }: messageProp) {
    function messageStyle(ownerId?: string): string {
        switch (ownerId) {
            case 'admin':
                return "bg-blue-500 rounded- p-2 mb-2 text-white text-justify tracking-tighter";
                break;

            default:
                return " bg-green-600 rounded- p-2 mb-2 text-white text-justify tracking-tighter float-right"

        }
    }
    return <li >
        <div className={`rounded-lg flex-none inline-block  ${messageStyle(sender)}`}>
            {message}
        </div>
    </li>;
}
