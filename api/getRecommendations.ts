import { VercelRequest, VercelResponse } from "@vercel/node";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed" });

  const { input, type } = req.body;

  const prompt =
    type === "movie"
      ? `I like the movie "${input}". Recommend 6 similar MOVIES based on theme, tone or story. Return strict JSON: [{"title":"...","year":"YYYY"}]`
      : `I like the TV series "${input}". Recommend 6 similar TV SERIES based on tone, character arcs or atmosphere. Return strict JSON: [{"title":"...","year":"YYYY"}]`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
    });

    const content = response.choices[0].message.content || "[]";
    res.status(200).json(JSON.parse(content));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI request failed" });
  }
}
