import { config } from "dotenv";
config();

const API_KEY = process.env.WHISPER_API_KEY;

const recognize = async (binaryBuffer) => {
    try {
        const response = await fetch(
          "https://api-inference.huggingface.co/models/openai/whisper-tiny",
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              "Content-Type": "application/octet-stream",
            },
            method: "POST",
            body: binaryBuffer,
          }
        );
      
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          throw new Error("Failed to recognize audio");
        }
    } catch (err) {
        return err;
    }
};

export default recognize;
