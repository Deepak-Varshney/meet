'use client'

import { ResponsiveDialog } from "@/components/responsive-dialoge";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"

export const AgentsView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getmany.queryOptions())
    return (
        <div>
            {/* <ResponsiveDialog title="Responsive test" description="RESPON DESC" open onOpenChange={() => { }} >
                <Button>Some Acion</Button>
            </ResponsiveDialog > */}
            {JSON.stringify(data, null, 2)}
        </div>
    )
}