import { drizzle } from "drizzle-orm/postgres-js";
import { generatedImages, imageProfiles, likes, users } from "./schema";
import type { ImageResult, ImageStyle, User } from "~/data/seed";
import { and, count, eq, inArray, not } from "drizzle-orm";
import { analyzeInteriorDesignStyle } from "~/engine";

export type LikesMap = Record<string, number>;

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

  async getUserLikesCount(userId: string) {
    const [totalLikes] = await this.db
      .select({ count: count(likes.id) })
      .from(likes)
      .where(and(eq(likes.userId, userId), eq(likes.isLiked, true)));

    return totalLikes?.count ?? 0;
  }

  async updateUserLikes(userId: string, imageId: string, isLiked: boolean) {
    if (!isLiked) {
      return;
    }

    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.id, userId));

    if (!user) {
      throw new Error("User not found");
    }

    const [image] = await this.db
      .select()
      .from(imageProfiles)
      .where(eq(imageProfiles.id, imageId));

    if (!image) {
      throw new Error("Image not found");
    }

    const styles = image.styles as ImageStyle[];
    const updatedLikes = (user.likes ?? {}) as Record<string, number>;

    for (const style of styles) {
      updatedLikes[style.style] =
        (updatedLikes[style.style] ?? 0) + 1 * style.confidence;
    }

    await this.db
      .update(users)
      .set({
        likes: updatedLikes,
      })
      .where(eq(users.id, userId));
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

  async analyzeImages(imageUrls: string[]) {
    for (const imageUrl of imageUrls) {
      const result = await analyzeInteriorDesignStyle(imageUrl);
      await this.db.insert(imageProfiles).values({
        id: crypto.randomUUID(),
        imageUrl: imageUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
        styles: JSON.stringify(result?.styles),
        reasoning: JSON.stringify(result?.reasoning),
      });
    }
  }

  async getUser(userId: string) {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.id, userId));

    return user;
  }

  async updateUserTasteProfile(userId: string, tasteProfile: string) {
    await this.db
      .update(users)
      .set({
        tasteProfile,
      })
      .where(eq(users.id, userId));
  }

  async addGeneratedImage(imageUrl: string, userId: string) {
    const [image] = await this.db
      .insert(generatedImages)
      .values({
        id: crypto.randomUUID(),
        imageUrl,
        userId,
        createdAt: new Date(),
      })
      .returning();

    return image;
  }
}
