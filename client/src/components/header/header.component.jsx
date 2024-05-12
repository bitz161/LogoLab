import { Link, Outlet } from "react-router-dom";
import Button from "../Buttons/buttons.component";
import "./header.styles.scss";

const Header = () => {
  return (
    <>
      <div className="headerContainer">
        <div className="headerLinks">
          <div>
            <Link to="/home">LogoLab</Link>
          </div>
          {/* TODO: If user has been logged in, show additional liks like Design,Logos */}
          <div>Pricing</div>
          <div>Community</div>
        </div>
        {/* TODO: If already logged in, show the "Create Logo" button and profile
        and name of the user */}
        <Button buttonContent="Login/Create account" />
      </div>
      <div className="outletContainer">
        <Outlet />
      </div>
    </>
  );
};

export default Header;
