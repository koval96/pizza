import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { UserContext } from "../auth/AuthLayer";

import inst from "../../static/images/inst.svg";
import fb from "../../static/images/fb.svg";
import logo from "../../static/images/logo.svg";
import cart from "../../static/images/cart.svg";
import userImg from "../../static/images/user.svg";

function Navbar() {
  const url = useLocation().pathname;
  const isAuthPage = url == "/login" || url == "/register";
  const { user } = useContext(UserContext)

  return (
    <div className={`navbar rel ${isAuthPage && "justify-content-center"}`}>
      {/* <div className="socials">
        <img src={inst} alt="instagram" width="30px" />
        <img src={fb} alt="facebook" width="18px" className="ms-3 mb-1" />
      </div> */}
      <div className="logo">
        <Link to={"/"}>
          <img src={logo} alt="PIZ2A" width="90px" />
        </Link>
      </div>
      {!isAuthPage && (
        <div className="user__container">
          {user.id && <b className="balance me-2">140 ₽</b>}
          <img src={cart} alt="cart" width="30px" className="me-2" />
          <Link to={"/profile"}>
            <img src={userImg} alt="user" width="20px" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
