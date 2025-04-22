import { OpenAI } from "openai";

const isDev = import.meta.env.DEV;

let openai: OpenAI | null = null;

if (isDev) {
  openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });
}

export async function getRecommendationsFromAI(
  input: string,
  type: "movie" | "tv"
): Promise<{ title: string; year: string }[]> {
  if (isDev && openai) {
    const prompt =
      type === "movie"
        ? `I like the movie "${input}". Recommend 6 similar MOVIES based on theme, tone or story. Return strict JSON:
[ { "title": "Movie Title", "year": "YYYY" } ]`
        : `I like the TV series "${input}". Recommend 6 similar TV SERIES based on tone, character arcs or atmosphere. Return strict JSON:
[ { "title": "Series Title", "year": "YYYY" } ]`;

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
  } else {
    const res = await fetch("/api/getRecommendations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input, type }),
    });

    if (!res.ok) {
      console.error("Serverless API error");
      return [];
    }

    return await res.json();
  }
}

export async function getNewRecommendationsFromAI(
  input: string,
  type: "movie" | "tv",
  exclude: string[]
): Promise<{ title: string; year: string }[]> {
  if (isDev && openai) {
    const fullExcludeList = [`"${input}"`, ...exclude];
    const excludeList = fullExcludeList.join(", ");

    const prompt = `I like the ${
      type === "movie" ? "movie" : "TV series"
    } "${input}". Recommend EXACTLY 6 DIFFERENT ${
      type === "movie" ? "MOVIES" : "TV SERIES"
    } matching ${
      type === "movie"
        ? "theme, tone, or story"
        : "tone, character arcs, or atmosphere"
    }. Exclude: ${excludeList}. Return STRICT JSON ONLY:
[ { "title": "Title Name", "year": "YYYY" } ]`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const content = response.choices[0].message.content || "[]";

    try {
      return JSON.parse(content);
    } catch (err) {
      console.error("Failed to parse AI response:", err);
      return [];
    }
  } else {
    const res = await fetch("/api/getNewRecommendations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input, type, exclude }),
    });

    if (!res.ok) {
      console.error("Serverless API error");
      return [];
    }

    return await res.json();
  }
}
