import z from "zod";
import { publicProcedure, router } from "./trpc";
import { DecohrAPI } from "./db/db";
import { createHTTPServer } from "@trpc/server/adapters/standalone";

const api = new DecohrAPI();

export const appRouter = router({
  getImages: publicProcedure.input(z.string()).query(async ({ input }) => {
    const images = await api.getImageProfiles(input);
    return images;
  }),
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({ router: appRouter });
server.listen(3000);
