import "./Hero.css";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import HomeSearchBar from "../HomeSearchBar/HomeSearchBar";
import heroImage from "../../assets/Home/hero-image.jpg"

const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">
        {/* left side */}
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <div className="orange-circle" />
            <motion.h1
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 2,
                type: "ease-in",
              }}
            >
              Discover <br />
              Your Ideal
              <br /> Place
            </motion.h1>
          </div>
          <div className="flexColStart secondaryText flexhero-des">
            <span>Find variety of PG options which suits you very easily</span>
            <span>Forget all difficulties in finding an efficient PG for you</span>
          </div>

          <HomeSearchBar />

          <div className="flexCenter stats">
            <div className="flexColCenter stat">
              <span>
                <CountUp start={0} end={9000} duration={4} /> <span>+</span>
              </span>
              <span className="secondaryText">City</span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp start={1950} end={2000} duration={4} /> <span>+</span>
              </span>
              <span className="secondaryText">Customer</span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp end={28} /> <span>+</span>
              </span>
              <span className="secondaryText">PG</span>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="flexCenter hero-right">
          <motion.div
            initial={{ x: "7rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 2,
              type: "ease-in",
            }}
            className="image-container"
          >
            <img src={heroImage} alt="houses" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

