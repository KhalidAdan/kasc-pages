// src/server/trpc/router/index.ts
import { router } from "../trpc";
import { applicationRouter } from "./applicationRouter";
import { authRouter } from "./auth";
import { bookRouter } from "./bookRouter";
import { documentRouter } from "./documentRouter";
import { folderRouter } from "./folderRouter";
import { onboardingRouter } from "./onboardingRouter";

export const appRouter = router({
  document: documentRouter,
  folder: folderRouter,
  book: bookRouter,
  auth: authRouter,
  app: applicationRouter,
  onboarding: onboardingRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
