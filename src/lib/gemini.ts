import { config } from "dotenv";
config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY ?? "";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const generate = async (
  prompt: string,
  imagetype: string | undefined = undefined,
  imageuri: string | undefined = undefined
) => {
  if (imagetype && imageuri) {
    const result = await model.generateContent([
      {
        fileData: {
          mimeType: imagetype ?? "",
          fileUri: imageuri ?? "",
        },
      },
      { text: prompt },
    ]);

    const response = result.response;
    const text = response.text();
    return text;
  } else {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
  }
};

export default generate;
