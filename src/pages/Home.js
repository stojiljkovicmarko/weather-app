import { useDispatch } from "react-redux";

import SearchBar from "../components/SearchBar/SearchBar";
import Weather from "../components/Weather/Weather";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch({
          type: "setCurrLocation",
          payload: {
            lat: position.coords.latitude,
            long: position.coords.longitude,
          },
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, [dispatch]);

  return (
    <>
      <SearchBar />
      <Weather />
    </>
  );
};

export default Home;
