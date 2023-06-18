import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import classes from "./Footer.module.css";

const currentYear = new Date().getFullYear();

const Footer = (props) => {
  const router = useRouter();
  const url = router.pathname;

  const [isActive, stateIsActive] = useState(false);

  return (
    <footer className={classes.footer}>
      <div className={classes.grid}>
        <div className={classes.grid_item_1}>
          <div className={classes.image_container}>
            <Image
              src="/images/logo.png"
              alt="Logo of hotel"
              className={classes.img}
              fill
              priority={true}
            />
          </div>
        </div>
        <address className={classes.grid_item_2}>
          <h3 className={classes.tertiary_heading}>Address</h3>
          <p>
            <span>C-34</span>
            <span>Near Gole Ka Mandir</span>
            <span>Lahar</span>
            <span>District - Bhind</span>
            <span>Madhya Pradesh - 477445</span>
          </p>
        </address>
        <div className={classes.grid_item_3}>
          <h3 className={classes.tertiary_heading}>Contact Info</h3>
          <ul>
            <li>
              <span className={classes.icon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                  />
                </svg>
              </span>
              <span>neeranahotel@bussiness.com</span>
            </li>
            <li>
              <span className={classes.icon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
              </span>
              <span>8842532523</span>
            </li>
          </ul>
        </div>
        <nav className={`${classes.nav} ${classes.grid_item_4}`}>
          <h3 className={classes.tertiary_heading}>Navigation</h3>
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
          </ul>
        </nav>
        <div className={classes.grid_item_5}>
          <p>
            Copyright &#169; {currentYear} by Neemrana Hotels. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
