import { createStore } from "redux";

const weatherReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        error: false,
        loading: false,
      };
    case "FETCH_FAIL":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "SET_LOCATION":
      return {
        ...state,
        location: {
          city: action.payload.city,
          country: action.payload.country,
        },
      };
    case "SET_COORDINATES":
      return {
        ...state,
        coordinates: {
          lat: action.payload.lat,
          long: action.payload.long,
        },
      };
    case "SET_WEATHER":
      return {
        ...state,
        weatherData: action.payload,
      };
    default:
      return initialState;
  }
};

const initialState = {
  loading: false,
  error: false,
  weatherData: null,
  coordinates: null,
  location: null,
};

const store = createStore(weatherReducer);

export default store;
