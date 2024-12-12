// Project: Voice-Controlled Task Manager

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

// Task storage (in-memory for simplicity)
let tasks = [];

// Endpoint to add a task via text input
app.post('/add-task', async (req, res) => {
  const { task } = req.body;
  if (task) {
    tasks.push(task);
    res.json({ success: true, message: `Task added: ${task}` });
  } else {
    res.status(400).json({ success: false, message: 'No task provided.' });
  }
});

// Endpoint to list all tasks
app.get('/list-tasks', (req, res) => {
  res.json({ tasks });
});

// Endpoint for voice-to-task functionality
app.post('/voice-task', async (req, res) => {
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

    // Use OpenAI to convert the transcript into actionable tasks
    const aiResponse = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Extract actionable tasks from the following text: "${transcript}"`,
      max_tokens: 100,
    });

    const extractedTasks = aiResponse.data.choices[0].text.split('\n').filter(t => t.trim() !== '');
    tasks = tasks.concat(extractedTasks);

    res.json({ success: true, tasks: extractedTasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error processing audio.' });
  }
});

// Run the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Voice-Controlled Task Manager is running on port ${PORT}`);
});

// Next Steps:
// 1. Create a frontend interface to display tasks and allow voice input.
// 2. Add support for recurring tasks and reminders.
// 3. Implement database storage for tasks instead of in-memory storage.
