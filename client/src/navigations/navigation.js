import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "../screens/home/home.js";
import SignInSignUp from "../App.js";

// import Cookies from "universal-cookie";

function LocalRoutes() {
  //   const cookies = new Cookies();
  //   var isLoggedIn = cookies.get("@IsLoggedIn");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInSignUp />} />
        <Route path="/home" element={<Homepage />} />

        {/* <Route exact path="/">
          {isLoggedIn ? <HomeContentWithRouter /> : <LoginScreenWithRouter />}
        </Route> */}
      </Routes>
    </Router>
  );
}

export default LocalRoutes;
