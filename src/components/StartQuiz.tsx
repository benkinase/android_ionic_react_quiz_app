import React from "react";
import {
  IonButton,
  IonItem,
  IonSelectOption,
  IonSelect,
  IonLabel,
} from "@ionic/react";

type setLevelFunctionType = (level: string) => any; //string argument
interface StartProps {
  start: () => void;
  Difficulty: Array<string>;
  numQuestions: Array<number>;
  setLevel: setLevelFunctionType; // type declared above
  setTotalQuestions: (totalQuestions: number) => any; // number argument
  level: string;
  totalQuestions: number;
}

const StartQuiz: React.FC<StartProps> = ({
  start,
  Difficulty,
  numQuestions,
  totalQuestions,
  setLevel,
  setTotalQuestions,
  level,
}) => {
  const options = {
    cssClass: "my-custom-interface",
  };

  let letters = document.querySelector("#ioniq")?.innerHTML;

  console.log(letters);
  return (
    <div className="start-container">
      <h1 id="ioniq">IconiQ</h1>
      <h4>
        Select questions<span>(n)</span>and level to proceed!
      </h4>
      <div className="ion-flex">
        <IonItem>
          <IonLabel>Questions</IonLabel>
          <IonSelect
            //interface="popover"
            interfaceOptions={options}
            value={totalQuestions}
            onIonChange={(e: any) => setTotalQuestions(e.detail.value)}
          >
            {numQuestions.map((n, i) => {
              return (
                <IonSelectOption value={n + 1} key={i}>
                  {n}
                </IonSelectOption>
              );
            })}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>Level</IonLabel>
          <IonSelect
            interfaceOptions={options}
            value={level}
            onIonChange={(e: any) => setLevel(e.detail.value)}
          >
            {Difficulty.map((n) => {
              return (
                <IonSelectOption value={n} key={n}>
                  {n}
                </IonSelectOption>
              );
            })}
          </IonSelect>
        </IonItem>
        {level && numQuestions ? (
          <IonButton size="large" className="start-btn" onClick={start}>
            {"Start QUIZ"}
          </IonButton>
        ) : null}
      </div>
    </div>
  );
};

export default StartQuiz;
