import React from "react";
import HelpWidget from "../components/HelpWidget";
import { trpc } from "../utils/trpc";

export default function admin() {
    const helpRequests = trpc.helpRequest.getHelpRequest.useQuery();
    function handelRequestHelpClicked(id: string) {
        console.log(id);

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
                            className="bg-blue-500 text-white p-2 px-3 rounded-sm hover:bg-blue-900 mt-3 w-64"
                            onClick={() => handelRequestHelpClicked(request.id)}
                            key={request.id}>

                            {request.id}

                        </button>))}

                </section>
            </div>

        </main>
    </>);
}
