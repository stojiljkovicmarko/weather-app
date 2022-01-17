import { useSelector } from "react-redux";

import classes from "./AirPollution.module.css";

const aqiScale = (number) => {
  if (number <= 50) {
    return {
      level: "Good",
      description:
        "Air quality is considered satisfactory, and air pollution poses little or no risk",
    };
  } else if (number > 50 && number <= 100) {
    return {
      level: "Moderate",
      description:
        "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.",
    };
  } else if (number > 100 && number <= 150) {
    return {
      level: "Unhealthy for Sensitive Groups",
      description:
        "Members of sensitive groups may experience health effects. The general public is not likely to be affected.",
    };
  } else if (number > 150 && number <= 200) {
    return {
      level: "Unhealthy",
      description:
        "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects",
    };
  } else if (number > 200 && number <= 300) {
    return {
      level: "Very Unhealthy",
      description:
        "Health warnings of emergency conditions. The entire population is more likely to be affected.",
    };
  } else {
    return {
      level: "Hazardous",
      description:
        "Health alert: everyone may experience more serious health effects",
    };
  }
};

const AirPollution = () => {
  const airPollutionData = useSelector((state) => state.airPollutionData);
  const aqiInfo = aqiScale(airPollutionData.data.aqi);
  console.log(airPollutionData);

  return (
    <section>
      <div className={`${classes.aqi} ${classes.cb2}`}>
        {/* WHEN CLICKED TO REDIRECT https://waqi.info/ */}
        <div>
          <p>{airPollutionData.data.aqi}</p>
          <p>Air quality index: {aqiInfo.level}</p>
          <p>Description: {aqiInfo.description}</p>
        </div>
      </div>
    </section>
  );
};

export default AirPollution;
