import { LoadingState } from '@/components/loading-state';
import { auth } from '@/lib/auth';
import { loadSearchParams } from '@/modules/agents/params';
import { AgentsListHeader } from '@/modules/agents/ui/components/agents-list-header';
import { AgentsView } from '@/modules/agents/ui/views/agents-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import type { SearchParams } from 'nuqs';
import React, { Suspense } from 'react'

interface Props {
    searchParams: Promise<SearchParams>
}

const Agents = async ({ searchParams }: Props) => {
    const queryClient = getQueryClient();
    const filters = await loadSearchParams(searchParams)
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        redirect("/sign-in")
    }
    void queryClient.prefetchQuery(trpc.agents.getmany.queryOptions({ ...filters }))

    return (
        <>
            <AgentsListHeader />
            <HydrationBoundary state={dehydrate(queryClient)} >
                <Suspense fallback={<LoadingState title='Loding Agents' description='This may take a few moments' />}>
                    <AgentsView />
                </Suspense>
            </HydrationBoundary>
        </>
    )
}

export default Agents