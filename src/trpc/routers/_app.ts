import { z } from 'zod';
import { createTRPCRouter } from '../init';
import { agentRouter, userRouter } from '@/modules/agents/server/procedures';

export const appRouter = createTRPCRouter({
  agents: agentRouter,
  users: userRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;