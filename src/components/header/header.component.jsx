import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import Button from "../Buttons/buttons.component";
import "./header.styles.scss";
import {
  signInWithGooglePopup,
  signOutUser,
} from "../../utilities/firebase/firebase";
import { UserContext } from "../../utilities/context/user.context";

const Header = () => {
  const { currentUser } = useContext(UserContext);

  const logGoogleUser = async () => {
    try {
      console.log("Login proceeding...");
      const response = await signInWithGooglePopup();
      console.log("User signed in:", response.user);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const logOutUser = async () => {
    try {
      await signOutUser();
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <div className="headerContainer">
        <div className="headerLinks">
          <div>
            <Link to="/home">LogoLab</Link>
          </div>
          <div>
            <Link to="/pricing">Pricing</Link>
          </div>
          <div>
            <Link to="/community">Community</Link>
          </div>
        </div>
        {currentUser ? (
          <>
            <Button buttonContent="Create Logo" onClick={() => {}} />
            <Button buttonContent="Sign Out" logGoogleUser={logOutUser} />
            <div>{currentUser.displayName}</div>
            {/* <img src={currentUser} /> */}
          </>
        ) : (
          <Button
            buttonContent="Login/Create account"
            logGoogleUser={logGoogleUser}
          />
        )}
      </div>
      <div className="outletContainer">
        <Outlet />
      </div>
    </>
  );
};

export default Header;
