import { useSelector } from "react-redux";
import classes from "./Forecast.module.css";

const Forecast = (props) => {
    const weatherData = useSelector(state => state.weatherData);
    const forecastDays = props.forecastDays();


  return (
    <section>
      <div className={`${classes["forecast-card"]} ${classes.cb1}`}>
        {forecastDays.map((day, index) => {
          return (
            <div key={index} className={classes.forecast}>
              <p className={classes.day}>{day}</p>
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.daily[index].weather[0].icon}.png`}
                alt={weatherData.daily[index].weather[0].main}
              />
              <p>
                <span className={classes["temp-min"]}>
                  {Math.round(weatherData.daily[index].temp.min)}&#176;
                </span>{" "}
                / <span className={classes["temp-max"]}>
                {Math.round(weatherData.daily[index].temp.max)}&#176;
                </span>
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Forecast;
