// Project: AI Note-Taking Companion

// Import necessary libraries for Node.js
const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
const SpeechRecognition = require('@google-cloud/speech');

// Initialize the app
const app = express();
app.use(bodyParser.json());

// OpenAI API configuration
const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

// Google Cloud Speech-to-Text configuration
const speechClient = new SpeechRecognition.SpeechClient();

// Note storage (in-memory for simplicity)
let notes = [];

// Endpoint to transcribe audio into text and summarise notes
app.post('/transcribe', async (req, res) => {
  try {
    const audioBuffer = req.body.audio;

    // Use Google Speech-to-Text API to transcribe audio
    const [response] = await speechClient.recognize({
      config: {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: 'en-US',
      },
      audio: {
        content: audioBuffer,
      },
    });

    const transcript = response.results
      .map(result => result.alternatives[0].transcript)
      .join(' ');

    // Use OpenAI to summarise the transcript
    const aiResponse = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Summarise the following notes: \"${transcript}\"`,
      max_tokens: 150,
    });

    const summary = aiResponse.data.choices[0].text.trim();

    // Save the original transcript and summary
    notes.push({ transcript, summary });

    res.json({ success: true, summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error processing audio.' });
  }
});

// Endpoint to retrieve all notes
app.get('/notes', (req, res) => {
  res.json({ notes });
});

// Run the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`AI Note-Taking Companion is running on port ${PORT}`);
});

// Next Steps:
// 1. Create a frontend interface to display notes and summaries.
// 2. Add features for exporting notes to text or PDF files.
// 3. Implement user authentication for secure storage.
