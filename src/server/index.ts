import {
  analyzeInteriorDesignStyles,
  analyzeUserTasteProfile,
  generateImages,
  getFavoredStyles,
} from "~/engine";
import {
  DUMMY_IMAGE_RESULTS,
  DUMMY_LIKES,
  DUMMY_USERS,
  JAPANESE_URLS,
} from "../data/seed";
import express from "express";

/*

PLAN
Add a bunch of image linkts to images.ts
Create a function that takes those images and puts them into gpt to generate a json object of the image that breaks down the
  interior design styles. throw that into a local file

DO NOT have DB for now.

After creating JSON, create a seed user that likes specific images to test it.

After, create the UI to do one shot analyses. 

*/

const app = express();
app.use(express.json());
const PORT = process.env.PORT ?? 3000;

interface User {
  id: string;
  tasteProfile: Record<string, number>;
}

export function findUser(userId: string): User | undefined {
  return DUMMY_USERS.find((user) => user.id === userId);
}

export function aggregateUserLikes(userId: string) {
  const userLikes = DUMMY_LIKES.filter((like) => like.userId === userId);
  const totalLikes: Record<string, number> = {};

  for (const like of userLikes) {
    const image = DUMMY_IMAGE_RESULTS.find(
      (image) => image.id === like.imageId,
    );
    const styles = image?.styles;

    if (!styles) {
      return;
    }

    for (const style of styles) {
      totalLikes[style.style] =
        (totalLikes[style.style] ?? 0) + 1 * style.confidence;
    }
  }

  return totalLikes;
}

export async function determineTasteProfileForUser(userId: string) {
  const user = findUser(userId);

  if (!user) {
    throw new Error("User not found");
  }
  const aggregateLikes = aggregateUserLikes(user.id);

  return aggregateLikes;
}

app.get("/", async (req, res) => {
  await analyzeInteriorDesignStyles(JAPANESE_URLS);
  res.send("Finished");
});

app.get("/determine-profile/:userId", async (req, res) => {
  const userId = req.params.userId;
  const user = findUser(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const profile = await determineTasteProfileForUser(userId);
  res.send(profile);
});

app.get("/get-taste-profile/:userId", async (req, res) => {
  const user = findUser(req.params.userId);

  if (!user) {
    throw new Error("User not found");
  }

  const tasteProfile = await analyzeUserTasteProfile(user.tasteProfile);
  res.send(tasteProfile);
});

app.get("/get-mockup/:userId", async (req, res) => {
  const user = findUser(req.params.userId);
  if (!user) {
    throw new Error("user not found");
  }

  await generateImages(user.tasteProfile);
  res.send("Finished");
});

app.listen(PORT, () => {
  console.log(`Server is running on port, ${PORT}`);
});
