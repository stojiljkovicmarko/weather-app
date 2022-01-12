import { useSelector } from "react-redux";

import LoadSpinner from "../Loader/LoadSpinner";
import NotFound from "../Error/NotFound";

import classes from "./Weather.module.css";

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

const Weather = (props) => {
  const weatherData = useSelector((state) => state.weatherData);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading);

  console.log("weatherData", weatherData);

  return (
    <main className={classes.main}>
      {loading && <LoadSpinner />}
      {error && <NotFound />}
      {!error && !weatherData && <NotFound />}
      {!error && weatherData && (
        <section className={classes["current-day"]}>
          <div className={classes.location}>
            <p className={classes.city}>
              {weatherData.city}, {weatherData.country}
            </p>
            <p className={classes.date}>{`${today}, ${month} ${day}`}</p>
          </div>
          <div className={classes.temperature}>
            <div className={classes["current-temperature"]}>
              <p className={classes.currTemp}>{weatherData.temp}&#176;C</p>
            </div>
            <div className={classes["more-data"]}>
              <p>{weatherData.desc}</p>
              <p>
               {weatherData.min}&#176;/{weatherData.max}&#176;
              </p>
              <p className={classes["feels-like"]}>
                Feels like: {weatherData.feelsLike}&#176;C
              </p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default Weather;
