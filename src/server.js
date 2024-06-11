const express = require('express');
const app = express();
const cors = require('cors');

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Fetch your API_KEY
const API_KEY = "AIzaSyDdZgkruzI-r63AzOP-XhzXesR6faWOZIk";

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

// The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

const generate = async (prompt) => {
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}

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