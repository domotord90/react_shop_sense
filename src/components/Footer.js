import React from "react";
import "../styles/Footer.css";

const Footer = ({ FontAwesome, copyright, facebook, twitter }) => {
  return (
    <div className="footer-container">
      <p>
        Copyright <FontAwesome icon={copyright} /> 2019.All right reserved
      </p>
      <div className="socials-container">
        <FontAwesome className="social" icon={facebook} />
        <FontAwesome className="social" icon={twitter} />
      </div>
    </div>
  );
};

export default Footer;
