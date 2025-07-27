import React, { useState, useEffect, useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { SurveyContext } from "../context/SurveyContext";
import "../styles/styles.css";
import TitleText from "../components/TitleText";
import NextButton from "../components/NextButton";
import testAnswers from "../data/testAnswers";
import DragQuestion from "../components/DragQuestion";

const API_URL =
  "https://script.google.com/macros/s/AKfycbz82iJCsudLF0RUve0DXcbjfPh2jXmB8zP3nNNTt4xwyndG4jbjH2bjrpfyhD9AcFFO_A/exec";

const mapGroupToScore = (groupedAnswers) => {
  const entries = Object.entries(groupedAnswers).map(([key, value]) => ({
    id: parseInt(key),
    group: value,
  }));

  const result = [];

  [
    { key: "하", base: 2 },
    { key: "중", base: 5 },
    { key: "상", base: 8 },
  ].forEach(({ key, base }) => {
    entries
      .filter((item) => item.group === key)
      .forEach((item, idx) => {
        result.push({ id: item.id, score: base });
      });
  });
  return result;
};

const Step2Page = () => {
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

  const {
    step1Answers,
    step2Answers,
    setStep2Answers,
    phoneNumber,
    childName,
    childBirthDate,
  } = useContext(SurveyContext);

  const [sentResult, setSentResult] = useState(false);

  useEffect(() => {
    if (step2Answers.length === 0 && Object.keys(step1Answers).length === 54) {
      const initial = mapGroupToScore(step1Answers);
      setStep2Answers(initial);
    }
  }, [step1Answers, step2Answers, setStep2Answers]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    setStep2Answers((prev) =>
      prev.map((item) =>
        item.id.toString() === draggableId
          ? { ...item, score: parseInt(destination.droppableId) }
          : item
      )
    );
  };

  const handleNext = async () => {
    if (!phoneNumber.trim() || !childName.trim() || !childBirthDate.trim()) {
      alert(
        "휴대전화, 영아 이름, 영아 생년월일 중 유효하지 않은 항목이 있습니다. 새로고침 또는 뒤로가기로 인한 오류일 수 있습니다. 다시 시도해주세요."
      );
      return;
    }

    const isValid = [...Array(9)].every(
      (_, i) => step2Answers.filter((item) => item.score === i + 1).length === 6
    );

    if (!isValid) {
      alert("각 점수(1~9)별로 6개의 문항을 배분해주세요.");
      return;
    }

    const surveyDate = new Date().toISOString().split("T")[0];

    const finalResult = {
      phoneNumber,
      childName,
      childBirthDate,
      surveyDate,
      answers: step2Answers,
    };

    console.log("최종 제출 데이터:", finalResult);

    if (!sentResult) {
      setSentResult(true);
    } else {
      alert("설문 응답은 한 번만 제출할 수 있습니다.");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        redirect: "follow",
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(finalResult),
      });

      const data = await response.json();

      if (data.result === "success") {
        alert("설문 응답이 성공적으로 제출되었습니다.");
      } else {
        setSentResult(false);
        alert("서버 오류: " + data.message);
      }
    } catch (error) {
      setSentResult(false);
      alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
      console.error("Submit error: ", error);
    }
  };

  return (
    <div className="step-wrapper">
      <div className="step-scroll-wrapper">
        <TitleText />

        <>
          <span className="step-main-description step2-description">
            2단계는 1단계에서 분류한 ‘상’ , ‘중’ , ‘하’ 그룹의 각 문항을
            점수별로 분류하는 과정이며, 방법은 아래와 같습니다.
          </span>
          <span className="step-sub-description step2-description">
            1. 그룹별로 배분한 18개 문항을 하나씩 읽고, 해당 영아의 행동에
            배분된 문항들은 각각 일치할수록 높은 점수에 다시 배분합니다. ‘상’,
            ‘중’, ‘하’ 그룹에 배분된 문항들은 각각 7~9점, 4~6점, 1~3점 구간에
            대응되지만, 반드시 고정된 것은 아니며 상황에 맞게 다른 점수에
            배분하여도 무방합니다.
          </span>
          <span className="step-sub-description sub-bold step2-description">
            2. 문항은 1점부터 9점까지의 점수로 분류되며, 최종적으로 각 그룹에는
            6개의 문항이 배분되어야 합니다. 문항 분류 시 현재 점수별 선택 개수를
            아래쪽에서 확인 가능하오니, 참조하여 주시기 바랍니다.
          </span>
          <span className="step-sub-description step2-description">
            3. 각 문항을 클릭하여 원하는 점수 칸으로 드래그한 뒤, 놓으면 점수가
            결정됩니다. 필요하다면 다시 드래그하여 다른 점수 칸으로 옮기는 것도
            가능합니다.
          </span>
          <span className="step-sub-description step2-description">
            4. 모든 문항을 분류한 후, ‘설문응답 전송’을 누르시면 조사가
            완료됩니다.
          </span>
          <span className="step-sub-description step2-warning">
            ※ 본 설문은 가로로 넓은 화면 구성을 필요로 합니다. 모바일 기기나
            태블릿에서는 화면이 잘릴 수 있으니, PC를 사용해 참여해주시면
            감사하겠습니다.
          </span>
        </>

        <div className="step2-rating-options">
          <div
            className="step2-rating-button"
            style={{ backgroundColor: "var(--low-navy)", width: 406 }}
          >
            하
          </div>
          <div
            className="step2-rating-button"
            style={{ backgroundColor: "var(--medium-navy)", width: 406 }}
          >
            중
          </div>
          <div
            className="step2-rating-button"
            style={{ backgroundColor: "var(--high-navy)", width: 406 }}
          >
            상
          </div>
        </div>
        <div className="step2-rating-options" style={{ marginTop: 5 }}>
          {[
            {
              label: "1",
              description: "많이 일치하지 않거나\n가장 설명하기 어렵다",
            },
            { label: "2", description: "꽤 일치하지 않거나\n설명하기 어렵다" },
            {
              label: "3",
              description: "비교적 일치하지 않거나\n설명하기 어려운 편이다",
            },
            {
              label: "4",
              description: "다소 일치하지 않거나\n특징적이지 않다",
            },
            { label: "5", description: "비교적 일치하거나\n일부만 특징적이다" },
            { label: "6", description: "다소 일치하거나\n특징적이다" },
            { label: "7", description: "보통 일치하거나\n특징적인 편이다" },
            { label: "8", description: "꽤 일치하거나\n특징적이다." },
            { label: "9", description: "많이 일치하거나\n가장 특징적이다" },
          ].map((item, idx) => {
            let colorClass = "";
            if (idx < 3) colorClass = "low-navy";
            else if (idx < 6) colorClass = "medium-navy";
            else colorClass = "high-navy";
            return (
              <div key={item.label} className="step2-rating-item">
                <div
                  className="step2-rating-button"
                  style={{ backgroundColor: `var(--${colorClass})` }}
                >
                  {item.label}
                </div>
                <div
                  className="step2-rating-description"
                  style={{ color: `var(--${colorClass})` }}
                >
                  {item.description}
                </div>
              </div>
            );
          })}
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div style={{ display: "flex", flexDirection: "row", gap: 8 }}>
            {[...Array(9)].map((_, scoreIdx) => (
              <Droppable
                key={scoreIdx}
                droppableId={(scoreIdx + 1).toString()}
                direction="vertical"
                isDropDisabled={false}
                isCombineEnabled={false}
                ignoreContainerClipping={false}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="droppable-wrapper"
                  >
                    {step2Answers
                      .filter((item) => item.score === scoreIdx + 1)
                      .sort(
                        (a, b) =>
                          step2Answers.findIndex((x) => x.id === a.id) -
                          step2Answers.findIndex((x) => x.id === b.id)
                      )
                      .map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <DragQuestion
                              provided={provided}
                              questionId={item.id}
                              score={item.score}
                            />
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>

        <NextButton onClick={handleNext} text="설문조사 완료" />
      </div>

      <div className="bottom-fixed-wrapper">
        <span className="group-description-text">
          1~9 번호별로 6개의 문항이 배분되어야 합니다.
        </span>
        <div className="group-remaining" style={{ width: 575 }}>
          {[...Array(9)].map((_, i) => (
            <span key={i + 1} className="group-remaining-text">
              {i + 1} :{" "}
              {step2Answers.filter((item) => item.score === i + 1).length}개
              {i < 8 && <>&nbsp;&nbsp;/&nbsp;&nbsp;</>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step2Page;
