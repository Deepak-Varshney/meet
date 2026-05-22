import { db } from "@/db";
import { agents, user } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { agentInsertSchema } from "../schemas";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const agentRouter = createTRPCRouter({
    getone: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
        const [existingAgent] = await db.select().from(agents).where(eq(agents.id, input.id))
        return existingAgent;
    }),
    getmany: protectedProcedure.query(async () => {
        const data = await db.select().from(agents)
        return data;
    }),
    create: protectedProcedure.input(agentInsertSchema).mutation(async ({ input, ctx }) => {
        const [createdAgent] = await db.insert(agents).values({
            ...input,
            userId: ctx.auth.user.id
        }).returning();

        return createdAgent
    }),
});

