import { db } from "@/db";
import { agents, user } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { agentInsertSchema } from "../schemas";
import { z } from "zod";
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constants";

export const agentRouter = createTRPCRouter({
    getone: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => {
        //TODO CHANGE TO ACTUAL 
        const [existingAgent] = await db.select({ ...getTableColumns(agents), meetingCount: sql<number>`5`, }).from(agents).where(and(eq(agents.id, input.id), eq(agents.userId, ctx.auth.user.id)))
        if (!existingAgent) {
            throw new TRPCError({ code: "NOT_FOUND", message: "Agent Not Found" })
        }
        return existingAgent;
    }),
    getmany: protectedProcedure.input(z.object({
        page: z.number().default(DEFAULT_PAGE),
        pageSize: z.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
        search: z.string().nullish()
    })).query(async ({ input, ctx }) => {
        const { search, page, pageSize } = input;
        const data = await db.select({ ...getTableColumns(agents), meetingCount: sql<number>`5` }).from(agents).where(
            and(
                eq(agents.userId, ctx.auth.user.id),
                search ? ilike(agents.name, `%${search}%`) : undefined,
            )
        )
            .orderBy(desc(agents.createdAt), desc(agents.id))
            .limit(pageSize)
            .offset((page - 1) * pageSize)
        const [total] = await db.select({ count: count() })
            .from(agents)
            .where(
                and(
                    eq(agents.userId, ctx.auth.user.id),
                    search ? ilike(agents.name, `%${search}%`) : undefined,
                )
            )

        const totalPages = Math.ceil(total.count / pageSize)
        return {
            items: data,
            total: total.count,
            totalPages
        };
    }),
    create: protectedProcedure.input(agentInsertSchema).mutation(async ({ input, ctx }) => {
        const [createdAgent] = await db.insert(agents).values({
            ...input,
            userId: ctx.auth.user.id
        }).returning();

        return createdAgent
    }),
    update: protectedProcedure
        .input(
            // validation schema me ID inject kar rahe hain update ke liye
            agentInsertSchema.extend({
                id: z.string()
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { id, ...updateData } = input;

            // Check karein ki kya ye agent sach me is logged-in user ka hai
            const [existingAgent] = await db
                .select()
                .from(agents)
                .where(and(eq(agents.id, id), eq(agents.userId, ctx.auth.user.id)));

            if (!existingAgent) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Agent not found or you don't have permission to edit it."
                });
            }

            // Perform Update
            const [updatedAgent] = await db
                .update(agents)
                .set(updateData)
                .where(and(eq(agents.id, id), eq(agents.userId, ctx.auth.user.id)))
                .returning();

            return updatedAgent;
        }),
    remove: protectedProcedure.input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const [removedAgent] = await db.delete(agents).where(
                and(
                    eq(agents.id, input.id),
                    eq(agents.userId, ctx.auth.user.id)
                )
            ).returning()
            if (!removedAgent) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Agent not found" })
            }
            return removedAgent;
        })
});

