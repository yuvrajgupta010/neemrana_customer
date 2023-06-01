// glodal style sheet
import "../styles/globals.css";

// package import
import Head from "next/head";

// component import
import Layout from "../components/Layout/Layout";
import AllCtx from "@/ctxStore/store";

function MyApp({ Component, pageProps }) {
  return (
    <AllCtx>
      <Layout>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="Description"
            content="Neemrana Hotels offers heritage hotels in India with authentic experiences in handcrafted properties. Check out our 20 beautiful properties here!"
          />
        </Head>
        <main>
          <Component {...pageProps} />
        </main>
      </Layout>
    </AllCtx>
  );
}

export default MyApp;
