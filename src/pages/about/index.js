import Head from "next/head";

import About from "@/components/About/About";

const AboutPage = (props) => {
  return (
    <>
      <Head>
        <title>Neemran | About</title>
      </Head>
      <About />
    </>
  );
};

export default AboutPage;
