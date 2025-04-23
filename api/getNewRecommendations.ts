import { VercelRequest, VercelResponse } from "@vercel/node";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed" });

  const { input, type, exclude } = req.body;

  const excludeList = [`"${input}"`, ...(exclude || [])].join(", ");

  const prompt = `I like the ${
    type === "movie" ? "movie" : "TV series"
  } "${input}". Recommend EXACTLY 6 DIFFERENT ${
    type === "movie" ? "MOVIES" : "TV SERIES"
  } matching ${
    type === "movie"
      ? "theme, tone, or story"
      : "tone, character arcs, or atmosphere"
  }. Exclude: ${excludeList}. Return STRICT JSON ONLY: [{"title":"...","year":"YYYY"}]`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const content = response.choices[0].message.content || "[]";
    res.status(200).json(JSON.parse(content));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI request failed" });
  }
}
