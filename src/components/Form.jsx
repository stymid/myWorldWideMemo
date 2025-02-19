// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useRef, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useCities } from "../contexts/CitiesContext";

function convertToEmoji(countryCode) {
  const codePoints = countryCode
    ?.toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());

  return codePoints ? String?.fromCodePoint(...codePoints) : null;
}

function Form() {
  const { getDetailCity, detailCity, submitCity } = useCities();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [position, setPosition] = useState();
  const emoji = useRef();

  const latUrl = searchParams.get("lat");
  const lngUrl = searchParams.get("lng");
  useEffect(() => {
    const positionClicked = {
      lat: latUrl,
      lng: lngUrl,
    };

    getDetailCity(positionClicked);
  }, [latUrl, lngUrl]);

  useEffect(() => {
    setCityName(detailCity.city || "");
    setCountry(detailCity.countryName || "");
    setPosition({ lat: detailCity.latitude, lng: detailCity.longitude });
    emoji.current = convertToEmoji(detailCity?.countryCode);
  }, [detailCity]);

  function handleSubmit(e) {
    e.preventDefault();
    const newCity = {
      cityName,
      country,
      date: date,
      emoji: emoji.current,
      id: new Date().getTime().toString().slice(6, -1),
      notes,
      position,
    };
    submitCity(newCity);
    navigate("/app");
  }
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City Name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji.current}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat={"yyyy/MM/dd"}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>Add</Button>
        <Button
          type={"back"}
          onClick={(e) => {
            e.preventDefault();
            navigate("/app");
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
