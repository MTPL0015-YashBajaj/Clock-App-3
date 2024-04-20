import React, { useState } from "react";
import UserController from "../../controllers/UserController";

function SignUpForm() {
  const [state, setState] = React.useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber:"",
    gender:"",
    dob:"",
    countryCode:"",
  });

  const [errorMessage, setErrorMessage]= useState("");

  const userController = new UserController();

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    // Check if fullName is empty
    if (state.fullName.trim() === "") {
      setErrorMessage('Please enter your full name');
      return;
    }

    // Check if email is valid
    if (state.email.trim() === "") {
      setErrorMessage('Please enter a valid email address');
      return;
    }
    if (state.password.trim() === "") {
      setErrorMessage('Please enter a valid password');
      return;
    }

    if (state.phoneNumber.length < 10 || state.phoneNumber.length > 15) {
      setErrorMessage('Please enter a valid phone number');
      return;
    }
    if (state.countryCode.length <0) {
      setErrorMessage('Please enter a valid country code');
      return;
    }

    if (state.gender.trim() === "") {
      setErrorMessage('Please enter a gender');
      return;
    }

    if (state.dob.trim() === "") {
      setErrorMessage('Please enter a valid email address');
      return;
    }
    else{
      console.log("state",state);
      const req = JSON.stringify(state);
      console.log("request",req)
      const response = await userController.Register(req);
    }

    // Clear error message
    setErrorMessage('');
  };


  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        {/* <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        <span>or use your email for registration</span> */}
        <input
          type="text"
          name="name"
          value={state.fullName}
          onChange={(event) => setState({ ...state, fullName: event.target.value })}
          placeholder="Full Name"
        />
        {!state.fullName && errorMessage}
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={(event) => setState({ ...state, email: event.target.value })}
          placeholder="Email"
        />
        {!state.email && errorMessage}
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={(event) => setState({ ...state, password: event.target.value })}
          placeholder="Password"
        />
        {!state.password && errorMessage}
          <input
          type="text"
          name="phone"
          value={state.phoneNumber}
          onChange={(event) => setState({ ...state, phoneNumber: event.target.value })}
          placeholder="Phone no"
        />
        {!state.password && errorMessage}
          <input
          type="text"
          name="phone"
          value={state.countryCode}
          onChange={(event) => setState({ ...state, countryCode: event.target.value })}
          placeholder="Country code"
        />
        {!state.phoneNumber && errorMessage}
        <input
          type="text"
          name="gender"
          value={state.gender}
          onChange={(event) => setState({ ...state, gender: event.target.value })}
          placeholder="Gender"
        />
        {!state.gender && errorMessage}
        <input
          type="date"
          name="dob"
          max={new Date()}
          value={state.dob}
          onChange={(event) => setState({ ...state, dob: event.target.value })}
          placeholder="Date of Birth"
        />
        {!state.dob && errorMessage}
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
