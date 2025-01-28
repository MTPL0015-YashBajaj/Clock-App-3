import React, { useState } from "react";
import SignInForm from "./screens/login-signUp/signIn";
import SignUpForm from "./screens/login-signUp/signUp";
import Overlay from "./components/overlay/overlay";

export default function App() {
  const [containerClass, setContainerClass] = useState("");

  const handleOnClick = (type) => {
    if (type === "signUp") {
      setContainerClass("right-panel-active");
    } else {
      setContainerClass("");
    }
  };

  return (
    <div className="App">
      <h2>Sign in/up Form</h2>
      <div className={`container ${containerClass}`} id="container">
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
