import CountryItem from '../CountryItem';
import Message from '../Message';
import Spinner from '../Spinner';
import styles from './index.module.css';

const CountryList = ({ isLoading, cities }) => {
  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
    return (
      <Message message='Add your first city by clicking on a city on the map' />
    );
  }

  const countries = cities.reduce((arr, city) => {
    if (!arr.some((country) => country.country === city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    }
    return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
};

export default CountryList;
