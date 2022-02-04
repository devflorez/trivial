import { createContext, useContext, useReducer } from "react";
import TriviaReducer from "./TriviaReducer";
import {  useRouter } from "next/router";

//Inicializamos el estado de la apliacion
const initialState = {
  questions: [],
  answers: [],
  currentQuestion: 0,
  currentAnswer: 0,
  correctAnswers: 0,
  incorrectAnswers: 0,
  finishQuiz: false,
  results : [],
  isSWR : false,
};

//Creamos el contexto
export const TriviaContext = createContext(initialState);

//Creamos el reducer
export const TriviaProvider = ({ children }) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(TriviaReducer, initialState);
  //Actions de la aplicacion

  //Recibe las preguntas
  const retriveQuestions = (questions) => {
    dispatch({
      type: "RETRIEVE_QUESTIONS",
      payload: questions,
    });
  };
  //Recibe las respuestas del usuario
  const retrieveAnswers = (answer) => {
    dispatch({
      type: "RETRIEVE_ANSWERS",
      payload: answer,
    });
  };

  //Pasa a la siguiente pregunta
  const nextQuestion = (selectAnwser) => {
    const { currentQuestion, finishQuiz } = state;

    if (finishQuiz !== true) {
      isCorrectAnswer(selectAnwser);
      //let nextQuestion = currentQuestion + 1;
      dispatch({
        type: "NEXT_QUESTION",
        payload: (currentQuestion += 1),
      });
    }
  };

  //Pasa a la pregunta anterior
  const previousQuestion = () => {
    const { currentQuestion } = state;
    dispatch({
      type: "PREVIOUS_QUESTION",
      payload: (currentQuestion -= 1),
    });
  };

  //Termina el quiz
  const isFinishQuiz = () => {
    const { questions, currentQuestion } = state;
    if (currentQuestion === questions.length - 1) {
      dispatch({
        type: "FINISH_QUIZ",
        payload: true,
      });
    } else {
      dispatch({
        type: "FINISH_QUIZ",
        payload: false,
      });
    }
  };

  //Is correct
  const isCorrectAnswer = (selectAnwser) => {
    const { currentQuestion, questions, incorrectAnswers, correctAnswers } =
      state;
    const { correct_answer } = questions[currentQuestion];

    if (selectAnwser === correct_answer) {
      retrieveAnswers({ ...questions[currentQuestion], isCorrectAnswer: true });
      dispatch({
        type: "CORRECT_ANSWER",
        payload: (correctAnswers += 1),
      });
    } else {
      retrieveAnswers({
        ...questions[currentQuestion],
        isCorrectAnswer: false,
      });
      dispatch({
        type: "INCORRECT_ANSWER",
        payload: (incorrectAnswers += 1),
      });
    }
  };

  //Guardar resultados en localStorage

  const saveResults = () => {
    const { questions, correctAnswers, incorrectAnswers } = state;
    const results = {
      questions,
      correctAnswers,
      incorrectAnswers,
    };
    localStorage.setItem("results", JSON.stringify(results));
  };

  //recuperar resultados
  const getResults = () => {
    const results = JSON.parse(localStorage.getItem("results"));
    if (results) {
      dispatch({
        type: "RETRIEVE_RESULTS",
        payload: results,
      });
    }
  };

  //Juegar de nuevo
  const playAgain = () => {
    saveResults();
    router.push("/");
    dispatch({
      type: "PLAY_AGAIN",
    });
  };

  return (
    <TriviaContext.Provider
      value={{
        ...state,
        retriveQuestions,
        retrieveAnswers,
        nextQuestion,
        isFinishQuiz,
        playAgain,
        getResults
      }}
    >
      {children}
    </TriviaContext.Provider>
  );
};

//Creamos el hook
export const useTrivia = () => {
  const context = useContext(TriviaContext);
  if (context === undefined) {
    throw new Error("useTrivia must be used within a TriviaProvider");
  }
  return context;
};
