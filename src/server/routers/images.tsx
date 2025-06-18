import z from "zod";
import { publicProcedure, router } from "../trpc";
import { DecohrAPI } from "../db/db";
import { generateImage } from "~/engine";

const api = new DecohrAPI();

export const imageRouter = router({
  getImages: publicProcedure.input(z.string()).query(async ({ input }) => {
    const images = await api.getImageProfiles(input);
    return images;
  }),
  analyzeImages: publicProcedure
    .input(z.array(z.string()))
    .mutation(async ({ input }) => {
      const images = await api.analyzeImages(input);
      return images;
    }),
  generateImage: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        tasteProfile: z.record(z.string(), z.number()),
      }),
    )
    .mutation(async ({ input }) => {
      const image = await generateImage(input.tasteProfile, input.userId);
      return image;
    }),
});
