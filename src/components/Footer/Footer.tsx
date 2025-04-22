import Image from "@/elements/Image";
import WathLystLogo from "@/assets/icons/watchlyst_logo.svg";

export const Footer = () => {
  return (
    <footer>
      <div className="footer-logo-container">
        <Image className="footer-logo" src={WathLystLogo} />
        <span>WatchLyst</span>
      </div>
      <small className="copyright">
        © 2025 WatchLyst. All rights reserved.
      </small>
    </footer>
  );
};
