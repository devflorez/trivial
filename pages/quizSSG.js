import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { host } from "../utils/constants";
import CardQuestion from "../components/CardQuestion";
import { useTrivia } from "../context/TriviaContext";
import Router from "next/router";
import Loading from "../components/Loading";
export default function QuizSSG({ questions }) {
  const {
    currentQuestion,
    retriveQuestions,
    nextQuestion,
    finishQuiz,
    isFinishQuiz,
  } = useTrivia();

  useEffect(() => {
    retriveQuestions(questions);
    finishQuiz;
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  if (finishQuiz) {
    Router.replace("/result");
    return <Loading />;
  }

  const handleNextQuestion = (selectAnwser) => {
    nextQuestion(selectAnwser);
    isFinishQuiz();
  };

  return (
    <Layout>
      <div className="quiz">
        <header className="quiz--header">
          <h1>QuizSSG</h1>
          <span>
            {currentQuestion + 1}/{questions.length}
          </span>
        </header>
        <section className="quiz--question">
          <CardQuestion question={questions[currentQuestion]} />
        </section>
        <footer className="quiz--actions">
          <button onClick={() => handleNextQuestion("True")}>True</button>
          <button onClick={() => handleNextQuestion("False")}>False</button>
        </footer>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(host);
  const data = await res.json();
  const questions = data.results;
  return {
    props: {
      questions,
    },
  };
}