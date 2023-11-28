import classes from "./hero.module.css";
import Image from "next/image";

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src='/images/site/naruto.png'
          alt='Hero image'
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm someone</h1>
      <p>I am a developer and I love to code.</p>
    </section>
  );
};

export default Hero;
