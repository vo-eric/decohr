import z from "zod";
import { publicProcedure, router } from "../trpc";
import { DecohrAPI } from "../db/db";

const api = new DecohrAPI();

export const imageRouter = router({
  getImages: publicProcedure.input(z.string()).query(async ({ input }) => {
    const images = await api.getImageProfiles(input);
    return images;
  }),
  analyzeImages: publicProcedure
    .input(z.array(z.string()))
    .mutation(async ({ input }) => {
      console.log("--------------------------------");
      console.log("input", input);
      console.log("--------------------------------");
      const images = await api.analyzeImages(input);
      return images;
    }),
});
