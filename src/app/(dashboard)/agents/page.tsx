import { LoadingState } from '@/components/loading-state';
import { AgentsView } from '@/modules/agents/ui/views/agents-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React, { Suspense } from 'react'

const Agents = async () => {
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getmany.queryOptions())
    return (
        <HydrationBoundary state={dehydrate(queryClient)} >
            <Suspense fallback={<LoadingState title='Loding Agents' description='This may take a few moments' />}>
                <AgentsView />

            </Suspense>
        </HydrationBoundary>
    )
}

export default Agents