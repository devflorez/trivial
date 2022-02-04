import "../styles/globals.scss";
import { TriviaProvider } from "../context/TriviaContext";

export default function App({ Component, pageProps }) {
  return (
    <TriviaProvider>
      <Component {...pageProps} />
    </TriviaProvider>
  );
}
