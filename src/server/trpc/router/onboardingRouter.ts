import theMalteseFalcon from "@/mock/fixtures/bootstrapApplication.json";
import { protectedProcedure, router } from "../trpc";

export const onboardingRouter = router({
  onboard: protectedProcedure.mutation(async ({ ctx }) => {
    // query for user and check
    await ctx.prisma.user
      .findUnique({
        where: {
          id: ctx.session.user.id,
        },
        select: {
          onboarded: true,
        },
      })
      .then(async (data) => {
        if (data) {
          console.log("User has  been onboarded, skipping");
          return;
        } else {
          console.log("User has not been onboarded, seeding book");
          const book = await ctx.prisma.book.create({
            data: {
              title: "The Maltese Falcon",
              createdDate: new Date(),
              User: {
                connect: {
                  id: ctx.session.user.id,
                },
              },
              folders: {
                create: theMalteseFalcon,
              },
            },
          });
          if (book.id) {
            await ctx.prisma.user.update({
              where: {
                id: ctx.session.user.id,
              },
              data: {
                onboarded: true,
              },
            });
          }
        }
      })
      .catch((err) => {
        console.log("An error occurred while onboarding", err);
      });
  }),
});
