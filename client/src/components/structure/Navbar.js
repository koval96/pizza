import inst from "../../static/images/inst.svg";
import fb from "../../static/images/fb.svg";
import logo from "../../static/images/logo.svg";
import cart from "../../static/images/cart.svg";
import userImg from "../../static/images/user.svg";

function Navbar() {
  return (
    <div className="navbar rel">
      <div className="socials">
        <img src={inst} alt="instagram" width="30px" />
        <img src={fb} alt="facebook" width="18px" className="ms-3 mb-1" />
      </div>
      <div className="logo">
        <img src={logo} alt="PIZ2A" width="90px" />
      </div>
      <div className="user__container">
        <b className="balance me-2">140 ₽</b>
        <img src={cart} alt="cart" width="30px" className="me-2" />
        <img src={userImg} alt="user" width="18px" />
      </div>
    </div>
  );
}

export default Navbar;
