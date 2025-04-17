export default function ApiTest() {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string;

  fetch(`https://api.themoviedb.org/3/movie/950387?api_key=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));

  return <div>Check console for movie data</div>;
}
