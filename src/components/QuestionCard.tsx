import React from "react";
import { ButtonContainer } from "./StyledComponents";
// Types
import { AnswerObject } from "../pages/Home";
import "./QuestionCard.css";

interface ContainerProps {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer?: AnswerObject;
  questionNr: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<ContainerProps> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => {
  return (
    <div className="container">
      <p className="number center">
        Question: {questionNr} / {totalQuestions - 1}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div className="options-buttonContainer">
        {answers.map((answer, i) => (
          <ButtonContainer
            key={i}
            correct={userAnswer?.correctAnswer === answer}
            clicked={userAnswer?.answer === answer}
          >
            <button
              disabled={userAnswer ? true : false}
              value={answer}
              onClick={callback}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </ButtonContainer>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
