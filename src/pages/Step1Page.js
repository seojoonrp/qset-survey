import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { SurveyContext } from "../context/SurveyContext";
import "../styles/styles.css";
import NextButton from "../components/NextButton";
import TitleText from "../components/TitleText";
import questions from "../data/questions";

const Step1Page = () => {
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const { step1Answers, setStep1Answers } = useContext(SurveyContext);
  const navigate = useNavigate();

  const handleSelect = (questionId, answer) => {
    setStep1Answers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleNext = () => {
    const countH = Object.values(step1Answers).filter((a) => a === "상").length;
    const countM = Object.values(step1Answers).filter((a) => a === "중").length;
    const countL = Object.values(step1Answers).filter((a) => a === "하").length;

    if (countH !== 18 || countM !== 18 || countL !== 18) {
      alert("상, 중, 하 그룹별로 각각 18개씩 선택해 주세요.");
      return;
    }

    navigate("/step2");
  };

  return (
    <div className="step-wrapper">
      <div className="step-scroll-wrapper">
        <TitleText />
        <span className="step-main-description">
          1단계는 54개의 문항을 ‘상’ , ‘중’ , ‘하’ 그룹으로 분류하는 과정이며,
          방법은 아래와 같습니다.
        </span>
        <span className="step-sub-description">1. 문항을 하나씩 읽습니다.</span>
        <span className="step-sub-description">
          2. 문항이 해당 영아와 나의 관계에서 보이는 행동과 많이 일치하거나,
          해당 영아가 보이는 특징적인 행동인 경우 ‘상’을 클릭합니다. 반대로
          일치하지 않거나 판단할 수 없다면 ‘하’로, 보통 일치하거나
          애매모호하다고 생각되면 ‘중’으로 클릭합니다.
        </span>
        <span className="step-sub-description sub-bold">
          3. 상, 중, 하 분류 시 최종적으로 각 그룹에는 18개의 문항이 배분되어야
          합니다. 문항 분류 시 현재 그룹별 선택 개수를 아래쪽에서 확인
          가능하오니, 참조하여 주시기 바랍니다.
        </span>
        <span className="step-sub-description">
          4. 모든 문항에 응답한 후, ‘NEXT’ 를 누르면 2단계로 넘어갑니다.
        </span>

        <div className="rating-options">
          {[
            { label: "상", description: "많이 일치하며\n특징적이다" },
            { label: "중", description: "보통 일치하거나\n애매모호하다" },
            { label: "하", description: "일치하지 않거나\n판단할 수 없다" },
          ].map((item) => (
            <div key={item.label} className="rating-item">
              <div className="rating-button">{item.label}</div>
              <div className="rating-description">{item.description}</div>
            </div>
          ))}
        </div>

        <div className="question-list">
          {questions.map((q) => (
            <div key={q.id} className="question-item-wrapper">
              <span className="question-text">
                <span className="question-text-bold">{q.id}.</span>&nbsp;
                {q.text}
              </span>
              <div className="options">
                {["상", "중", "하"].map((opt) => (
                  <button
                    key={opt}
                    className={`option-button ${
                      step1Answers[q.id] === opt ? "selected" : ""
                    }`}
                    onClick={() => handleSelect(q.id, opt)}
                  >
                    <span className="options-text">{opt}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <NextButton onClick={handleNext} />
      </div>

      <div className="bottom-fixed-wrapper">
        <span className="group-description-text">
          상, 중, 하 그룹별로 18개의 문항이 배분되어야 합니다.
        </span>
        <div className="group-remaining">
          <span className="group-remaining-text">
            상 : {Object.values(step1Answers).filter((a) => a === "상").length}
            개 &nbsp;&nbsp;/&nbsp;&nbsp;
          </span>
          <span className="group-remaining-text">
            중 : {Object.values(step1Answers).filter((a) => a === "중").length}
            개 &nbsp;&nbsp;/&nbsp;&nbsp;
          </span>
          <span className="group-remaining-text">
            하 : {Object.values(step1Answers).filter((a) => a === "하").length}
            개
          </span>
        </div>
      </div>
    </div>
  );
};

export default Step1Page;
