import Button from "../Buttons/buttons.component";
import "./landing.styles.scss";

const Landing = () => {
  return (
    <div className="landingContainer">
      <h1>WELCOME TO LOGO LAB</h1>
      <Button buttonContent="Discover" />
      <div className="landingContent">
        <p>
          Elevate your brand with custom logos designed to make a lasting
          impact. Connect with top designers and start crafting your unique
          identity today.
        </p>
      </div>
    </div>
  );
};

export default Landing;
