import { z } from "zod";
import { publicProcedure, router } from "../trpc";

const Document = z.object({
  id: z.number(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  state: z.enum(["DRAFT", "PUBLISHED"]).optional().default("DRAFT"),
  htmlContent: z.string(),
  folderId: z.number().optional(),
  bookId: z.number().optional(),
  markedForDeletion: z.date().optional(),
  createdDate: z.date(),
  modifiedDate: z.date(),
});

export type DocumentType = z.infer<typeof Document>;

export const documentRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.document.findMany();
  }),

  create: publicProcedure
    .input(Document.omit({ state: true, id: true }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.document.create({
        data: {
          ...input,
        },
      });
    }),

  updateTitle: publicProcedure
    .input(Document.pick({ title: true, id: true, modifiedDate: true }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.document.update({
        data: {
          title: input.title,
          modifiedDate: new Date(),
        },
        where: {
          id: input.id,
        },
      });
    }),

  updateSubtitle: publicProcedure
    .input(Document.pick({ subtitle: true, id: true, modifiedDate: true }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.document.update({
        data: {
          title: input.subtitle,
          modifiedDate: new Date(),
        },
        where: {
          id: input.id,
        },
      });
    }),

  updateHtmlContent: publicProcedure
    .input(Document.pick({ htmlContent: true, id: true, modifiedDate: true }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.document.update({
        data: {
          title: input.htmlContent,
          modifiedDate: new Date(),
        },
        where: {
          id: input.id,
        },
      });
    }),

  moveFolder: publicProcedure
    .input(Document.pick({ id: true, folderId: true, modifiedDate: true }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.document.update({
        data: {
          folderId: input.folderId,
          modifiedDate: new Date(),
        },
        where: {
          id: input.id,
        },
      });
    }),

  publishDocument: publicProcedure
    .input(Document.pick({ id: true, state: true, modifiedDate: true }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.document.update({
        data: {
          state: input.state,
          modifiedDate: new Date(),
        },
        where: {
          id: input.id,
        },
      });
    }),
});
