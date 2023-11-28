import { createTRPCRouter } from "~/server/api/trpc";
import { categoriesRouter } from "./routers/categories";
import { filesRouter } from "./routers/files";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  categories: categoriesRouter,
  files: filesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
