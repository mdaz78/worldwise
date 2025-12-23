import { useNavigate, useParams } from 'react-router-dom';
import { formatDate } from '../../utils';

import { useEffect } from 'react';
import useCitiesContext from '../../hooks/useCitiesContext';
import BackButton from '../BackButton';
import Spinner from '../Spinner';
import styles from './index.module.css';

function City() {
  const { id } = useParams();
  const { isLoading, getCity, currentCity } = useCitiesContext();

  const navigate = useNavigate();

  useEffect(() => {
    getCity(id);
  }, [id]);

  if (isLoading) {
    return <Spinner />;
  }

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name {id}</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null, { weekday: 'long' })}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target='_blank'
          rel='noreferrer'
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
