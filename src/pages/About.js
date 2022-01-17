import classes from "./About.module.css";

const About = (props) => {
  return (
    <div className={classes.about}>
      <h2 className={classes.title}>About the Weather app project</h2>
      <p>
        This page is using 2 APIs:
        <br /> 1.{"  "}
        <a href="https://openweathermap.org" target="_blank" rel="noreferrer">
          Open Weather API
        </a>{" "}
        <br /> 2.{"  "}
        <a href="https://opencagedata.com" target="_blank" rel="noreferrer">
          OpenCage Geocoding API
        </a>{" "}
        <br /> 3.{"  "}
        <a href="https://aqicn.org/api" target="_blank" rel="noreferrer">
          Air Quality Programmatic API
        </a>{" "}
      </p>
      <p>
        We implemented Redux for state management, even though it's fairly
        straight-forward. Also, there is a simple routing. Gotta, practise it
        somewhere. :)
      </p>
    </div>
  );
};

export default About;
