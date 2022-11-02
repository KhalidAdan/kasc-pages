import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const applicationRouter = router({
  updateSelectedFont: protectedProcedure
    .input(
      z.object({
        font: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.userPreferences.update({
        data: {
          selectedFont: input.font,
        },
        where: {
          id: ctx.session.user.id,
        },
      });
    }),
  deleteApp: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.prisma.$executeRaw`DROP TABLE IF EXISTS Book;`;
    await ctx.prisma.$executeRaw`DROP TABLE IF EXISTS Document`;
    await ctx.prisma.$executeRaw`DROP TABLE IF EXISTS Folder`;
    await ctx.prisma.$executeRaw`DROP TABLE IF EXISTS Account`;
    await ctx.prisma.$executeRaw`DROP TABLE IF EXISTS Session`;
    await ctx.prisma.$executeRaw`DROP TABLE IF EXISTS User`;
    await ctx.prisma.$executeRaw`DROP TABLE IF EXISTS VerificationToken;`;
  }),
  deleteData: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.prisma.$executeRaw`DELETE FROM Book;`;
    await ctx.prisma.$executeRaw`DELETE FROM Document`;
    await ctx.prisma.$executeRaw`DELETE FROM Folder`;
    await ctx.prisma.$executeRaw`DELETE FROM Account`;
    await ctx.prisma.$executeRaw`DELETE FROM Session`;
    await ctx.prisma.$executeRaw`DELETE FROM User`;
    await ctx.prisma.$executeRaw`DELETE FROM VerificationToken;`;
  }),
});
