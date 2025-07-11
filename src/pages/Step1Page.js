import React from "react";
import { useNavigate } from "react-router-dom";

const Step1Page = () => {
  const navigate = useNavigate();

  return (
    <div>
      <span>스텝1페이지</span>
      <button onClick={() => navigate("/step2")}>NEXT</button>
    </div>
  );
};

export default Step1Page;
