import Layout from "../components/Layout";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useTrivia } from "../context/TriviaContext";
export default function Home() {
  const { results, getResults } = useTrivia();
  const router = useRouter();

  useEffect(() => {
    getResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(results);
  return (
    <Layout>
      <div className="home">
        <h1>Welcome to the Trivia Challenge!</h1>
        <p> You will be presented with 10 True or False questions. </p>
        <p> Can you score 100%? </p>
        <div className="home--actions">
          <button onClick={() => router.push("/quizSWR")}>BEGIN (SWR)</button>
          <button onClick={() => router.push("/quizSSR")}>BEGIN (SSR)</button>
          <button onClick={() => router.push("/quizSSG")}>BEGIN (SSG)</button>
        </div>
        {results.length != 0 && (
          <div className="home--results">
            <h2>Latest results</h2>
            <span>Correct answers: {results.correctAnswers}</span>
            <span>Incorrect answers: {results.incorrectAnswers}</span>
          </div>
        )}
      </div>
    </Layout>
  );
}
