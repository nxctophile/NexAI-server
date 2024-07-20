import express from "express";
import cors from "cors";
import generate from "../src/gemini.js";
import recognize from "../src/whisper.js";

const app = express();

app.use(cors());

app.get("/generate", async (req, res) => {
  if (req.query.prompt) {
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
  } else {
    res.status(404).json({
      Error: "Cannot get this route",
      status: 404,
    });
  }
});

app.get("/recognize", async (req, res) => {
  if (req.query.voicedata) {
    try {
      const recognizedText = await recognize(req.query.voicedata);
      res.json({
        response: recognizedText,
        status: 200,
      });
    } catch (error) {
      res.status(500).json({
        Error: "Error recognizing voice",
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

export default app;
