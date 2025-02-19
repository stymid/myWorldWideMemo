/* eslint-disable react/prop-types */
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";

const Map = () => {
  const [mapPosition, setMapPosition] = useState([]);
  const [searchParams] = useSearchParams();
  const { cities } = useCities();
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  useEffect(() => {
    getPosition();
  }, []);
  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);
  useEffect(() => {
    if (!geoLocationPosition) {
      return;
    }
    setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);
  return (
    <div className={styles.mapContainer}>
      <Button type={"position"} onClick={getPosition}>
        {isLoadingPosition ? <p>Loading...</p> : "use Your position"}
      </Button>
      {mapPosition.length > 0 && (
        <MapContainer
          center={mapPosition}
          zoom={9}
          scrollWheelZoom={true}
          className={styles.map}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
          {cities?.map((city) => (
            <Marker
              key={city.id}
              position={[city.position.lat, city.position.lng]}
            >
              <Popup>
                <span className="">
                  {city.emoji} {city.notes}
                </span>
              </Popup>
            </Marker>
          ))}
          <SyncCenter position={mapPosition} />
          <DetectPosition setMapPosition={setMapPosition} />
        </MapContainer>
      )}
    </div>
  );
};

function SyncCenter({ position }) {
  const map = useMap();
  map.setView(position);

  return null;
}

function DetectPosition({ setMapPosition }) {
  const navigate = useNavigate();
  useMapEvents({
    click: function (e) {
      console.log(e);
      setMapPosition([e.latlng.lat, e.latlng.lng]);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });

  return null;
}
export default Map;
