import React, { useRef, useState } from "react";
import Image from "next/image";
import Message from "./message";
import type { message } from "../models/user";
import { trpc } from "../utils/trpc";
import { RtmChannel } from "agora-rtm-sdk";

type messagesProp = {
    key: string;
    message: string;
    sender?: string;
}
export default function HelpWidget() {
    const createHelpRequestMutation = trpc.helpRequest.createHelpRequest.useMutation();

    const [isChatPanelDisplayed, setIsChatPanelDisplayed] = useState<boolean>(false);
    const channelRef = useRef<RtmChannel | null>(null);
    const [text, setText] = useState<string>('');


    const [messages, setMessages] = useState<message[]>(
        [
            { id: 1, message: "hello, how can I help you", sender: "admin" },
        ]
    );

    async function handleOpenSupportWidget() {
        if (channelRef.current) {
            channelRef.current.leave();
            channelRef.current = null;
        }
        setIsChatPanelDisplayed(true);
        const helpRequest = await createHelpRequestMutation.mutateAsync();
        const { default: AgoraRTM } = await import("agora-rtm-sdk");
        const client = AgoraRTM.createInstance(process.env.NEXT_PUBLIC_AGORA_ID!);

        await client.login({
            uid: `${Math.floor(Math.random() * 250)}`,
            token: undefined,
        });
        const channel = await client.createChannel(helpRequest.id);
        channelRef.current = channel;
        await channel.join();
        channel.on("ChannelMessage", (message) => {
            if (!message.text) return;
            const messageObj = message.text;
            setMessages((preMessage) => [...preMessage, { id: 0, message: messageObj, sender: "admin" }]);

        });
    }


    async function handleSendMessage(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (text != '') {
            const channel = channelRef.current;
            channel?.sendMessage({ text });
            setMessages((prevMessages) => [...prevMessages, {
                id: Math.floor(Math.random() * 1000),
                message: text
            }]);
            setText('');
        }
    }
    console.log(messages);


    return (isChatPanelDisplayed ?
        <div
            className="fixed flex flex-col justify-between bottom-10 right-10 h-96 w-72 p-4 bg-gray-50 border border-slate-400 rounded-md"
        >
            <ul className="relative p-2 mt-10 border-2 rounded-md h-full mb-2 overflow-x-auto scrollCustom">
                {messages.map(({ id, message, sender }) => (
                    (<Message message={message} key={id} sender={sender ?? ''} />)
                ))}
            </ul>
            <button
                className="font-bold font-sans absolute top-4 right-4"
                onClick={() => setIsChatPanelDisplayed(false)}>
                <Image
                    src="/close-icon.svg"
                    alt="close"
                    width={25}
                    height={25}
                    className="rounded-full hover:bg-white hover:invert transition-all delay-75"
                />
            </button>
            <form
                onSubmit={handleSendMessage}
                className="flex border-2 p-1 m-0 rounded-md w-full flex-1">
                <input
                    type="text"
                    className="w-full "
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                />
                <button type="submit" className="bg-blue-400 text-white p-1 px-4 rounded-sm hover:bg-blue-500">Send</button>
            </form>
        </div> :
        <div
            className="fixed bottom-10 right-10 bg-blue-400 text-white p-2 px-3 rounded-sm hover:bg-blue-500"
            onClick={handleOpenSupportWidget}
        >
            Speak to our support team
        </div>);
}
