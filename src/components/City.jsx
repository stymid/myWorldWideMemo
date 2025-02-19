// import ButtonBack from "./"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useCities } from "../contexts/CitiesContext";
import styles from "./City.module.css";
import Spinner from "./Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const navigate = useNavigate();
  const isFirst = useRef(true);
  const { id } = useParams();
  const { currentCity, getCity } = useCities();

  useEffect(() => {
    isFirst.current = false;

    getCity(id);
  }, [id, isFirst]);

  if (isFirst.current) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{currentCity?.emoji}</span> {currentCity?.cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {currentCity?.cityName} on</h6>
        <p>{formatDate(currentCity?.date || null)}</p>
      </div>

      {currentCity?.notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{currentCity?.notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${currentCity?.cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {currentCity?.cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        {/* <ButtonBack /> */}
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          go back
        </button>
      </div>
    </div>
  );
}

export default City;
