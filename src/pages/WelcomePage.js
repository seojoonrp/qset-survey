import React from "react";
import { useNavigate } from "react-router-dom";

import "../styles/styles.css";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-wrapper">
      <span>
        영아 교사 애착 Qset 문항 및 준거 개발 연구
        <br />
        (참여교사용)
      </span>
      <div className="hello-wrapper">
        <span>
          안녕하세요?
          <br />
          <br />
          어쩌고저쩌고
        </span>
      </div>
      <div className="phone-input-wrapper">
        <span>아래 내용을 입력해 주십시오.</span>
        <input type="text" placeholder="휴대전화번호" />
        <button onClick={() => navigate("/step1")}>NEXT</button>
      </div>
    </div>
  );
};

export default WelcomePage;
