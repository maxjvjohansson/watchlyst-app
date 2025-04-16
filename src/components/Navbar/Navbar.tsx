import Link from "@/elements/Link";
import Image from "../../elements/Image";
import WatchLystLogo from "@/assets/icons/watchlyst_logo.svg";

export default function Navbar() {
  return (
    <nav>
      <div>
        <Image src={WatchLystLogo} />
        <Link href="/" text="WatchLyst" className="nav-link" />
      </div>
    </nav>
  );
}
