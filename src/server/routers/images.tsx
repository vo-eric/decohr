import z from "zod";
import { publicProcedure, router } from "../trpc";
import { DecohrAPI } from "../db/db";

const api = new DecohrAPI();

export const imageRouter = router({
  getImages: publicProcedure.input(z.string()).query(async ({ input }) => {
    const images = await api.getImageProfiles(input);
    return images;
  }),
});
