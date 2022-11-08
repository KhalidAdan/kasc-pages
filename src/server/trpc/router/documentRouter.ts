import { Document } from "@prisma/client";
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

const Document = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  state: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  htmlContent: z.string(),
  folderId: z.string().optional(),
  bookId: z.string().optional(),
  markedForDeletion: z.date().optional(),
  createdDate: z.date().optional(),
  modifiedDate: z.date().optional(),
});

const OrderedDocuments = z.object({
  documents: z.array(
    z.object({
      id: z.string(),
      displayOrder: z.number(),
    })
  ),
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

  createDocument: protectedProcedure
    .input(Document.pick({ folderId: true }))
    .mutation(async ({ ctx, input }) => {
      const documents = await ctx.prisma.document.findMany({
        select: {
          id: true,
          displayOrder: true,
          Folder: {
            include: {
              Books: {
                select: {
                  userId: true,
                },
              },
            },
          },
        },
      });

      const largestDisplayOrder = Math.max(
        ...documents.map((d) => d.displayOrder)
      );

      return await ctx.prisma.document.create({
        data: {
          folderId: input.folderId,
          displayOrder: largestDisplayOrder + 1,
        },
        select: {
          id: true,
        },
      });
    }),

  deleteDocument: protectedProcedure
    .input(Document.pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.document.delete({
        where: {
          id: input.id,
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
    .input(Document.pick({ subtitle: true, id: true }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.document.update({
        data: {
          subtitle: input.subtitle,
          modifiedDate: new Date(),
        },
        where: {
          id: input.id,
        },
      });
    }),

  updateHtmlContent: protectedProcedure
    .input(Document.pick({ htmlContent: true, id: true }))
    .mutation(async ({ ctx, input }) => {
      console.log(`updating html:  \n content: ${input.htmlContent}`);
      return await ctx.prisma.document.update({
        data: {
          htmlContent: input.htmlContent,
          modifiedDate: new Date(),
        },
        where: {
          id: input.id,
        },
      });
    }),

  updateDocumentOrder: protectedProcedure
    .input(OrderedDocuments)
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.$executeRawUnsafe<Document[]>(
          `INSERT INTO Document (id, displayOrder) VALUES ${input.documents.map(
            (d) => `("${d.id}", ${d.displayOrder})`
          )} ON DUPLICATE KEY UPDATE id=VALUES(id), displayOrder=VALUES(displayOrder);`
        );
      } catch (error) {
        console.log(error);
      }
    }),

  moveFolder: protectedProcedure
    .input(Document.pick({ id: true, folderId: true }))
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
