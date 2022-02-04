import Layout from "../Layout";
import Lottie from "react-lottie-player";
import error from "../../utils/error";
import Error500 from "../../utils/error500";
import Link from "next/link";
export default function Error({ errorCode }) {
  return (
    <Layout>
      <div className="error">
        <Lottie
          loop
          animationData={errorCode === 500 ? Error500 : error}
          play
          style={{ width: 350, height: 350 }}
        />
        <Link href="/">
          <a>Ir a la página principal</a>
        </Link>
      </div>
    </Layout>
  );
}

error.defaultProps = {
  errorCode: 400,
};
