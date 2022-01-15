import { useSelector } from "react-redux";

import classes from "./CurrentWeather.module.css";

const CurrentWeather = (props) => {
  const weatherData = useSelector((state) => state.weatherData);
  const location = useSelector((state) => state.location);

  const { today, month, day } = props.date;

  return (
    <section>
      <div className={`${classes["current-day"]} ${classes.cb2}` }>
        <div className={classes.location}>
          <p className={classes.city}>
            {location.city}, {location.country}
          </p>
          <p className={classes.date}>{`${today}, ${month} ${day}`}</p>
        </div>
        <div className={classes.temperature}>
          <div className={classes["current-temperature"]}>
            <div>
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}.png`}
                alt={weatherData.current.weather[0].main}
              />
              <p className={classes.currTemp}>
                {Math.round(weatherData.current.temp)}&#176;C
              </p>
            </div>
            <p className={classes["feels-like"]}>
              <span>
                Feels like: {Math.round(weatherData.current.feels_like)}
                &#176;C
              </span>
            </p>
          </div>
          <div className={classes["more-data"]}>
            <p>
              {props.capitalizeFirstLetter(
                weatherData.current.weather[0].description
              )}
            </p>
            <p>Humidity: {weatherData.current.humidity}%</p>
            <p>Wind: {Math.round(weatherData.current.wind_speed)}km/h</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentWeather;
