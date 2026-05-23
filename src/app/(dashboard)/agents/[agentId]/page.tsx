interface Props {
    params: Promise<{ agentId: string }>
}

import { LoadingState } from '@/components/loading-state';
import { AgentIdView } from '@/modules/agents/ui/views/agent-id-view';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React, { Suspense } from 'react'

const page = async ({ params }: Props) => {
    const { agentId } = await params;
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(
        trpc.agents.getone.queryOptions({ id: agentId })
    )
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<LoadingState title='Loding Agent data' description='This may take a few moments' />}>
                <AgentIdView agentId={agentId} />
            </Suspense>
        </HydrationBoundary>
    )
}

export default page