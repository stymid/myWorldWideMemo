import Styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";

const CountryList = () => {
  const { isLoading, cities } = useCities();
  const countries = cities.reduce((acc, cur) => {
    if (acc.every((val) => val.country !== cur.country)) return [...acc, cur];
    return [...acc];
  }, []);
  console.log(countries);

  return (
    <>
      {isLoading && <Spinner />}
      {countries.length > 0 ? (
        <ul className={Styles.countryList}>
          {countries.map((country) => (
            <CountryItem key={country.id} country={country} />
          ))}
        </ul>
      ) : (
        <Message message={"Please add a city from the map to add!"} />
      )}
    </>
  );
};

export default CountryList;
