import React, { useRef, useState } from "react";
import HelpWidget from "../components/HelpWidget";
import { trpc } from "../utils/trpc";
import { RtmChannel, RtmMessage } from "agora-rtm-sdk";
import { message } from "../models/user";
import Message from "../components/message";


export default function Admin() {

    const helpRequests = trpc.helpRequest.getHelpRequest.useQuery();

    const channelRef = useRef<RtmChannel | null>(null);

    const [isChatPanleDisplayed, setIsChatPanleDisplayed] = useState<boolean>(false);
    const [currentDisplayedId, setCurrentDisplayedId] = useState<string>('');
    const [messages, setMessages] = useState<message[]>([]);

    const [text, setText] = useState<string>('');


    async function handelRequestHelpClicked(id: string) {
        if (channelRef.current) {
            channelRef.current.leave();
            channelRef.current = null;
        }

        setCurrentDisplayedId(id);
        setIsChatPanleDisplayed(true);

        const { default: AgoraRTM } = await import("agora-rtm-sdk");
        const client = AgoraRTM.createInstance(process.env.NEXT_PUBLIC_AGORA_ID ?? '');

        await client.login({
            uid: `${Math.floor(Math.random() * 250)}`,
            token: undefined
        });

        const channel = client.createChannel(id);
        channelRef.current = channel;
        await channel.join();
        channel.on("ChannelMessage", (message: RtmMessage) => {
            if (!message.text) return;
            const messageObj = message.text;
            console.log("MESSAGE", messageObj);
            setMessages((prevMessages) => [...prevMessages, { id: 0, message: messageObj, send: "admin" }])
        });

    }

    async function handleSendMessage(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (text != '') {
            const channel = channelRef.current;
            channel?.sendMessage({ text });

        }
    }

    return (<>
        <main className="container mx-auto flex min-h-screen flex-col p-4">
            <h1 className="text-5xl">
                Admin page
            </h1>
            <div className="min-w-max w-full">
                <h3 className="">help requests</h3>
                <section className="flex flex-col items-center self-center ">
                    {helpRequests.data?.map((request) => (
                        <button
                            className="bg-blue-500 text-white p-2 px-3 rounded-sm hover:bg-blue-900 mt-3 w-64 relative"
                            onClick={() => handelRequestHelpClicked(request.id)}
                            key={request.id}>

                            {request.id}
                            {currentDisplayedId == request.id ?
                                <div className="absolute">
                                    <ul className="flex flex-col justify-start bottom-10 right-10 h-96 w-72 p-4 bg-gray-50 border border-slate-400 rounded-md justify-start z-20 relative">
                                        {messages.map(({ id, message, sender }) =>
                                            (<Message message={message} key={'x' + id} sender={sender} />)
                                        )}
                                    </ul>
                                </div> : <></>
                            }
                        </button>))}

                </section>
            </div>

        </main>
    </>);
}
