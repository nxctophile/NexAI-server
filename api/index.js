import express from "express";
import cors from "cors";
import multer from "multer";
import generate from "../src/gemini.js";

const upload = multer({ dest: "uploads/" });
const app = express();

app.use(cors());

app.get("/api", async (req, res) => {
  if (req.query.prompt && !req.query.image) {
    try {
      const generatedText = await generate(req.query.prompt);
      res.json({
        response: generatedText,
        status: 200,
      });
    } catch (error) {
      res.status(500).json({
        Error: "Error generating content",
        status: 500,
        details: error.message,
      });
    }
  } else if (req.query.prompt && req.query.image) {
    try {
      const generatedText = await generate(req.query.prompt, req.query.image);
      res.json({
        response: generatedText,
        status: 200,
      });
    } catch (error) {
      res.status(500).json({
        Error: "Error generating content",
        status: 500,
        details: error.message,
      });
    }
  } else {
    res.status(404).json({
      Error: "Cannot get this route",
      status: 404,
    });
  }
});

app.post("/api", upload.single("image"), async (req, res) => {
  try {
    res.json({ message: `Upload successful: ${req.file}` });
  } catch (err) {
    res.json({ error: err });
  }
});

export default app;
