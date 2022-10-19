// src/server/trpc/router/index.ts
import { router } from "../trpc";
import { applicationRouter } from "./applicationRouter";
import { authRouter } from "./auth";
import { bookRouter } from "./bookRouter";
import { documentRouter } from "./documentRouter";
import { folderRouter } from "./folderRouter";

export const appRouter = router({
  document: documentRouter,
  folder: folderRouter,
  book: bookRouter,
  application: applicationRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
