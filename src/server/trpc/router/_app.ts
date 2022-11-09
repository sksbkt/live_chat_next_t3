import { router } from "../trpc";
import { exampleRouter } from "./example";
import { HelpRequestRouter } from "./helpRequest";

export const appRouter = router({
  example: exampleRouter,
  helpRequest: HelpRequestRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
