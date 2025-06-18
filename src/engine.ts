import OpenAI from "openai";
import fs from "fs";
import mime from "mime";

export interface StyleAnalysis {
  id: string;
  imageUrl: string;
  styles: {
    style: string;
    elements: string[];
    confidence: number;
  };
  reasoning: string;
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function analyzeInteriorDesignStyle(
  url: string,
): Promise<StyleAnalysis | undefined> {
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
      return JSON.parse(response.choices[0].message.content) as StyleAnalysis;
    }
  } catch (error) {
    throw error;
  }
}

export async function analyzeUserTasteProfile(
  userLikes: Record<string, number>,
): Promise<string | null> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "developer",
          content: `You are an expert interior designer that takes in a user's taste profile where the taste
            is assigned a weight. You are to determine the user's taste profile based off that weight and output
            a message to the user that describes their taste. Don't return it in markdown. Return it as a string.`,
        },
        {
          role: "user",
          content: `Analyze my taste profile and give me a fully comprehensive description of what interior desing styles I like.
            ${JSON.stringify(userLikes)}
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

export async function generateImages(tasteProfile: Record<string, number>) {
  const favoredStyles = getFavoredStyles(tasteProfile);
  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: `Generate an image of a room that is dependent on the score. the higher the score, the more reflective the image should be of that.
      Here is the favored styles: ${JSON.stringify(favoredStyles)}
      `,
    tools: [{ type: "image_generation" }],
  });

  // Save the image to a file
  const imageData = response.output
    .filter((output) => output.type === "image_generation_call")
    .map((output) => output.result);

  if (imageData.length > 0) {
    const imageBase64 = imageData[0];

    if (imageBase64) {
      fs.writeFileSync(
        "user_taste_mockup.png",
        Buffer.from(imageBase64, "base64"),
      );
    }
  }
}

export function getFavoredStyles(tasteProfile: Record<string, number>) {
  return Object.entries(tasteProfile)
    .filter(([_, score]) => score > 3.5)
    .map(([style, score]) => ({ [style]: score }));
}
