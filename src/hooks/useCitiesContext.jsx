import { useContext } from 'react';
import { CitiesContext } from '../contexts/CitiesContextValue';

const useCitiesContext = () => {
  const context = useContext(CitiesContext);

  if (!context) {
    throw new Error('CitiesContext was used outside the CitiesProvider');
  }

  return context;
};

export default useCitiesContext;
