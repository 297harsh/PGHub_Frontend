import {Hero,Featured,About,Value,Contact} from "../../../components"

// Home Page of Website
const Home = () => {
  return (
    <div className="App">
      <div>
        <div className="white-gradient" />
        <Hero />
      </div>
      <Featured />
      <About/>
      <Value />
      <Contact />
    </div>
  );
};

export default Home;
