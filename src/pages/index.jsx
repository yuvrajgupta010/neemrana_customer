import Head from "next/head";

import Home from "../components/Home/Home";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>Welcome to Neemrana Hotels</title>
      </Head>
      <Home />
    </>
  );
};

export default HomePage;
