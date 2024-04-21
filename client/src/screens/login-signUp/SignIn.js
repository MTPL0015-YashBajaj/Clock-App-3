import React, { useState } from "react";
import UserController from "../../controllers/UserController";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";


function SignInForm() {
  const [state, setState] = React.useState({
    loginId: "",
    password: "",
  });

  const [errorMessage, setErrorMessage]= useState("");
  
  const userController = new UserController();
  const navigate = useNavigate();
  const cookies = new Cookies();


  const handleOnSubmit = async (event) => {
    event.preventDefault();

    // Check if fullName is empty
    if (state.loginId.trim() === "") {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    if (state.password.trim() === "") {
      setErrorMessage('Please enter a valid password');
      return;
    }

    else{
      console.log("state",state);
      const req = JSON.stringify(state);
      const response = await userController.Login(req);
      console.log(response)
      if(response.success ==="Success"){
        cookies.set('userId', response.userId);
        cookies.set("jwt", response.jwtToken, { path: "/" });
        navigate("/home");

      }
      else{
        console.log("fail")
      }
    }

    // Clear error message
    setErrorMessage('');
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
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
        <span>or use your account</span> */}
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.loginId}
          onChange={(event) => setState({ ...state, loginId: event.target.value })}
        />
         {!state.loginId && errorMessage}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={(event) => setState({ ...state, password: event.target.value })}
        />
        {!state.password && errorMessage}
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
