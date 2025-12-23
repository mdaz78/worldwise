import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import useCitiesContext from '../../hooks/useCitiesContext';
import styles from './index.module.css';

const Map = () => {
  const { cities } = useCitiesContext();

  const [searchParams] = useSearchParams();
  const latitude = searchParams.get('lat');
  const longitude = searchParams.get('lng');

  const [mapPosition, setMapPosition] = useState([40, 0]);

  useEffect(() => {
    if (latitude && longitude) {
      setMapPosition([latitude, longitude]);
    }
  }, [latitude, longitude]);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        />
        {cities.map((city) => (
          <Marker position={[city.position.lat, city.position.lng]}>
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

const ChangeCenter = ({ position }) => {
  const map = useMap();
  map.setView(position);
  return null;
};

const DetectClick = () => {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
};

export default Map;
