// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { activityRouter } from "./activity";
import { authRouter } from "./auth";
import { holidayRouter } from "./holiday";
import { userRouter } from "./user";

export const appRouter = router({
  activity: activityRouter,
  holiday: holidayRouter,
  auth: authRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
