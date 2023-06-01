import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useContext } from "react";

import classes from "./Header.module.css";

import AuthCtx from "@/ctxStore/authCtx";

const Header = (props) => {
  const { isAuthenticated, onSuccessfullLogout } = useContext(AuthCtx);

  const router = useRouter();
  const url = router.pathname;

  return (
    <header className={classes.header}>
      <div className={classes.image_container}>
        <Image
          src="/images/logo.png"
          alt="Logo of hotel"
          className={classes.img}
          fill
          priority={true}
        />
      </div>
      <nav className={classes.nav}>
        <ul className={classes.links}>
          <li>
            <Link
              href={"/"}
              className={`${classes.link} ${
                url === "/" ? classes["active"] : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href={"/bookroom"}
              className={`${classes.link} ${
                url === "/bookroom" ? classes["active"] : ""
              }`}
            >
              Book Room
            </Link>
          </li>
          <li>
            <Link
              href={"/reception"}
              className={`${classes.link} ${
                url === "/reception" ? classes["active"] : ""
              }`}
            >
              Reception
            </Link>
          </li>
          <li>
            <Link
              href={"/about"}
              className={`${classes.link} ${
                url === "/about" ? classes["active"] : ""
              }`}
            >
              About
            </Link>
          </li>
          {isAuthenticated ? (
            <li>
              <Link
                href={"/dashboard"}
                className={`${classes.link} ${
                  url === "/dashboard" ? classes["active"] : ""
                }`}
              >
                Dashboard
              </Link>
            </li>
          ) : (
            ""
          )}
          {!isAuthenticated ? (
            <li>
              <Link
                href={"/login"}
                className={`${classes.link} ${
                  url === "/login" ? classes["active"] : ""
                }`}
              >
                Login
              </Link>
            </li>
          ) : (
            ""
          )}
          {isAuthenticated ? (
            <li>
              <button
                onClick={onSuccessfullLogout}
                className={`${classes.link}`}
              >
                Logout
              </button>
            </li>
          ) : (
            ""
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
