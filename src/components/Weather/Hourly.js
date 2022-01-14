import { useSelector } from "react-redux";
import classes from "./Weather.module.css";

const Hourly = () => {
  const weatherData = useSelector((state) => state.weatherData);

  const forecastDays = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    
  ];

  return (
    <section>
      <div className={classes["forecast-card"]}>
        {forecastDays.map((day, index) => {
          return (
            <div key={index} className={classes.forecast}>
              <p className={classes.day}>{day}</p>
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.hourly[index].weather[0].icon}.png`}
                alt={weatherData.hourly[index].weather[0].main}
              />
              <p>
                <span className={classes["temp-min"]}>
                  {Math.round(weatherData.hourly[index].temp)}&#176;
                </span>
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Hourly;
