import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ECommerce from './pages/Dashboard/ECommerce';
import SignIn from './pages/Authentication/SignIn';
import Loader from './common/Loader';
import routes from './routes';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from './redux/store';
import ProtectedRoute from './components/ProtectedRoute';
import { detailsUser } from './redux/slices/userSlice';
import ProductList from './pages/Products/ProductList';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: any) => state.users);
  const isLoggedIn = data ? true : false;

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    dispatch(detailsUser());
    setTimeout(() => setLoading(false), 1000);
  }, [ dispatch]);

  return loading ? (
    <Loader />
  ) : (
    <>
     
      <Routes>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route element={<DefaultLayout />}>

          <Route
            index
            element={
              <ProtectedRoute isAuthenticated={isLoggedIn}>
                <ProductList />
              </ProtectedRoute>
            }
          />

          {routes.map((route, index) => {
            const { path, component: Component } = route;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <ProtectedRoute isAuthenticated={isLoggedIn}>
                  <Suspense fallback={<Loader />}>
                    <Component />
                  </Suspense>
                  </ProtectedRoute>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </>
  );
}

export default App;
