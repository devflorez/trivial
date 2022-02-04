import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useTrivia } from "../context/TriviaContext";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
export default function Result() {
  const Router = useRouter();
  const { correctAnswers, playAgain, questions, answers, finishQuiz } =
    useTrivia();
  useEffect(() => {
    // Si no hay realziado el quiz, redirigir a home
    if (!finishQuiz) {
      Router.replace("/");
    }
  }, [finishQuiz]);
  return (
    <Layout>
      <div className="result">
        <header className="result--header">
          <h1>You scored</h1>
          <span>
            {correctAnswers}/ {questions.length}{" "}
          </span>
        </header>
        <section className="result--list">
          <ul>
            {answers.map((answer, index) => (
              <li key={index}>
                <span
                  className={
                    answer.isCorrectAnswer
                      ? "result--list--correct"
                      : "result--list--incorrect"
                  }
                >
                  <Icon
                    icon={
                      answer.isCorrectAnswer
                        ? "akar-icons:check-box-fill"
                        : "ph:x-square-fill"
                    }
                  />
                </span>
                <div
                  className="result--list--question"
                  dangerouslySetInnerHTML={{ __html: answer.question }}
                />
              </li>
            ))}
          </ul>
        </section>
        <footer>
          <button onClick={() => playAgain()}>Play again</button>
        </footer>
      </div>
    </Layout>
  );
}
