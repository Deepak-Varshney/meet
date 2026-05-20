'use client'

import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"

export const AgentsView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getmany.queryOptions())
    return (
        <div>{JSON.stringify(data, null, 2)}</div>
    )
}