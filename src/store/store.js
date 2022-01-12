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
        weatherData: action.payload,
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
        currLocation: {
          lat: action.payload.lat,
          long: action.payload.long,
        },
      };
    default:
      return initialState;
  }
};

const initialState = {
  loading: false,
  error: false,
  weatherData: null,
  currLocation: null,
};

const store = createStore(weatherReducer);

export default store;
