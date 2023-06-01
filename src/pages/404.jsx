import { useRouter } from "next/router";

import classes from "../styles/404.module.css";

import Error from "@/components/UI/Status/Status";

const PageNotFound = (props) => {
  const history = useRouter();

  const goToHomeHandler = () => {
    history.push("/");
  };

  return (
    <section className={classes.section}>
      <Error message={"Page not Found!"} title={"Page not Found!"} />
      <button className={classes.button} onClick={goToHomeHandler}>
        Go to Home!
      </button>
    </section>
  );
};

export default PageNotFound;
