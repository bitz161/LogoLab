import "./buttons.styles.scss";

const Button = ({ buttonContent, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={
        buttonContent === "Discover"
          ? "button-28 buttonDiscover"
          : buttonContent === "Subscribe"
          ? "button-28 buttonSubscribe"
          : "button-28 buttonLogin"
      }>
      {buttonContent}
    </button>
  );
};

export default Button;

// Subscribe
