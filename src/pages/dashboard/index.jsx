import Head from "next/head";

import Dashboard from "@/components/Dashboard/Dashboard";

const DashboardPage = (props) => {
  return (
    <>
      <Head>
        <title>Neemrana | User Dashboard</title>
      </Head>
      <Dashboard />
    </>
  );
};

export async function getServerSideProps({ req, res }) {
  const cookies = req.cookies;

  if (cookies.auth === "unverified") {
    console.log(cookies, "unverified");
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  return {
    props: {
      auth: "unverified",
    },
  };
}

export default DashboardPage;
