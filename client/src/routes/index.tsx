import { Route, Routes } from "react-router-dom";
import FundingRates from "../pages/FundingRates";
import Positions from "../pages/Positions";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<FundingRates />}></Route>
        <Route path="/positions" element={<Positions />}></Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;
