import { Route, Routes, useLocation } from 'react-router-dom';
import FundingRates from '../pages/FundingRates';
import Positions from '../pages/Positions';
import Layout from '../pages/Layout';
import EditPositionPage from '../pages/EditPositionPage';
import CreatePositionPage from '../pages/CreatePositionPage';
import { useEffect } from 'react';
import System from '../pages/System';
import LoginPage from '../pages/LoginPage';

const AppRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <main className="bg-gray-900">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<FundingRates />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/positions" element={<Positions />}></Route>
          <Route path="/positions/new" element={<CreatePositionPage />}></Route>
          <Route
            path="/positions/edit/:id"
            element={<EditPositionPage />}
          ></Route>
          <Route path="/system" element={<System />}></Route>
        </Route>
      </Routes>
    </main>
  );
};

export default AppRoutes;
