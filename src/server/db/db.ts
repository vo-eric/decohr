import { drizzle } from "drizzle-orm/postgres-js";
import { imageProfiles, likes } from "./schema";
import type { ImageResult, ImageStyle } from "~/data/seed";
import { eq, inArray, not } from "drizzle-orm";

export class DecohrAPI {
  private db = drizzle(process.env.DATABASE_URL!);

  async getImageProfiles(userId: string): Promise<ImageResult[]> {
    const unseenImages = await this.db
      .select({
        id: imageProfiles.id,
        imageUrl: imageProfiles.imageUrl,
        styles: imageProfiles.styles,
        reasoning: imageProfiles.reasoning,
      })
      .from(imageProfiles)
      .where(
        not(
          inArray(
            imageProfiles.id,
            this.db
              .select({ imageId: likes.imageId })
              .from(likes)
              .where(eq(likes.userId, userId)),
          ),
        ),
      );

    //NOTE: i hate this. fix it.
    const images = unseenImages.map((image) => ({
      ...image,
      styles: image.styles as ImageStyle[],
    }));

    return images;
  }

  async recordLike(userId: string, imageId: string, isLiked: boolean) {
    const [like] = await this.db
      .insert(likes)
      .values({
        id: crypto.randomUUID(),
        userId,
        imageId,
        isLiked,
        createdAt: new Date(),
      })
      .returning();

    return like;
  }

  async addImageProfile(results: ImageResult[]) {
    for (const result of results) {
      await this.db.insert(imageProfiles).values({
        id: result.id,
        imageUrl: result.imageUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
        styles: JSON.stringify(result.styles),
        reasoning: JSON.stringify(result.reasoning),
      });
    }
  }
}
