import React, { useState } from "react";
import SignInForm from "./screens/login-signUp/signIn";
import SignUpForm from "./screens/login-signUp/signUp";
import Overlay from "./components/overlay/overlay";

export default function App() {
  const [type, setType] = useState("signIn");

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };

  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <div className="App">
      <h2>Sign in/up Form</h2>
      <div className={containerClass} id="container">
        {/* Sign-In Form */}
        <SignInForm />
        {/* Sign-Up Form */}
        <SignUpForm />

        {/* Overlay Component */}
        <Overlay handleOnClick={handleOnClick} />
      </div>
    </div>
  );
}
