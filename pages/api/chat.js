import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const userMessage = req.body.message;

    try {
      if (!process.env.API_KEY) {
        throw new Error("API key is not configured");
      }

      if (!userMessage) {
        return res.status(400).json({ error: "Message is required" });
      }

      // Get the model
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // Generate content
      const result = await model.generateContent(userMessage);
      const response = await result.response;
      const reply = response.text();

      res.status(200).json({ reply });
    } catch (error) {
      console.error("Error processing the AI response:", error);
      res.status(500).json({ 
        error: "Failed to process the AI response",
        message: error.message 
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
