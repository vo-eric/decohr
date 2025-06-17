import z from "zod";
import { publicProcedure, router } from "../trpc";
import { DecohrAPI } from "../db/db";

const api = new DecohrAPI();

export const likeRouter = router({
  recordImageResponse: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        imageId: z.string(),
        isLiked: z.boolean(),
      }),
    )
    .mutation(async ({ input: { userId, imageId, isLiked } }) => {
      const response = await api.recordLike(userId, imageId, isLiked);
      return response;
    }),
});
