import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import CitiesProvider from './contexts/CitiesContext';

import { Suspense, lazy } from 'react';
import City from './components/City';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import Form from './components/Form';

import SpinnerFullPage from './components/SpinnerFullPage';
import ProtectedRoute from './pages/ProtectedRoute';

const Homepage = lazy(() => import('./pages/Homepage'));
const AppLayout = lazy(() => import('./pages/AppLayout'));
const Login = lazy(() => import('./pages/Login'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Product = lazy(() => import('./pages/Product'));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route
              index
              element={
                <Suspense fallback={<SpinnerFullPage />} key='/'>
                  <Homepage />
                </Suspense>
              }
            />
            <Route
              path='product'
              element={
                <Suspense fallback={<SpinnerFullPage />} key='product'>
                  <Product />
                </Suspense>
              }
            />
            <Route
              path='pricing'
              element={
                <Suspense fallback={<SpinnerFullPage />} key='pricing'>
                  <Pricing />
                </Suspense>
              }
            />
            <Route
              path='login'
              element={
                <Suspense fallback={<SpinnerFullPage />} key='login'>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path='app'
              element={
                <ProtectedRoute>
                  <Suspense fallback={<SpinnerFullPage />} key='app'>
                    <AppLayout />
                  </Suspense>
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to='cities' replace />} />
              <Route path='cities' element={<CityList />} />
              <Route path='cities/:id' element={<City />} />
              <Route path='countries' element={<CountryList />} />
              <Route path='form' element={<Form />} />
            </Route>
            <Route
              path='*'
              element={
                <Suspense fallback={<SpinnerFullPage />} key='404'>
                  <PageNotFound />
                </Suspense>
              }
            />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
