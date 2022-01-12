import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getWeatherData } from "../../service/weatherService";

import classes from "./SearchBar.module.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const onInputChangeHandler = (event) => {
    setQuery(event.target.value);
  };

  const onInputHandler = (event) => {
    if (event.keyCode === 13) {
      setSearch(query);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const data = await getWeatherData(search);
        //console.log(data);
        dispatch({ type: "FETCH_SUCCESS", payload: {
          temp: Math.round(data.main.temp),
          feelsLike: Math.round(data.main.feels_like),
          min: Math.round(data.main.temp_min),
          max: Math.round(data.main.temp_max),
          humidity: data.main.humidity,
          desc: data.weather[0].description,
          city: data.name,
          country: data.sys.country
        } });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL" });
      }
    };

    if (search.trim() !== "") {
      fetchData();
    }
  }, [search, dispatch]);

  return (
    <div className={classes["search-bar"]}>
      <input
        type="text"
        value={query}
        onChange={onInputChangeHandler}
        placeholder="Enter city..."
        onKeyDown={onInputHandler}
      />
    </div>
  );
};

export default SearchBar;
