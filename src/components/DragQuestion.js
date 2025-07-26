import questions from "../data/questions";
import "../styles/styles.css";

const DragQuestion = ({ provided, questionId, score }) => {
  const question = questions.find((q) => q.id === questionId);

  const navyColorVar =
    score <= 3 ? "--low-navy" : score <= 6 ? "--medium-navy" : "--high-navy";

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="drag-question-wrapper"
    >
      <div
        className="drag-question-text"
        style={{ backgroundColor: `var(${navyColorVar})` }}
      >
        <span style={{ fontWeight: 600, fontSize: 14, marginBottom: 3 }}>
          {question.id}.{"\n"}
        </span>
        {question.text}
      </div>
    </div>
  );
};

export default DragQuestion;
