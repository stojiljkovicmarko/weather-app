import { useDispatch } from "react-redux";

import SearchBar from "../components/SearchBar/SearchBar";
import Weather from "../components/Weather/Weather";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      dispatch({
        type: "setCurrLocation",
        payload: {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        },
      });
    });
  }, [dispatch]);

  return (
    <>
      <SearchBar />
      <Weather />
    </>
  );
};

export default Home;
