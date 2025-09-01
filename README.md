# WatchLyst

**WatchLyst** is a smart, AI-powered app that helps you discover your next movie or TV show. Just enter a title you like, select **Movies** or **TV-show**, and get tailored recommendations — complete with posters, genre, description, trailers, IMDb/TMDB links, and streaming availability.

---

## Features

- **Search** for a movie or TV show you like.
- **AI-generated recommendations** using OpenAI.
- Get **Suggestions** based on theme, tone, or story.
- Displays **posters, description, genre, trailers, IMDb & TMDB links**.
- Shows **where to stream** (via available providers).
- Option to fetch **new recommendations** if you've watched all of the titles.
- Smooth UX with **skeleton loaders** while loading data.
- User-friendly **error messages** when something goes wrong.

---

## Tech Stack

- **React** & **TypeScript**
- **Vite** for fast frontend tooling
- **CSS** for styling
- **OpenAI API** for intelligent recommendations
- **TMDB API** for movie/series data and streaming options
- **Vercel** for deployment with serverless backend functions

---

## Acknowledgements

- **[OpenAI](https://openai.com/)** — AI-powered recommendations
- **[TMDB](https://www.themoviedb.org/)** — Movie & TV show data, posters & streaming providers
- **[Vite](https://vitejs.dev/)** — Fast frontend build tool
- **[Vercel](https://vercel.com/)** — Hosting & serverless backend

---



## Local development

To run WatchLyst locally, you need to set up environment variables for API access.

1. **Clone the repository**:

   ```bash
   git clone https://github.com/maxjvjohansson/watchlyst-app.git
   cd watchlyst-app
   ```

2. **Copy `.env.example` to `.env.local`** in the project root:

   ```bash
   cp .env.example .env.local
   ```

3. **Fill in your API keys**:

   * `VITE_TMDB_API_KEY`: Your TMDB API key ([get one here](https://www.themoviedb.org/settings/api)).
   * `VITE_OPEN_AI_KEY`: Your OpenAI API key ([get one here](https://platform.openai.com/account/api-keys)).

4. **Install dependencies and start the development server**:

   ```bash
   npm install
   npm run dev
   ```
   
Your app will be available at `http://localhost:5173`

## License

This project is licensed under the **MIT License**
