import Button from "../Buttons/buttons.component";
import "./header.styles.scss";

const Header = () => {
  return (
    <div className="headerContainer">
      <div className="headerLinks">
        <div>LogoLab</div>
        {/* TODO: If user has been logged in, show additional liks like Design,Logos */}
        <div>Pricing</div>
        <div>Community</div>
      </div>
      <Button buttonContent="Login/Create account" />
    </div>
  );
};

export default Header;
