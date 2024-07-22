import { config } from "dotenv";
config();
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/files";

const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const fileManager = new GoogleAIFileManager(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const date = new Date();

const generate = async (prompt, image = undefined) => {
  if (image) {
    const uploadedImage = await fileManager.uploadFile(image, {
      mimeType: "image/jpeg",
      displayName: date.getMilliseconds(),
    });

    console.log(
      `Uploaded file ${uploadedImage.file.displayName} as: ${uploadedImage.file.uri}`
    );

    const result = await model.generateContent([
      {
        fileData: {
          mimeType: uploadedImage.file.mimeType,
          fileUri: uploadedImage.file.uri,
        },
      },
      { text: prompt },
    ]);

    const response = await result.response;
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
