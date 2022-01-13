import { useSelector } from "react-redux";

import LoadSpinner from "../Loader/LoadSpinner";
import NotFound from "../Error/NotFound";

import classes from "./Weather.module.css";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.substring(1);
};

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const date = new Date();
const today = days[date.getDay()];
const day = date.getDate();
const month = months[date.getMonth()];

const getForecastDays = () => {
  const today = date.getDay();
  const forecastDays = [];

  for (let i = today; i < today + 5; i++) {
    if (i < 6) {
      forecastDays.push(days[i + 1]);
    } else if (i >= 6) {
      forecastDays.push(days[i - 6]);
    }
  }
  return forecastDays;
};

const Weather = (props) => {
  const weatherData = useSelector((state) => state.weatherData);
  const location = useSelector((state) => state.location);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading);
  const forecastDays = getForecastDays();

  console.log("weatherData", weatherData);
  console.log("location", location);

  return (
    <main className={classes.main}>
      {loading && <LoadSpinner />}
      {!loading && error && <NotFound />}
      {!loading && !error && !weatherData && (
        <NotFound error={{ message: "Start searching..." }} />
      )}
      {!loading && !error && weatherData && (
        <>
          <section className={classes["current-day"]}>
            <div className={classes.location}>
              <p className={classes.city}>
                {location.city}, {location.country}
              </p>
              <p className={classes.date}>{`${today}, ${month} ${day}`}</p>
            </div>
            <div className={classes.temperature}>
              <div className={classes["current-temperature"]}>
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}.png`}
                  alt={weatherData.current.weather[0].main}
                />
                <p className={classes.currTemp}>
                  {Math.round(weatherData.current.temp)}&#176;C
                </p>
                <p className={classes["feels-like"]}>
                  Feels like: {Math.round(weatherData.current.feels_like)}
                  &#176;C
                </p>
              </div>
              <div className={classes["more-data"]}>
                <p>
                  {capitalizeFirstLetter(
                    weatherData.current.weather[0].description
                  )}
                </p>
                <p>Humidity: {weatherData.current.humidity}%</p>
                <p>Wind: {Math.round(weatherData.current.wind_speed)}km/h</p>
              </div>
            </div>
          </section>
          <section className={classes["forecast-section"]}>
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
                    / {Math.round(weatherData.daily[index].temp.max)}&#176;
                  </p>
                </div>
              );
            })}
          </section>
        </>
      )}
    </main>
  );
};

export default Weather;
