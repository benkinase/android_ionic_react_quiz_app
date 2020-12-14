import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
//local imports
import { logoutUser } from "../redux/firebaseRequests";
import { resetUserState } from "../redux/Actions";
import QuestionCard from "../components/QuestionCard";
import { QuestionsState } from "../components/APICall";
import { fetchQuizQuestions, Difficulty } from "../components/APICall";
import "./Home.css";
import { toast } from "../toast";
import Summary from "../components/Summary";
import QuitQuiz from "../components/QuitQuiz";
import StartQuiz from "../components/StartQuiz";
import { generateColoredLetter } from "../utils/coloredLetters";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

let numQuestions: Array<any> = [5, 10, 25, 50, 75, 100];

const Home: React.FC = () => {
  // redux
  const { user } = useSelector((state: any) => state.auth);
  const username = user.email?.split("@")[0];
  // Home states
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState<number>(0);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [level, setLevel] = useState("");
  const [gameOver, setGameOver] = useState<boolean>(true);

  // redux
  const dispatch = useDispatch();
  const history = useHistory();

  // handle logout
  const logout = async () => {
    await logoutUser();
    dispatch(resetUserState());
    history.push("/login");
    toast("Logout successful", "success");
  };

  // start Quiz func
  const startIconic = async () => {
    if (!totalQuestions || !level) {
      return false;
    }
    setLoading(true);
    setGameOver(false);

    // make API fetch request
    const newQuestions = await fetchQuizQuestions(totalQuestions, level);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  // check user answer
  const checkAnswer = (e: any) => {
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore((prev: any) => prev + 1);
      // Save the answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev: any) => [...prev, answerObject]);
    }
  };
  // next question
  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQ = number + 1;

    if (nextQ === totalQuestions) {
      setGameOver(true);
      setTotalQuestions(0);
      setLevel("");
    } else {
      setNumber(nextQ);
    }
  };

  // quit quiz func
  const quitQuiz = () => {
    setGameOver(true);
    setTotalQuestions(0);
    setUserAnswers([]);
    setLevel("");
    window.location.reload(false);
  };

  // start component
  const showStart = (
    <StartQuiz
      start={startIconic}
      Difficulty={Difficulty}
      numQuestions={numQuestions}
      setLevel={setLevel}
      setTotalQuestions={setTotalQuestions}
      level={level}
      totalQuestions={totalQuestions}
    />
  );

  // summary component
  const showSummary = <Summary goToHome={quitQuiz} userAnswers={userAnswers} />;
  // show quit button and score board JSX
  const showQuit = <QuitQuiz quitQuiz={quitQuiz} score={score} />;

  // next button JSX
  const callNextQ = () => {
    setTimeout(() => {
      nextQuestion();
    }, 500);
  };

  //colored letters
  generateColoredLetter(".user");
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="ion-head">
            <IonTitle>
              <b className="user">Welcome,</b> {username}
            </IonTitle>
            <IonButton className="logout-btn" onClick={() => logout()}>
              SignOut
            </IonButton>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="home">
          {loading && <p>Loading Questions...</p>}

          {number === totalQuestions - 1 ? showSummary : null}

          {gameOver && showStart}

          {!gameOver && number !== totalQuestions - 1 ? showQuit : null}

          {!loading && !gameOver && number !== totalQuestions - 1 ? (
            <QuestionCard
              questionNr={number + 1}
              totalQuestions={totalQuestions}
              question={questions[number].question}
              answers={questions[number].answers}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
            />
          ) : null}
          {!gameOver &&
            !loading &&
            userAnswers.length === number + 1 &&
            number !== totalQuestions - 1 &&
            callNextQ()}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
