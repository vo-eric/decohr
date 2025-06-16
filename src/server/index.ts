import OpenAI from "openai";
import {
  DUMMY_IMAGE_RESULTS,
  DUMMY_LIKES,
  DUMMY_USERS,
  JAPANESE_URLS,
} from "../data/seed";
import express from "express";
import fs from "fs";
import mime from "mime";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
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

interface StyleAnalysis {
  id: string;
  imageUrl: string;
  styles: {
    style: string;
    elements: string[];
    confidence: number;
  };
}

export async function analyzeInteriorDesignStyles(
  imageUrls: string[],
): Promise<void> {
  const data: StyleAnalysis[] = [];
  for (const url of imageUrls) {
    try {
      const mimeType = mime.getType(url);
      const imageData = fs.readFileSync(url);
      const base64Image = imageData.toString("base64");
      const imageUrl = `data:${mimeType};base64,${base64Image}`;
      console.log("Analyzing image: ", url);
      const response = await openai.chat.completions.create({
        model: "gpt-4.1",
        messages: [
          {
            role: "developer",
            content: `You are an expert interior designer that analyzes images to determine the interior design styles of 
            the image (e.g. minimalist, bohemian, Scandinavian, etc.). Note that there can be a mix of styles and that
            there is not necessarily just one style in these images. Images can have multiple styles and I want the elements
            of each style to be reflected in the styles field with its own confidence score. I want you to output these results 
            into a JSON object with the following format: 
              {id: string,
              image_url: string, 
              styles: {
                style: string,
                elements: string[],
                confidence: number
              }.
              
              The id should be a unique identifier for the image. Use a random UUID.
              The image_url should be ORIGINAL URL of the image (ex: '/public/image). Do not use a URL found  on the internet.
              Try to aggregate the styles into a single style if possible (e.g. Japanese and Japanese Zen should be Japanese)
              Also, explain the reasoning behind the confidence score.`,
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze the image and return the interior design styles in JSON.",
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl,
                },
              },
            ],
          },
        ],
      });
      if (!response.choices[0]) {
        throw new Error("No response from LLM");
      }

      if (response.choices[0].message.content) {
        const analysis = JSON.parse(
          response.choices[0].message.content,
        ) as StyleAnalysis;

        data.push(analysis);

        console.log("Finished analyzing image: ", url);
        console.log("Analysis: ", response.choices[0].message.content);
        console.log("--------------------------------");
      }
    } catch (error) {
      throw error;
    }

    fs.writeFileSync("styleResults.json", JSON.stringify(data, null, 2));
  }
}

export async function analyzeUserTasteProfile(
  userTasteProfile: Record<string, number>,
): Promise<string | null> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "developer",
          content: `You are an expert interior designer that takes in a user's taste profile where the taste
            is assigned a weight. You are to determine the user's taste profile based off that weight and output
            a message to the user that describes their taste.`,
        },
        {
          role: "user",
          content: `Analyze my taste profile and give me a fully comprehensive description of what interior desing styles I like.
            ${JSON.stringify(userTasteProfile)}
            `,
        },
      ],
    });

    if (!response.choices[0]) {
      throw new Error("No response from LLM");
    }

    return response.choices[0].message.content;
  } catch (error) {
    throw error;
  }
}

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

app.listen(PORT, () => {
  console.log(`Server is running on port, ${PORT}`);
});
