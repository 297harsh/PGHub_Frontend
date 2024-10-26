import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import logo from "../../assets/pghub/logo.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content d-flex justify-content-between align-items-start">
        <div className="footer_brand_logo">
          <img src={logo} alt="PGHub Logo" />
        </div>
        <div id="footer_links" className="d-flex flex-column align-items-end">
          <div className="d-flex flex-column">
            <Link to="/">Home</Link>
            <a href="/#about-us">About Us</a>
            <a href="/#contact-us">Contact Us</a>
          </div>

          <div className="d-flex flex-column">
            <Link to="/privacypolicy">Privacy Policy</Link>
            <Link to="/terms">Terms and Conditions</Link>
          </div>
          <div className="d-flex flex-column">
            <a href="/searchpg/Vadodara">PG's in Vadodara</a>
            <a href="/searchpg/Ahemdabad">PG's in Ahemdabad</a>
            <a href="/searchpg/Surat">PG's in Surat</a>
          </div>
        </div>

        <div id="social_links" className="d-flex flex-column align-items-end">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF className="social-icon" />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn className="social-icon" />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="social-icon" />
          </a>
        </div>
      </div>
      <div className="copyright d-flex justify-content-between align-items-center pt-5">
        Copyright © 2023 | All Rights Reserved by PGHub | Sitemap
      </div>
    </footer>
  );
};

export default Footer;
