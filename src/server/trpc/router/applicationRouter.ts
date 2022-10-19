import { z } from "zod";
import { publicProcedure, router } from "../trpc";

const Application = z.object({
  id: z.number(),
  userId: z.string(),
  books: z.array(z.number()),
  createdDate: z.date(),
});

export type ApplicationType = z.infer<typeof Application>;

export const applicationRouter = router({
  createApplication: publicProcedure
    .input(Application)
    .mutation(async ({ ctx, input }) => {
      const app = await ctx.prisma.application.create({
        data: {
          id: input.id,
          userId: input.userId,
          createdDate: new Date(),
        },
      });
      // TODO: SEED SHIT
    }),
});
