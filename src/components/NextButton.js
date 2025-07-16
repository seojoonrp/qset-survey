import React from "react";

import "../styles/styles.css";

const NextButton = ({ onClick, text = "NEXT" }) => {
  return (
    <button className="next-button" onClick={onClick}>
      <span className="next-button-text">{text}</span>
    </button>
  );
};

export default NextButton;
