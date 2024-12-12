// Project: Reading Comprehension Assistant

// Import necessary libraries for Node.js
const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

// Initialize the app
const app = express();
app.use(bodyParser.json());

// OpenAI API configuration
const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

// Endpoint to process reading comprehension queries
app.post('/comprehend', async (req, res) => {
  try {
    const { text, question } = req.body;

    if (!text || !question) {
      return res.status(400).json({ success: false, message: 'Both text and question are required.' });
    }

    // Use OpenAI to answer the question based on the provided text
    const aiResponse = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Answer the question based on the following text:\n\nText: "${text}"\n\nQuestion: "${question}"`,
      max_tokens: 100,
    });

    const answer = aiResponse.data.choices[0].text.trim();

    res.json({ success: true, answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error processing the request.' });
  }
});

// Run the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Reading Comprehension Assistant is running on port ${PORT}`);
});

// Next Steps:
// 1. Create a frontend where users can input text and ask questions.
// 2. Add support for highlighting the relevant parts of the text in the answer.
// 3. Implement multi-language support to broaden accessibility.
