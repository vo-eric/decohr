import OpenAI from "openai";
import { JAPANESE_URLS } from "../data/seed";
import express from "express";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
/*

PLAN
Add a bunch of image linkts to images.ts
Create a function that takes those images and puts them into gpt-4o to generate a json object of the image that breaks down the
  interior design styles

Put the outputted data into the DB

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
): Promise<StyleAnalysis[]> {
  const results: StyleAnalysis[] = [];
  for (const url of imageUrls) {
    try {
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
              }`,
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
                  url,
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
        results.push(analysis);
      }
    } catch (error) {
      throw error;
    }
  }
  return results;
}

void (async () => {
  try {
    const results = await analyzeInteriorDesignStyles(JAPANESE_URLS);
    console.log("results", results);
  } catch (err) {
    console.error("error", err);
  }
})();
