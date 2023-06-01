import Head from "next/head";
import Image from "next/image";

import classes from "./About.module.css";

const About = (props) => {
  return (
    <>
      <section className={classes.section}>
        <div className={classes.grid}>
          <div className={classes.flex}>
            <div className={classes.image_container}>
              <Image
                src="/images/people/ceo.jpg"
                alt="Hotel view"
                className={classes.img}
                fill
                priority={true}
              />
            </div>
            <blockquote>Mr. Shinchan, Managing Director</blockquote>
          </div>
          <div className={classes.blog}>
            <h3 className={classes.secondary_heading}>
              <span>Our Goals</span>
            </h3>
            <p className={classes.p}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Architecto incidunt minus natus quos nam iusto corrupti non
              consequuntur. Suscipit illo deleniti eligendi magnam dolor placeat
              molestias excepturi odio corporis unde!
            </p>
          </div>
        </div>
        <div className={classes.grid}>
          <div className={classes.flex}>
            <div className={classes.image_container}>
              <Image
                src="/images/people/chef.jpg"
                alt="Hotel view"
                className={classes.img}
                fill
                priority={true}
              />
            </div>
            <blockquote>Mr. Doremon ,Chief of Chefs</blockquote>
          </div>
          <div className={classes.blog}>
            <h3 className={classes.secondary_heading}>
              <span>Taste of Love</span>
            </h3>
            <p className={classes.p}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Architecto incidunt minus natus quos nam iusto corrupti non
              consequuntur. Suscipit illo deleniti eligendi magnam dolor placeat
              molestias excepturi odio corporis unde!
            </p>
          </div>
        </div>

        <div className={classes.group_image}>
          <Image
            src="/images/people/group.png"
            alt="Hotel view"
            className={classes.img}
            fill
            priority={true}
          />
        </div>
      </section>
    </>
  );
};

export default About;
