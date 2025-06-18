import { router } from "./trpc";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { imageRouter } from "./routers/images";
import { likeRouter } from "./routers/likes";
import { userRouter } from "./routers/users";

export const appRouter = router({
  images: imageRouter,
  likes: likeRouter,
  users: userRouter,
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({ router: appRouter });
server.listen(3000);
