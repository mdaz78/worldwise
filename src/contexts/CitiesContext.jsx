import { useEffect, useState } from 'react';
import { BASE_URL } from '../constants';
import { CitiesContext } from './CitiesContextValue';

const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    const fetchCites = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert('There was an error loading cities');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCites();
  }, []);

  const getCity = async (id) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert('There was an error loading city');
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    cities,
    setCities,
    isLoading,
    setIsLoading,
    currentCity,
    getCity,
  };

  return (
    <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>
  );
};

export default CitiesProvider;
