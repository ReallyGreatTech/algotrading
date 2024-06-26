import { Route, Routes } from 'react-router-dom';
import FundingRates from '../pages/FundingRates';
import Positions from '../pages/Positions';
import Charts from '../pages/Charts';
import Layout from '../pages/Layout';

const AppRoutes = () => {
  return (
    <main className="bg-gray-900">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<FundingRates />}></Route>
          <Route path="/positions" element={<Positions />}></Route>
          <Route path="/charts" element={<Charts />}></Route>
        </Route>
      </Routes>
    </main>
  );
};

export default AppRoutes;
