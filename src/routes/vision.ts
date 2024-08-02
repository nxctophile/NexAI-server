import express from "express";
import multer from "multer";
import os from "os";
import fs from "fs";
import fsExtra from "fs-extra";
import path from "path";
import { config } from "dotenv";
import { GoogleAIFileManager } from "@google/generative-ai/files";

config();

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Function to sanitize file name
const sanitizeFileName = (fileName: string) => {
  // Replace invalid characters with dashes
  let sanitized = fileName.replace(/[^a-z0-9-]/g, "-").toLowerCase();
  // Ensure the name does not begin or end with a dash
  sanitized = sanitized.replace(/^-+|-+$/g, "");
  // Truncate to 40 characters if necessary
  if (sanitized.length > 40) {
    sanitized = sanitized.substring(0, 40);
  }
  return sanitized;
};

const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? "";

router.post("/upload", upload.single("image"), async (req, res) => {
  // const prompt = req.query.prompt?.toString();
  // const mimetype = req.query.mimetype?.toString() ?? "image/jpeg";
  // const displayName = req.query.imagename?.toString();
  // const imageUri = req.query.imageuri?.toString();

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const tempdir = os.tmpdir();
  const sanitizedFileName = sanitizeFileName(req.file.originalname);
  const tempFilePath = path.join(tempdir, sanitizedFileName);

  try {
    // Write the file to the temp directory
    await fsExtra.outputFile(tempFilePath, req.file.buffer);

    // Assuming you have your Google AI File Manager set up correctly
    const fileManager = new GoogleAIFileManager(GEMINI_API_KEY);
    const fileMetadata = {
      name: sanitizedFileName,
      mimeType: req.file.mimetype,
    };

    const result = await fileManager.uploadFile(tempFilePath, fileMetadata);

    // Deleting the temporary file after uploading
    fs.unlink(tempFilePath, (err) => {
      if (err) {
        console.error("Error deleting temporary file:", err);
      }
    });

    res.json({ result });
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
