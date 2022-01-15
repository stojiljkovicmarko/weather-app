import { useDispatch, useSelector } from "react-redux";

import SearchBar from "../components/SearchBar/SearchBar";
import Weather from "../components/Weather/Weather";
import { useEffect, useState } from "react";

import { getCoordinatesFromLocation } from "../service/forwardGeolocation";
import { getLocationOfCoordinates } from "../service/reverseGeolocation";
import { getWeatherData } from "../service/weatherService";

const Home = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const coordinates = useSelector((state) => state.coordinates);
  const location = useSelector((state) => state.location);

  const searchCity = (city) => {
    setSearchTerm(city);
  };

  useEffect(() => {
    const getInfoWithCoordinates = async (position) => {
      const coordinates = {
        lat: position.coords.latitude,
        long: position.coords.longitude,
      };
      dispatch({ type: "SET_COORDINATES", payload: coordinates });

      try {
        dispatch({ type: "FETCH_INIT" });
        const data = await getLocationOfCoordinates(coordinates);
        dispatch({
          type: "SET_LOCATION",
          payload: {
            city: data.results[0].components.city,
            country: data.results[0].components.country,
          },
        });
        dispatch({ type: "FETCH_SUCCESS" });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL" });
      }
    };

    const catchGeoLocationError = () => {
      alert("User denied geolocation.");
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        getInfoWithCoordinates,
        catchGeoLocationError
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm === "") {
      return;
    }
    const getLocation = async () => {
      try {
        dispatch({ type: "FETCH_INIT" });
        const data = await getCoordinatesFromLocation(searchTerm);

        if (data.results.length === 0 || !data.results[0].components.city) {
          throw new Error();
        }
        dispatch({
          type: "SET_COORDINATES",
          payload: {
            lat: data.results[0].geometry.lat,
            long: data.results[0].geometry.lng,
          },
        });
        dispatch({
          type: "SET_LOCATION",
          payload: {
            city: data.results[0].components.city,
            country: data.results[0].components.country,
          },
        });
        dispatch({ type: "FETCH_SUCCESS" });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL" });
      }
    };

    getLocation();
  }, [searchTerm, dispatch]);

  useEffect(() => {
    if (!coordinates || !location) {
      return;
    }

    const getWeatherAndForecast = async () => {
      try {
        dispatch({ type: "FETCH_INIT" });
        const data = await getWeatherData(coordinates);
        dispatch({ type: "SET_WEATHER", payload: data });
        dispatch({type: "FETCH_SUCCESS"});
      } catch (error) {
        dispatch({ type: "FETCH_FAIL" });
      }
    };

    getWeatherAndForecast();
  }, [coordinates, location, dispatch]);

  return (
    <>
      <SearchBar searchCity={searchCity} />
      <Weather />
    </>
  );
};

export default Home;
