import { useEffect, useReducer } from 'react';
import { BASE_URL } from '../constants';
import { CitiesContext } from './CitiesContextValue';

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        isLoading: true,
      };

    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case 'city/loaded':
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case 'city/created':
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
        cities: [...state.cities, action.payload],
      };

    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };

    default:
      throw new Error(`Invalid action.type ${action.type}`);
  }
};

const CitiesProvider = ({ children }) => {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const fetchCites = async () => {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: 'cities/loaded', payload: data });
      } catch {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading cities',
        });
      }
    };

    fetchCites();
  }, []);

  const getCity = async (id) => {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: 'city/loaded', payload: data });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error loading city',
      });
    }
  };

  const createCity = async (newCity) => {
    dispatch({ type: 'loading' });

    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      dispatch({ type: 'city/created', payload: data });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error creating city',
      });
    }
  };

  const deleteCity = async (id) => {
    dispatch({ type: 'loading' });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'city/deleted', payload: id });
    } catch {
      alert('');
      dispatch({
        type: 'rejected',
        payload: 'There was an error deleting city',
      });
    }
  };

  const value = {
    cities,
    isLoading,
    currentCity,
    getCity,
    createCity,
    deleteCity,
  };

  return (
    <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>
  );
};

export default CitiesProvider;
