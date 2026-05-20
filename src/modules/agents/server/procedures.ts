import { db } from "@/db";
import { agents, user } from "@/db/schema";
import { createTRPCRouter, baseProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";

export const agentRouter = createTRPCRouter({
    getmany: baseProcedure.query(async () => {
        const data = await db.select().from(agents)
        // throw new TRPCError({ code: "CLIENT_CLOSED_REQUEST" })
        return data;
    })
})

