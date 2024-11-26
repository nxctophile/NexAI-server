import Groq from "groq-sdk";
import { config } from "dotenv";

config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function generateCompletion(message: string) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
    model: "llama3-8b-8192",
  });
}
