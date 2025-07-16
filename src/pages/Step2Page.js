import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import TitleText from "../components/TitleText";
import NextButton from "../components/NextButton";
import testAnswers from "../data/testAnswers";
import "../styles/styles.css";
import DragQuestion from "../components/DragQuestion";

const mapGroupToScore = (groupedAnswers) => {
  const entries = Object.entries(groupedAnswers).map(([key, value]) => ({
    id: parseInt(key),
    group: value,
  }));

  const result = [];

  [
    { key: "하", base: 1 },
    { key: "중", base: 4 },
    { key: "상", base: 7 },
  ].forEach(({ key, base }) => {
    entries
      .filter((item) => item.group === key)
      .forEach((item, idx) => {
        const score = base + Math.floor(idx / 6);
        result.push({ id: item.id, score });
      });
  });
  return result;
};

const Step2Page = () => {
  // const location = useLocation();
  // const initialAnswers = mapGroupToScore(
  //   location.state?.answers
  // );
  const initialAnswers = mapGroupToScore(testAnswers);

  const [answers, setAnswers] = useState(initialAnswers);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    setAnswers((prev) =>
      prev.map((item) =>
        item.id.toString() === draggableId
          ? { ...item, score: parseInt(destination.droppableId) }
          : item
      )
    );
  };

  const handleNext = () => {
    // End Survey
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
            작은 태블릿에서는 화면이 잘릴 수 있기에, 가급적 가로로 긴 PC
            화면이나 큰 화면의 태블릿을 사용해주시면 감사하겠습니다.
          </span>
        </>

        <div className="step2-rating-options">
          <div
            className="step2-rating-button"
            style={{ backgroundColor: "var(--low-navy)", width: 475 }}
          >
            하
          </div>
          <div
            className="step2-rating-button"
            style={{ backgroundColor: "var(--medium-navy)", width: 475 }}
          >
            중
          </div>
          <div
            className="step2-rating-button"
            style={{ backgroundColor: "var(--high-navy)", width: 475 }}
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
                    {answers
                      .filter((item) => item.score === scoreIdx + 1)
                      .sort(
                        (a, b) =>
                          answers.findIndex((x) => x.id === a.id) -
                          answers.findIndex((x) => x.id === b.id)
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

        <div className="divide-line" />

        <NextButton onClick={handleNext} text="설문조사 완료" />
      </div>

      <div className="bottom-fixed-wrapper">
        <span className="group-description-text">
          1~9 번호별로 6개의 문항이 배분되어야 합니다.
        </span>
        <div className="group-remaining" style={{ width: 575 }}>
          {[...Array(9)].map((_, i) => (
            <span key={i + 1} className="group-remaining-text">
              {i + 1} : {answers.filter((item) => item.score === i + 1).length}
              개{i < 8 && <>&nbsp;&nbsp;/&nbsp;&nbsp;</>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step2Page;
