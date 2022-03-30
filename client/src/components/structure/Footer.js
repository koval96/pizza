import { useLocation } from "react-router-dom";

import inst from "../../static/images/inst.svg";
import fb from "../../static/images/fb.svg";
import logo from "../../static/images/logo.svg";

function Footer() {
  const loc = useLocation();
  return (
    <>
      {!loc.pathname.includes("edit") && (
        <div className="footer">
          <div className="socials">
            <a href="https://instagram.com" target="_blank">
              <img src={inst} alt="instagram" width="24px" />
            </a>
            <a href="https://facebook.com" target="_blank">
              <img src={fb} alt="facebook" width="14px" className="ms-3 mb-1" />
            </a>
          </div>
          <img src={logo} alt="logo" width="60px" />
          <b>Сделано с ❤️</b>
        </div>
      )}
    </>
  );
}

export default Footer;
