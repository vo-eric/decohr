import z from "zod";
import { publicProcedure, router } from "../trpc";
import { DecohrAPI } from "../db/db";
import { analyzeUserTasteProfile } from "~/engine";

const api = new DecohrAPI();

export const userRouter = router({
  updateUserLikes: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        imageId: z.string(),
        isLiked: z.boolean(),
      }),
    )
    .mutation(async ({ input: { userId, imageId, isLiked } }) => {
      const response = await api.updateUserLikes(userId, imageId, isLiked);
      return response?.likes;
    }),
  getUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input: { userId } }) => {
      const user = await api.getUser(userId);
      return user;
    }),
  analyzeTasteProfile: publicProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ input }) => {
      const user = await api.getUser(input.userId);
      if (!user?.likes) return null;

      const tasteProfile = await analyzeUserTasteProfile(
        user.likes as Record<string, number>,
      );
      if (tasteProfile) {
        await api.updateUserTasteProfile(input.userId, tasteProfile);
      }
      return tasteProfile;
    }),
});
