import Layout from "../Layout";
import Lottie from "react-lottie-player";
import Load from "../../utils/load";
export default function Loading() {
  return (
    <Layout>
      <div className="loading">
        <Lottie
          loop
          animationData={Load}
          play
          style={{ width: 350, height: 350 }}
        />
      </div>
    </Layout>
  );
}
