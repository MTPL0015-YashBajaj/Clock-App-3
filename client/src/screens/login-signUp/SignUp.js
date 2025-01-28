import React, { useState } from "react";
import "./signIn-signUp.css";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaVenusMars,
  FaCalendarAlt,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import SocialLogin from "../../components/social-login/social-login";
import InputField from "../../components/input-field/input-field";
import Button from "../../components/button/button";
import UserController from "../../controllers/userController";

function SignUpScreen() {
  const [userState, setUserState] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "",
    dob: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "",
    dob: "",
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

    let isValid = true;
    const newErrors = {};

    // Validate full name
    if (userState.fullName.trim() === "") {
      newErrors.fullName = "Full name is required";
      isValid = false;
    }

    // Validate email
    if (userState.email.trim() === "") {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(userState.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Validate password
    if (userState.password.trim() === "") {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (!passwordRegex.test(userState.password)) {
      newErrors.password =
        "Password must be at least 8 characters long and include at least one number and one special character";
      isValid = false;
    }

    // Validate phone number
    if (userState.phoneNumber.trim() === "") {
      newErrors.phoneNumber = "Phone number is required";
      isValid = false;
    } else if (
      userState.phoneNumber.length < 12 ||
      userState.phoneNumber.length > 15
    ) {
      newErrors.phoneNumber =
        "Phone number must be between 12 and 15 characters";
      isValid = false;
    }

    // Validate gender
    if (userState.gender.trim() === "") {
      newErrors.gender = "Gender is required";
      isValid = false;
    }

    // Validate date of birth
    if (userState.dob.trim() === "") {
      newErrors.dob = "Date of birth is required";
      isValid = false;
    } else if (new Date(userState.dob) > new Date()) {
      newErrors.dob = "Date of birth cannot be in the future";
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    // Clear errors if valid
    setErrors({});

    try {
      const req = JSON.stringify(userState);
      console.log("req", req);
      const response = await userController.Register(req);
      console.log("Registration successful", response);
    } catch (error) {
      console.error("Registration error", error);
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <SocialLogin />
        <span className="sub-text">or use your email for registration</span>
        <div className="input-box">
          <InputField
            type="text"
            name="fullName"
            value={userState.fullName}
            onChange={handleInputChange}
            placeholder="Full Name"
            leftIcon={<FaUser />}
            error={errors.fullName}
          />

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

          <InputField
            type="text"
            name="phoneNumber"
            value={userState.phoneNumber}
            onChange={handleInputChange}
            placeholder="Phone no"
            leftIcon={<FaPhone />}
            error={errors.phoneNumber}
          />

          <InputField
            type="text"
            name="gender"
            value={userState.gender}
            onChange={handleInputChange}
            placeholder="Gender"
            leftIcon={<FaVenusMars />}
            error={errors.gender}
          />

          <InputField
            type="date"
            name="dob"
            value={userState.dob}
            onChange={handleInputChange}
            placeholder="Date of Birth"
            leftIcon={<FaCalendarAlt />}
            error={errors.dob}
          />
          <Button title="Sign Up" />
        </div>
      </form>
    </div>
  );
}

export default SignUpScreen;
