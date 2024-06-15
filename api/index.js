import express from 'express'
const app = express();
import cors from 'cors';
import generate from '../src/gemini.js';

const port = process.env.PORT || 8080;

app.use(cors());

app.get('/', async (req, res) => {
  if (req.query.prompt) {
    try {
      const generatedText = await generate(req.query.prompt); // Pass the correct query parameter
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


app.listen(port);