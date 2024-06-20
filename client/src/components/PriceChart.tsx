import AreaChart from './Charts/AreaChart';
import { PriceChartDataItem } from '../types';
import { useEffect } from 'react';

interface PriceChartProps {
  data: PriceChartDataItem[];
}

const PriceChart = ({ data }: PriceChartProps) => {
  const mapToViewModel = (priceData: { time: number; price: number }[]) =>
    priceData.map((p) => ({ date: p.time, value: p.price }));

  useEffect(() => {}, [data]);

  return (
    <div className="">
      {data.length ? (
        <AreaChart
          data={mapToViewModel(data)}
          id="price-chart-div"
          containerStyle={{ height: '27em' }}
        />
      ) : (
        <div className="py-10">
          <p className="text-sm text-center text-white/50">
            Data for this chart is not available.
          </p>
        </div>
      )}
    </div>
  );
};

export default PriceChart;
