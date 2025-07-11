import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/styles.css";
import Logo from "../assets/images/chungbuk-logo.svg";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleNext = () => {
    const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert("휴대전화번호를 XXX-XXXX-XXXX 형식으로 입력해주세요.");
      return;
    }
    navigate("/step1");
  };

  return (
    <div className="welcome-wrapper">
      <span className="welcome-title-text">
        영아 교사 애착 Qset 문항 및 준거 개발 연구
        <br />
        <span className="welcome-subtitle-text">(참여교사용)</span>
      </span>
      <div className="hello-wrapper">
        <span className="hello-text">
          <span className="hello-bold">안녕하십니까?</span>
          <br /> <br />
          &nbsp; 본 웹 설문지는 어린이집에 재원 중인 12개월 이상의 영아와
          담임교사 간 애착 안정성 수준을 측정할 수 있는 애착 Qset 문항과 준거를
          개발하는 연구로 귀하와 본 연구에 참여하는 영아에 대해 각 문항이 얼마나
          일치하고 특징적인지 응답하시면 됩니다. 본 조사는 3단계로 구성되어
          있으며 단계별 설명이 제시되어 있으니 응답 전 확인하시기 바랍니다.
          <br /> <br />
          &nbsp; 우선, 웹 설문조사의 특성상 몇 가지 유의사항을 당부드립니다.
          <br /> <br />
          &nbsp; 첫째, 설문 시작 시 귀하의{" "}
          <span className="hello-bold">휴대전화번호를 입력</span>하여 주십시오.
          귀하께서 여러 번 참여하는 경우에도 휴대전화번호는 필수로 입력하셔야
          합니다.
          <br /> <br />
          &nbsp; 둘째, 설문 조사가 시작되면 중간에 나가거나 멈추지 마시고{" "}
          <span className="hello-bold">끝까지 응답하셔야 합니다.</span> 중도에
          멈출 경우 응답한 결과가 소실되어 1단계부터 다시 시작해야 합니다.
          <br /> <br />
          &nbsp; 셋째, 응답을 모두 마친 후 ‘설문응답 전송’을 누르면 조사가
          완료됩니다.{" "}
          <span className="hello-bold">
            설문응답이 전송되면 응답을 수정할 수 없습니다.
          </span>
          <br /> <br />
          &nbsp; 본 조사의 결과는 연구를 위한 자료로 사용할 것이며, 연구 목적
          이외에는 이용하지 않을 것을 약속드립니다. 바쁘실 와중에 본 설문에
          참여해 주셔서 진심으로 감사드립니다.
        </span>
      </div>
      <div className="logo-wrapper">
        <img className="logo-image" src={Logo} alt="로고 이미지" />
        <span className="logo-text">
          충북대학교
          <br />{" "}
          <span className="logo-text-light">일반대학원 아동복지학전공</span>
          <br /> 연구자 : <span className="logo-text-light">김경화</span>
          <br /> 지도교수 : <span className="logo-text-light">신나리</span>
        </span>
      </div>
      <div className="phone-input-wrapper">
        <div className="phone-input-square">
          <span className="phone-input-square-text">휴대전화번호</span>
        </div>
        <input
          className="phone-input"
          type="text"
          placeholder="휴대전화번호를 입력해주세요"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <button className="next-button" onClick={handleNext}>
        <span className="next-button-text">NEXT</span>
      </button>
    </div>
  );
};

export default WelcomePage;
