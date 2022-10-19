import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

const Document = z.object({
  id: z.number().optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  state: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  htmlContent: z.string(),
  folderId: z.number().optional(),
  bookId: z.number().optional(),
  markedForDeletion: z.date().optional(),
  createdDate: z.date().optional(),
  modifiedDate: z.date().optional(),
});

export type DocumentType = z.infer<typeof Document>;

export const documentRouter = router({
  getDocument: publicProcedure
    .input(Document.pick({ id: true }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.document.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  create: protectedProcedure
    .input(Document.omit({ state: true, id: true }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.document.create({
        data: {
          ...input,
        },
      });
    }),

  updateTitle: protectedProcedure
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

  updateSubtitle: protectedProcedure
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

  updateHtmlContent: protectedProcedure
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

  moveFolder: protectedProcedure
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

  publishDocument: protectedProcedure
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
