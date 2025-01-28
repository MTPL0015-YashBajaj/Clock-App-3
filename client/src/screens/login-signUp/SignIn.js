import React, { useState } from "react";
import "./signIn-signUp.css";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import SocialLogin from "../../components/social-login/social-login";
import InputField from "../../components/input-field/input-field";
import Button from "../../components/button/button";
import UserController from "../../controllers/userController";

function SignInScreen() {
  const [userState, setUserState] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const userController = new UserController();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserState({ ...userState, [name]: value });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate password
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    let valid = true;
    const newErrors = {
      email: "",
      password: "",
    };

    if (userState.email.trim() === "") {
      newErrors.email = "Email address is required";
      valid = false;
    } else if (!emailRegex.test(userState.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    if (userState.password.trim() === "") {
      newErrors.password = "Password is required";
      valid = false;
    } else if (!passwordRegex.test(userState.password)) {
      newErrors.password =
        "Password must be at least 8 characters long and include at least one number and one special character";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    // Clear error messages
    setErrors({ email: "", password: "" });

    // Make API call
    try {
      console.log("state", userState);
      const req = JSON.stringify(userState);
      const response = await userController.Login(req);
      // Handle response here
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <SocialLogin />
        <span className="sub-text">or use your account</span>
        <div className="input-box">
          <InputField
            type="email"
            name="email"
            value={userState.email}
            onChange={handleInputChange}
            placeholder="Email"
            leftIcon={<FaEnvelope />}
            error={errors.email}
          />

          <InputField
            type="password"
            name="password"
            value={userState.password}
            onChange={handleInputChange}
            placeholder="Password"
            leftIcon={<FaLock />}
            rightIcon={{ open: <FaEyeSlash />, closed: <FaEye /> }}
            error={errors.password}
          />
          <a href="#">Forgot your password?</a>
          <Button title="Sign In"/>
        </div>
      </form>
    </div>
  );
}

export default SignInScreen;
