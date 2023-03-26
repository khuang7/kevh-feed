import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// Public procedure means that the user does not need to be authenticated to use this procedure.

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany();
  }),
});
