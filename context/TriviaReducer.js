
// Este es el reduccer que maneja todo el estado de la apliacion con una determinada accion que lellega
export default function TriviaReducer(state, action) {
  switch (action.type) {
    case "RETRIEVE_QUESTIONS":
      return {
        ...state,
        questions: action.payload,
      };
    case "RETRIEVE_ANSWERS":
      return {
        ...state,
        answers: [...state.answers, action.payload],
      };

    case "NEXT_QUESTION":
      return {
        ...state,
        currentQuestion: action.payload,
      };
    case "PREVIOUS_QUESTION":
      return {
        ...state,
        currentQuestion: action.payload,
      };
    case "FINISH_QUIZ":
      return {
        ...state,
        finishQuiz: action.payload,
      };
      
    case "CORRECT_ANSWER":
      return {
        ...state,
        correctAnswers: action.payload,
      };

     case "INCORRECT_ANSWER":
      return {
        ...state,
        incorrectAnswers: action.payload,
      };
      case "PLAY_AGAIN":
      return {
        ...state,
        finishQuiz: false,
        currentQuestion: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        answers: [],
      };
      case "RETRIEVE_RESULTS":
      return {
        ...state,
        results: action.payload,
      };
    default:
      return state;
  }
}
