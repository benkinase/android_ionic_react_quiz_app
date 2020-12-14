import React from "react";
import styled from "styled-components";
import { IonButton } from "@ionic/react";
type QuitProps = {
  score: number;
  quitQuiz: () => void; // no argument, return no
};

const QuitQuiz: React.FC<QuitProps> = ({ score, quitQuiz }) => {
  return (
    <ContainerQuit>
      <div className="quit-score-container">
        <div className="quit-board">
          <IonButton size="large" className="quit-btn" onClick={quitQuiz}>
            Quit QUIZ ?
          </IonButton>
        </div>
        <div className="score-board ">
          <IonButton className="score-btn">Score: {score}</IonButton>
        </div>
      </div>
    </ContainerQuit>
  );
};
export default QuitQuiz;

const ContainerQuit = styled.div``;
