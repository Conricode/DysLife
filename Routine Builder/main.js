// Project: AI-Powered Routine Builder

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

// Endpoint to generate a personalised routine
app.post('/generate-routine', async (req, res) => {
  try {
    const { preferences, timeAvailable } = req.body;

    if (!preferences || !timeAvailable) {
      return res.status(400).json({ success: false, message: 'Both preferences and timeAvailable are required.' });
    }

    // Use OpenAI to generate a routine based on user preferences and time constraints
    const aiResponse = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Create a personalised daily routine based on the following preferences and time availability:

Preferences: ${preferences}
Time Available: ${timeAvailable} hours`,
      max_tokens: 200,
    });

    const routine = aiResponse.data.choices[0].text.trim();

    res.json({ success: true, routine });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error generating the routine.' });
  }
});

// Run the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`AI-Powered Routine Builder is running on port ${PORT}`);
});

// Next Steps:
// 1. Create a frontend where users can input their preferences and time constraints.
// 2. Add options to save and modify routines.
// 3. Implement calendar integration for scheduling routines.
