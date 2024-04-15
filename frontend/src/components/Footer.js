import React from "react";
import "../style/Footer.css";
import PrivacyModal from "./PrivacyModals";
import { BsTwitter, BsYoutube} from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="item1">
          <PrivacyModal />
        </div>

        <div className="item2">
          <span style={{ paddingRight: 5 }}>Copyright</span>
          <FaRegCopyright />
          <span style={{ paddingLeft: 5 }}>
            {new Date().getFullYear()} Amanda Rahmat. All Rights Reserved.
          </span>
        </div>
        <a href="/" target="_blank" className="item3" rel="noreferrer">
          <BsTwitter />
        </a>
        <a href="/" target="_blank" className="item4" rel="noreferrer">
          <FaFacebookF />
        </a>
        <a href="/" target="_blank" className="item5" rel="noreferrer">
          <BsYoutube />
        </a>

        {false && <PrivacyModal click={true} />}
      </div>
    </footer>
  );
};

export default Footer;
