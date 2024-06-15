import express from 'express';
import cors from 'cors';
import generate from '../src/gemini.js';

const app = express();

app.use(cors());

app.get('/api', async (req, res) => {
  if (req.query.prompt) {
    try {
      const generatedText = await generate(req.query.prompt);
      res.json({
        response: generatedText,
        status: 200
      });
    } catch (error) {
      res.status(500).json({
        Error: "Error generating content",
        status: 500,
        details: error.message
      });
    }
  } else {
    res.status(404).json({
      Error: "Cannot get this route",
      status: 404
    });
  }
});

export default app;
