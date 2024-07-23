import { Route, Routes, useLocation } from 'react-router-dom';
import FundingRates from '../pages/FundingRates';
import Positions from '../pages/Positions';
import Charts from '../pages/Charts';
import Layout from '../pages/Layout';
import EditPositionPage from '../pages/EditPositionPage';
import CreatePositionPage from '../pages/CreatePositionPage';
import { useEffect } from 'react';

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
          <Route path="/positions" element={<Positions />}></Route>
          <Route path="/positions/new" element={<CreatePositionPage />}></Route>
          <Route
            path="/positions/edit/:id"
            element={<EditPositionPage />}
          ></Route>
          <Route path="/charts" element={<Charts />}></Route>
        </Route>
      </Routes>
    </main>
  );
};

export default AppRoutes;
