import React from "react";
import "./overlay.css";
import Button from "../button/button";

export default function Overlay({ handleOnClick }) {
  return (
    <>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <Button
              CName="ghost"
              title="Sign In"
              id="signIn"
              onClick={() => handleOnClick("signIn")}
            />
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <Button
              CName="ghost"
              title="Sign Up"
              id="signUp"
              onClick={() => handleOnClick("signUp")}
            />
          </div>
        </div>
      </div>
    </>
  );
}
