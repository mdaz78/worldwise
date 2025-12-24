import { Link } from 'react-router-dom';
import { formatDate } from '../../utils';

import useCitiesContext from '../../hooks/useCitiesContext';
import styles from './index.module.css';

const CityItem = ({ city }) => {
  const {
    cityName,
    emoji,
    date,
    id,
    position: { lat: latitude, lng: longitude },
  } = city;
  const { currentCity, deleteCity } = useCitiesContext();

  const handleDelete = (e) => {
    e.preventDefault();
    deleteCity(id);
  };

  const url = `${id}?lat=${latitude}&lng=${longitude}`;

  return (
    <li>
      <Link
        to={url}
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles['cityItem--active'] : ''
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>( {formatDate(date)} )</time>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
};

export default CityItem;
