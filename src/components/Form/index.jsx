// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import { GEOCODING_API_URL } from '../../constants';
import { useUrlPosition } from '../../hooks/useUrlPosition';
import { convertToEmoji } from '../../utils';
import BackButton from '../BackButton';
import Button from '../Button';
import Message from '../Message';
import Spinner from '../Spinner';

import 'react-datepicker/dist/react-datepicker.css';
import useCitiesContext from '../../hooks/useCitiesContext';
import styles from './index.module.css';

function Form() {
  const [latitude, longitude] = useUrlPosition();
  const { createCity, isLoading } = useCitiesContext();

  const navigate = useNavigate();
  const [isLoadingGeolocation, setIsLoadingGeolocation] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState();
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [emoji, setEmoji] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (!latitude && !longitude) {
      return;
    }

    const fetchCityData = async () => {
      try {
        setIsLoadingGeolocation(true);
        setGeoCodingError('');
        const res = await fetch(
          `${GEOCODING_API_URL}?latitude=${latitude}&longitude=${longitude}`
        );
        const data = await res.json();

        if (!data.countryCode) {
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else 😉"
          );
        }

        setCityName(data.city || data.locality || '');
        setCountry(data.countryName || '');
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setGeoCodingError(err.message);
        console.error(err);
      } finally {
        setIsLoadingGeolocation(false);
      }
    };
    fetchCityData();
  }, [latitude, longitude]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cityName || !date) {
      return;
    }

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat: latitude, lng: longitude },
    };

    await createCity(newCity);
    navigate('/app/cities');
  };

  if (isLoadingGeolocation) {
    return <Spinner />;
  }

  if (!latitude && !longitude) {
    return <Message message='start by clicking on the map' />;
  }

  if (geoCodingError) {
    return <Message message={geoCodingError} />;
  }

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ''}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor='cityName'>City name</label>
        <input
          id='cityName'
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor='date'>When did you go to {cityName}?</label>
        <DatePicker
          id='date'
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat='dd/MM/yyyy'
        />
      </div>

      <div className={styles.row}>
        <label htmlFor='notes'>Notes about your trip to {cityName}</label>
        <textarea
          id='notes'
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
