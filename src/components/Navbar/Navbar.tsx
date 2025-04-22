import Link from "@/elements/Link";
import Image from "../../elements/Image";
import WatchLystLogo from "@/assets/icons/watchlyst_logo.svg";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo-container">
        <Link className="nav-link" href="/">
          <Image
            className="nav-logo"
            src={WatchLystLogo}
            height="20"
            width="20"
          />
          <span>WatchLyst</span>
        </Link>
      </div>
    </nav>
  );
}
