import { createTRPCRouter } from "@/server/api/trpc";
import { favoritesRouter } from "./routers/favorites";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  favorites: favoritesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
