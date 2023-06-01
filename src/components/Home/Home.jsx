import Image from "next/image";
import classes from "./Home.module.css";

const Home = (props) => {
  return (
    <>
      <div className={classes.image_container}>
        <Image
          src="/images/hotel/view_1.jpg"
          alt="Hotel view"
          className={classes.img}
          fill
          priority={true}
        />
      </div>
      <section className={`${classes.grid} ${classes.section}`}>
        <h2 className={`${classes.secondary_heading} ${classes.grid_item_1}`}>
          <span>Welcome</span>
        </h2>
        <div className={classes.image_container}>
          <Image
            src="/images/hotel/pecock.jpg"
            alt="Hotel view"
            className={classes.img}
            fill
            priority={true}
          />
        </div>
        <article className={classes.article}>
          <h2 className={classes.secondary_heading}>
            <span>Close to Nature</span>
          </h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque
            corporis voluptatem molestiae nobis eaque sequi, optio minus
            asperiores amet sit illo alias recusandae repudiandae, id
            dignissimos deserunt voluptates aperiam esse!
          </p>
        </article>
        <div className={classes.image_container}>
          <Image
            src="/images/hotel/heritage.jpg"
            alt="Hotel view"
            className={classes.img}
            fill
            priority={true}
          />
        </div>
        <article className={classes.article}>
          <h2 className={classes.secondary_heading}>
            <span>Place of Heritage</span>
          </h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque
            corporis voluptatem molestiae nobis eaque sequi, optio minus
            asperiores amet sit illo alias recusandae repudiandae, id
            dignissimos deserunt voluptates aperiam esse!
          </p>
        </article>
        <div className={classes.image_container}>
          <Image
            src="/images/hotel/sitting.jpg"
            alt="Hotel view"
            className={classes.img}
            fill
            priority={true}
          />
        </div>
        <article className={classes.article}>
          <h2 className={classes.secondary_heading}>
            <span>Royal History</span>
          </h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque
            corporis voluptatem molestiae nobis eaque sequi, optio minus
            asperiores amet sit illo alias recusandae repudiandae, id
            dignissimos deserunt voluptates aperiam esse!
          </p>
        </article>
      </section>
    </>
  );
};

export default Home;
