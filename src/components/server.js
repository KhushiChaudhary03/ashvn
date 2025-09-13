// server.js
import express from 'express';
import cors from 'cors';
import { Client } from "@gradio/client";

const app = express();
app.use(cors());
app.use(express.json());

let client;

// Connect to the Gradio Space on server start
(async () => {
  client = await Client.connect("phani50101/chatbot_mental_health");
})();

// API endpoint for your frontend
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body; // history = [["user", "bot"], ...]
    const result = await client.predict("/respond", {
      message,
      history: history || [],
      max_tokens: 100
    });

    res.json({ reply: result.data[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Error contacting mental health model." });
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));
