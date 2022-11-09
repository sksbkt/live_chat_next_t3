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
            <section className="flex flex-col">

                {helpRequests.data?.map((request) => (
                    <button
                        onClick={() => handelRequestHelpClicked(request.id)}
                        key={request.id}>
                        <span>
                            {request.id}
                        </span>
                    </button>))}

            </section>

        </main>
    </>);
}
