import { useSelector } from "react-redux";

import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import LoadSpinner from "../Loader/LoadSpinner";
import NotFound from "../Error/NotFound";

import classes from "./Weather.module.css";
import Hourly from "./Hourly";

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

const getNextHours = () => {
  let currentHour = date.getHours();
  const hoursArray = [];
  for(let i = 0; i < 25; i++) {
    
    if(currentHour < 24) {
      currentHour++;
      if(currentHour < 10) {
        hoursArray.push("0" + currentHour);
      } else {
        hoursArray.push("" + currentHour);
      }
    } else {
      currentHour = 0;
      hoursArray.push("0" + currentHour);
    }
  }
  return hoursArray;
};

const Weather = (props) => {
  const weatherData = useSelector((state) => state.weatherData);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading);

  return (
    <main className={classes.main}>
      {loading && <LoadSpinner />}
      {!loading && error && <NotFound />}
      {!loading && !error && !weatherData && (
        <NotFound error={{ message: "Start by typing a city..." }} />
      )}
      {!loading && !error && weatherData && (
        <>
          <CurrentWeather
            date={{ today, day, month }}
            capitalizeFirstLetter={capitalizeFirstLetter}
            getNextHours={getNextHours}
          />
          <Hourly getNextHours={getNextHours} />
          <Forecast forecastDays={getForecastDays} />
        </>
      )}
    </main>
  );
};

export default Weather;
