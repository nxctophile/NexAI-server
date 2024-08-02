import express from "express";
import generate from "../lib/gemini";

const router = express.Router();

router.get("/", async (req, res) => {
  const prompt = req.query.prompt?.toString();
  if (prompt) {
    try {
      const generatedText = await generate(prompt);
      res.json({
        response: generatedText,
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
