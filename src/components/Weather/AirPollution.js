import { useState } from "react";
import { useSelector } from "react-redux";

import classes from "./AirPollution.module.css";

const aqiScale = (number) => {
  if (number <= 50) {
    return {
      class: "good",
      level: "Good",
      description:
        "Air quality is considered satisfactory, and air pollution poses little or no risk",
    };
  } else if (number > 50 && number <= 100) {
    return {
      class: "moderate",
      level: "Moderate",
      description:
        "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.",
    };
  } else if (number > 100 && number <= 150) {
    return {
      class: "unhealthy1",
      level: "Unhealthy for Sensitive Groups",
      description:
        "Members of sensitive groups may experience health effects. The general public is not likely to be affected.",
    };
  } else if (number > 150 && number <= 200) {
    return {
      class: "unhealthy2",
      level: "Unhealthy",
      description:
        "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects",
    };
  } else if (number > 200 && number <= 300) {
    return {
      class: "unhealthy3",
      level: "Very Unhealthy",
      description:
        "Health warnings of emergency conditions. The entire population is more likely to be affected.",
    };
  } else {
    return {
      class: "hazardous",
      level: "Hazardous",
      description:
        "Health alert: everyone may experience more serious health effects",
    };
  }
};

const AirPollution = () => {
  const [isVisible, setIsVisible] = useState(false);
  const airPollutionData = useSelector((state) => state.airPollutionData);
  const aqiInfo = aqiScale(airPollutionData.data.aqi);
  console.log(airPollutionData);

  const expandMoreData = () => {
    setIsVisible(!isVisible);
  };

  return (
    <section>
      <div className={`${classes.aqi} ${classes.cb2}`}>
        {/* WHEN CLICKED TO REDIRECT https://waqi.info/ */}
        <div className={classes["aqi-info"]}>
          <div className={`${classes["aqi-number"]} ${classes[aqiInfo.class]}`}>
            <p>{airPollutionData.data.aqi}</p>
          </div>
          <div className={classes["aqi-desc"]}>
            <p>{aqiInfo.level}</p>
            <p>Description: {aqiInfo.description}</p>
          </div>
        </div>
        <div className={classes["more-data-expand"]}>
          <p>All pollutants</p>
          <button onClick={expandMoreData}>
            {isVisible ? "SHRINK" : "EXPAND"}
          </button>
        </div>
        <div
          className={`${classes["more-data"]} ${
            classes[isVisible ? "visible" : "hidden"]
          }`}
        >
          <p>PM2.5 &#9660; {airPollutionData.data.iaqi.pm25.v}</p>
          <p>NO2 (Nitrogen Dioxide) {airPollutionData.data.iaqi.no2.v}</p>
          <p>O3 (Ozone) {airPollutionData.data.iaqi.o3.v}</p>
          <p>SO2 (Sulfur Oxide) {airPollutionData.data.iaqi.so2.v}</p>
          <p>PM10 {airPollutionData.data.iaqi.pm10.v}</p>
        </div>
      </div>
    </section>
  );
};

export default AirPollution;
