import z from "zod";
import { publicProcedure, router } from "../trpc";
import { DecohrAPI } from "../db/db";

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
      return response;
    }),
  getUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input: { userId } }) => {
      const user = await api.getUser(userId);
      return user;
    }),
});
