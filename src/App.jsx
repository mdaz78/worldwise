import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import City from './components/City';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import { BASE_URL } from './constants';
import AppLayout from './pages/AppLayout';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Pricing from './pages/Pricing';
import Product from './pages/Product';

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCites = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert('There was an error loading data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCites();
  }, []);

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path='product' element={<Product />} />
            <Route path='pricing' element={<Pricing />} />
            <Route path='login' element={<Login />} />
            <Route path='app' element={<AppLayout />}>
              <Route
                index
                element={<CityList cities={cities} isLoading={isLoading} />}
              />
              <Route
                path='cities'
                element={<CityList isLoading={isLoading} cities={cities} />}
              />
              <Route path='cities/:id' element={<City />} />
              <Route
                path='countries'
                element={<CountryList cities={cities} isLoading={isLoading} />}
              />
              <Route path='form' element={<p>Form</p>} />
            </Route>
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
