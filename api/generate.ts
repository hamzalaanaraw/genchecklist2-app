
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests are allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('GEMINI_API_KEY is not configured on the server.');
    return res.status(500).json({ error: 'API key is not configured on the server. Please contact support.' });
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'A prompt is required.' });
    }
    if (typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt must be a string.' });
    }

    const genResponse: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17', // Use correct and current model
      contents: prompt,
      config: {
        responseMimeType: "application/json", // Ensure JSON output from Gemini
      }
    });
    
    const rawText = genResponse.text;
    
    let cleanedJsonText = rawText.trim();
    // Robust regex to remove potential markdown fences and trim
    const fenceRegex = /^\`\`\`(?:json)?\s*\n?(.*?)\n?\s*\`\`\`$/s;
    const match = cleanedJsonText.match(fenceRegex);
    if (match && match[1]) {
        cleanedJsonText = match[1].trim();
    } else if (match && match[0] && !match[1] && cleanedJsonText.startsWith('```\n') && cleanedJsonText.endsWith('\n```')) {
        // Handles cases where the JSON content is on new lines after the opening fence
        cleanedJsonText = cleanedJsonText.substring(cleanedJsonText.indexOf('\n') + 1, cleanedJsonText.lastIndexOf('\n')).trim();
    }


    try {
      const parsedJson = JSON.parse(cleanedJsonText);
      res.status(200).json(parsedJson); // Send parsed JSON object
    } catch (parseError) {
      console.error("Failed to parse JSON from AI response in serverless function:", parseError, "Cleaned text was:", cleanedJsonText.substring(0, 500));
      res.status(500).json({ error: 'AI response was not valid JSON after cleaning.', details: (parseError as Error).message });
    }

  } catch (error: any) {
    console.error("Error in serverless function calling Gemini API:", error);
    const message = error?.error?.message || error.message || 'Failed to generate content from the AI.';
    const status = error?.error?.code || error.status || 500;
    res.status(status).json({ error: message });
  }
}
