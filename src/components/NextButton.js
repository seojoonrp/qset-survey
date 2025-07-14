import React from "react";

import "../styles/styles.css";

const NextButton = ({ onClick }) => {
  return (
    <button className="next-button" onClick={onClick}>
      <span className="next-button-text">NEXT</span>
    </button>
  );
};

export default NextButton;
