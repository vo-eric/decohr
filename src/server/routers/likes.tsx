import z from "zod";
import { publicProcedure, router } from "../trpc";
import { DecohrAPI } from "../db/db";
import { analyzeUserTasteProfile } from "~/engine";

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
      const totalLikes = await api.getUserLikesCount(userId);

      if (totalLikes % 5 === 0) {
        const user = await api.getUser(userId);

        if (!user) {
          return;
        }

        const tasteProfile = await analyzeUserTasteProfile(
          user.likes as Record<string, number>,
        );

        if (tasteProfile) {
          await api.updateUserTasteProfile(userId, tasteProfile);
        }
      }
      return response;
    }),
});
