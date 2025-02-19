import CityItem from "./CityItem";
import Styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
import { useEffect } from "react";
const CityList = () => {
  const { cities, isLoading, getCities } = useCities();
  useEffect(() => {
    getCities();
  }, []);
  return (
    <>
      {isLoading && <Spinner />}
      {cities?.length > 0 ? (
        <ul className={Styles.cityList}>
          {cities.map((city) => (
            <CityItem key={city.id} city={city} />
          ))}
        </ul>
      ) : (
        <Message message={"Please add a city from the map to add!"} />
      )}
    </>
  );
};

export default CityList;
