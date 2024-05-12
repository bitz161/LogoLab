import "./buttons.styles.scss";

const Button = ({ buttonContent }) => {
  return (
    <button
      className={
        buttonContent === "Discover"
          ? "button-28 buttonDiscover"
          : "button-28 buttonLogin"
      }>
      {buttonContent}
    </button>
  );
};

export default Button;
