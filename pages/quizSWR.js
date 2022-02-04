import React, { useEffect } from "react";
import Layout from "../components/Layout";

import { host } from "../utils/constants";
import Loading from "../components/Loading";
import CardQuestion from "../components/CardQuestion";
import { useTrivia } from "../context/TriviaContext";
import useSWRImmutable from "swr/immutable";
import Router from "next/router";
import Error from "../components/Error";
// Esta es la función que obtiene los datos de la API.
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function QuizSWR() {
  const {
    currentQuestion,
    retriveQuestions,
    nextQuestion,
    finishQuiz,
    isFinishQuiz,
  } = useTrivia();
  // Esta es la función que obtiene los datos de la API. Sin reavlidaccion.  Para que el estado de las preguntas no cambie.

  const { data, error } = useSWRImmutable(host, fetcher);
  useEffect(() => {
    if (data) {
      retriveQuestions(data.results);
    }
    finishQuiz;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (error) return <Error />;

  if (!data && !error) return <Loading />;

  const { results } = data;

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
          <h1>QuizSWR</h1>
          <span>
            {currentQuestion + 1}/{results.length}
          </span>
        </header>
        <section className="quiz--question">
          <CardQuestion question={results[currentQuestion]} />
        </section>
        <footer className="quiz--actions">
          <button onClick={() => handleNextQuestion("True")}>True</button>
          <button onClick={() => handleNextQuestion("False")}>False</button>
        </footer>
      </div>
    </Layout>
  );
}
