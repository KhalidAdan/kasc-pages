import theMalteseFalcon from "@/mock/fixtures/bootstrapApplication.json";
import { protectedProcedure, router } from "../trpc";

export const onboardingRouter = router({
  onboard: protectedProcedure.mutation(async ({ ctx }) => {
    // query for user and check
    const isUserOnboarded = await ctx.prisma.user.findUniqueOrThrow({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        onboarded: true,
      },
    });
    // if not onboarded SEED
    if (!isUserOnboarded.onboarded) {
      console.log("User has not been onboarded, seeding");
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
    } else {
      console.log("User has been onboarded, fucking off");
    }
  }),
});
