import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function getRecommendationsFromAI(
  input: string,
  type: "movie" | "tv"
): Promise<{ title: string; year: string }[]> {
  const prompt =
    type === "movie"
      ? `I like the movie "${input}". Recommend 6 similar MOVIES based on theme, tone or story. Return strict JSON in this format:
[
  { "title": "Movie Title", "year": "YYYY" }
]`
      : `I like the TV series "${input}". Recommend 6 similar TV SERIES based on tone, character arcs or atmosphere. Return strict JSON in this format:
[
  { "title": "Series Title", "year": "YYYY" }
]`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.8,
  });

  const content = response.choices[0].message.content || "[]";

  try {
    return JSON.parse(content);
  } catch (err) {
    console.error("Failed to parse AI response:", err);
    return [];
  }
}
