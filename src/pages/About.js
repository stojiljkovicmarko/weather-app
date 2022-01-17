import classes from "./About.module.css";

const About = (props) => {
  return (
    <div className={classes.about}>
      <h2 className={classes.title}>About the Weather app project</h2>
      <p>
        This page is using 3 APIs:
        <br /> 1.{"  "}
        <a href="https://openweathermap.org" target="_blank" rel="noreferrer">
          Open Weather API
        </a> - for weather data {" "}
        <br /> 2.{"  "}
        <a href="https://opencagedata.com" target="_blank" rel="noreferrer">
          OpenCage Geocoding API
        </a> - for data about the place based on coordinates and vice versa{" "}
        <br /> 3.{"  "}
        <a href="https://aqicn.org/api" target="_blank" rel="noreferrer">
          Air Quality Programmatic API
        </a>- for air pollution data{" "}
      </p>
      <p>
        We implemented Redux for state management, even though it's fairly
        straight-forward. Also, there is a simple routing. Gotta, practise it
        somewhere. :) <br />
        Web site is responsive, CSS only.
      </p>
    </div>
  );
};

export default About;
