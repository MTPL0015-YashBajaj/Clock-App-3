import React from "react";
import "./social-login.css";
import { FaFacebook, FaGoogle, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function SocialLogin() {
  const handleSocialClick = (platform) => {
    // Add your social login logic here
    console.log(`Logging in with ${platform}`);
  };

  return (
    <>
      <div className="social-container">
        <FaFacebook
          className="social-icon facebook"
          onClick={() => handleSocialClick("Facebook")}
        />
        <FaGoogle
          className="social-icon google"
          onClick={() => handleSocialClick("Google")}
        />
        <FaTwitter
          className="social-icon twitter"
          onClick={() => handleSocialClick("Twitter")}
        />
        <FaLinkedin
          className="social-icon twitter"
          onClick={() => handleSocialClick("Twitter")}
        />
      </div>
    </>
  );
}
