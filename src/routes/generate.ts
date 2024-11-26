import express from "express";
import { generateCompletion } from "../lib/groq";

const router = express.Router();

router.get("/", async (req, res) => {
  const prompt = req.query.prompt?.toString();
  if (prompt) {
    try {
      const generatedText = await generateCompletion(prompt);
      const message = generatedText.choices[0]?.message?.content || "";
      res.json({
        response: message,
        status: 200,
      });
    } catch (error: any) {
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

export default router;
