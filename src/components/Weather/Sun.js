import classes from "./Sun.module.css";

import sunriseIcon from "../../assets/sunrise.png";
import sunsetIcon from "../../assets/sunset.png";
import { useSelector } from "react-redux";

function miliToTime(unixTimestamp) {
  //api returns unix timestamp which is seconds
  const miliseconds = unixTimestamp * 1000;
  const date = new Date(miliseconds);
  const h = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
  const m =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;

  return `${h}:${m}`;
}

const Sun = (props) => {
  const weatherData = useSelector((state) => state.weatherData);
  const sunriseUnixTimestamp = weatherData.current.sunrise;
  const sunsetUnixTimestamp = weatherData.current.sunset;
  return (
    <section>
      <div className={`${classes.sun} ${classes.cb2}`}>
        {/* <div className={classes["half-circle"]}></div> */}
        <div className={classes.time}>
          <div>
            <p>Sunrise</p>
            <p>{miliToTime(sunriseUnixTimestamp)}</p>
            <img src={sunriseIcon} alt="Sunrise" />
          </div>
          <div>
            <p>Sunset</p>
            <p>{miliToTime(sunsetUnixTimestamp)}</p>
            <img src={sunsetIcon} alt="Sunset" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sun;
