import express from "express";
import multer from "multer";
import { config } from "dotenv";
import { GoogleAIFileManager } from "@google/generative-ai/files";

config();

const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? "";

const IMGBB_API_KEY = process.env.IMGBB_API_KEY ?? "";

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const { buffer, originalname, mimetype } = req.file;

    // Convert the buffer to base64
    const base64Data = buffer.toString("base64");
    const dataUrl = `data:${mimetype};base64,${base64Data}`;

    let formData = new FormData();

    const date = new Date();
    formData.append("image", new Blob([dataUrl]), `${date.getTime()}.jpeg`);

    const result = await fetch(
      `https://api.imgbb.com/1/upload?expiration=600&key=${IMGBB_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "image/jpeg",
        },
        body: formData,
      }
    );

    if (!result.ok) res.json({ error: "Error uploading image" });

    res.json({ result });

    // Assuming you have your Google AI File Manager set up correctly
    // const fileManager = new GoogleAIFileManager(GEMINI_API_KEY);
    // const result = await fileManager.uploadFile(dataUrl, {
    //   mimeType: mimetype,
    //   displayName: originalname,
    // });

    // res.json({ result });
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
