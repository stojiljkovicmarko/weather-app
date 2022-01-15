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

    //f-ja koja poziva reverseGeolocation noiv API opencagedata
    //za koordinate koje dole dobijemo
    //ako postoji geolocation kao prvu funkicju prosledimo taj poziv
    //onda popunimo podatke o mestu i postavimo koordinate

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

  //drugi useeffect je za mesto, tj. adresu kod nas location
  //proverimo da li ima ako nema onda return, ako ima znaci da je obavljen search ili je data lokacija
  //onda cemo ovde obaviti forward geolocation, tj na osnovu search-a dobijemo koordinate koje promenimo
  //onda se opali treci efekat da na osnovu koordinata fetchuje podatke

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
        console.log(error);
        console.log(error.message);
        dispatch({ type: "FETCH_FAIL" });
      }
    };

    getLocation();
  }, [searchTerm, dispatch]);

  //trec useeffect ce gledati ako if (Object.keys(coordinates).length === 0) return;
  //ako nema koordinata, ako ima onda neka napravi fetch podatak sa tim koordinatama
  //to ce biti oneCall poziv sa openweatherapi
  //kao dependency stavimo coordinate jer ce se onda i ovo izvrsiti ako imamo gore koordinate od navigatora

  useEffect(() => {
    if (!coordinates) {
      return;
    }

    const getWeatherAndForecast = async () => {
      try {
        dispatch({ type: "FETCH_INIT" });

        const data = await getWeatherData(coordinates);

        dispatch({ type: "SET_WEATHER", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL" });
      }
    };

    getWeatherAndForecast();
  }, [coordinates, dispatch]);

  return (
    <>
      <SearchBar searchCity={searchCity} />
      <Weather />
    </>
  );
};

export default Home;
