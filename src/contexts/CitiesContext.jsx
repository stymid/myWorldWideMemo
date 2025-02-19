/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

const BASE_URL = "http://localhost:8000";
const CitiesContext = createContext();

const initialState = {
  cities: [],
  currentCity: {},
  detailCity: {
    cityName: "",
    country: "",
    date: "",
    notes: "",
    position: "",
    emoji: "",
  },
  error: "",
  isLoading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: action.payload };
    case "citiesLoaded":
      return { ...state, cities: action.payload };
    case "cityLoaded":
      return { ...state, currentCity: action.payload };
    case "detailCityLoaded":
      return { ...state, detailCity: action.payload };
    case "cityUpdated":
      return { ...state, cities: [...state.cities, action.payload] };
    case "cityDelete":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    case "submitted":
      return { ...state, cities: [...state.cities, action.payload] };
    case "rejected":
      return { ...state, error: action.payload };
    default:
      throw new Error("the action doesn't match any case!");
  }
}

const CitiesProvider = ({ children }) => {
  const [{ cities, currentCity, error, isLoading, detailCity }, dispatch] =
    useReducer(reducer, initialState);

  async function getCities() {
    dispatch({ type: "loading", payload: true });
    try {
      const res = await fetch(`${BASE_URL}/cities`);
      const data = await res.json();
      dispatch({ type: "citiesLoaded", payload: data });
    } catch (err) {
      console.log(err.message);
      dispatch({ type: "rejected", payload: "getting cities rejected" });
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  }

  async function getCity(id) {
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      if (!res.ok) throw new Error("an error acured during the fetch");
      const data = await res.json();
      dispatch({ type: "cityLoaded", payload: data });
    } catch (err) {
      console.error(err.message);
    }
  }

  async function getDetailCity(position) {
    try {
      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.lat}&longitude=${position.lng}`
      );
      if (!res.ok) throw new Error("the place you choose is not exist ar all");
      const data = await res.json();

      dispatch({ type: "detailCityLoaded", payload: data });
    } catch (err) {
      console.log(err.message);
    }
  }

  async function deleteCity(id) {
    try {
      const res = fetch(`${BASE_URL}/cities/${id}`, { method: "DELETE" });
      console.log(res);
      dispatch({ type: "cityDelete", payload: id });
    } catch (err) {
      console.log(err.message);
    }
  }

  async function submitCity(newCity) {
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("submitting form isn't successfull!");
      dispatch({ type: "submitted", payload: newCity });
    } catch (err) {
      dispatch({ type: "error", payload: err.message });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        error,
        isLoading,
        currentCity,
        detailCity,
        getCities,
        getCity,
        deleteCity,
        getDetailCity,
        submitCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

const useCities = () => {
  const context = useContext(CitiesContext);
  return context;
};
export { CitiesProvider, useCities };
