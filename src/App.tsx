import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/Home";
import { Footer } from "./components/Footer/Footer";
import { SearchProvider } from "./context/SearchContext";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <SearchProvider>
          <HomePage />
        </SearchProvider>
      </main>
      <Footer />
    </>
  );
}
