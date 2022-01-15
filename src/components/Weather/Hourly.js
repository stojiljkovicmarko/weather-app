import { useSelector } from "react-redux";

import drop from "../../assets/pop_drop.png";
import classes from "./Hourly.module.css";

const Hourly = (props) => {
  const weatherData = useSelector((state) => state.weatherData);
  const nextHours = props.getNextHours();


  return (
    <section>
      <div className={`${classes["hourly-card"]} ${classes.cb2}`}>
        {nextHours.map((hour, index) => {
          return (
            <div key={index} className={classes.hourly}>
              <p className={classes.hour}>{`${hour}:00`}</p>
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.hourly[index].weather[0].icon}.png`}
                alt={weatherData.hourly[index].weather[0].main}
              />
              <p className={classes["temp-hour"]}>
                  {Math.round(weatherData.hourly[index].temp)}&#176;
              </p>
              <p className={classes["temp-pop"]}>
                <img src={drop} alt="Precipitation drop" />
                  {Math.round(weatherData.hourly[index].pop)}%
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Hourly;
