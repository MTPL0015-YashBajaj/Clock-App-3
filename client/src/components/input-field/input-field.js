import React, { useState } from "react";
import "./input-field.css";

const InputField = ({
  type = "text",
  name,
  value,
  leftIcon,
  rightIcon,
  onChange,
  onClick,
  placeholder,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <>
      <div className="input-main">
        <div className="input-field-container">
          {leftIcon && <span className="input-icon left-icon">{leftIcon}</span>}
          <input
            type={inputType}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`input-field ${error ? "error" : ""}`}
          />
          {rightIcon && (
            <span
              className="input-icon right-icon"
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer" }}
            >
              {showPassword ? rightIcon.open : rightIcon.closed}
            </span>
          )}
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>
    </>
  );
};

export default InputField;
