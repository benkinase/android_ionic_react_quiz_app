import React, { useState } from "react";
import { IonButton } from "@ionic/react";
import "./Summary.css";

type SummaryProps = {
  userAnswers: Array<any>;
  score: number;
  tQ: number;
  goToHome(): any; // no argument
};

const Summary: React.FC<SummaryProps> = ({
  userAnswers,
  tQ,
  score,
  goToHome,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleQuit = () => {
    setIsOpen(false);
    goToHome();
  };

  return (
    <div className="summary">
      {userAnswers.map((item) => {
        return (
          isOpen && (
            <div className="summary-content">
              <div className="question">
                <b>Question: </b>
                {item.question}
              </div>
              <div className="your-answer">
                <b>You: </b>
                {item.answer}
              </div>
              <div
                className={item.correctAnswer === item.answer ? "yes" : "no"}
              >
                <b>Correct?: </b>
                {item.correctAnswer === item.answer ? "Yes" : "No"}
              </div>
              {item.correctAnswer !== item.answer && (
                <div className="correct-answer">
                  <b>Correct Answer: </b> {item.correctAnswer}
                </div>
              )}
            </div>
          )
        );
      })}
      <div className="summary-btns">
        {!isOpen && (
          <>
            <IonButton className="score-modal-btn">
              Score: {score}/{tQ - 1}
            </IonButton>
            <IonButton className="summary-btn" onClick={() => setIsOpen(true)}>
              See Summary
            </IonButton>
          </>
        )}
        <IonButton className="closs-modal-btn" onClick={handleQuit}>
          End Quiz
        </IonButton>
      </div>
    </div>
  );
};

export default Summary;
