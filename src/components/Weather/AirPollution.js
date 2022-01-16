import { useSelector } from "react-redux";

import classes from "./AirPollution.module.css";

const aqiScale = (number) => {
  if (number <= 50) {
    return "Good";
  } else if (number > 50 && number <= 100) {
    return "Moderate";
  } else if (number > 100 && number <= 150) {
    return "Unhealthy for sensitive groups";
  } else if (number > 150 && number <= 200) {
    return "Unhealthy";
  } else if (number > 200 && number <= 300) {
    return "Very Unhealthy";
  } else {
    return "Hazardous";
  }
};

const AirPollution = () => {
  const airPollutionData = useSelector((state) => state.airPollutionData);

  return (
    <section>
      <div className={`${classes.aqi} ${classes.cb2}`}>
        <p>Air quality index: {airPollutionData.data.aqi}</p>
        <p>Air pollution level: {aqiScale(airPollutionData.data.aqi)}</p>
      </div>
    </section>
  );
};

export default AirPollution;
