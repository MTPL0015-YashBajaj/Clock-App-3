import React from "react";
import "./button.css";

export default function Button({ CName, title, id, onClick }) {
  return (
    <>
      <button className={CName} id={id} onClick={onClick}>
        {title}
      </button>
    </>
  );
}
