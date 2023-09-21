import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "@/server/api/trpc";

export const favoritesRouter = createTRPCRouter({});
