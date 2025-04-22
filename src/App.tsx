import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/Home";
import { Footer } from "./components/Footer/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <HomePage />
      </main>
      <Footer />
    </>
  );
}
