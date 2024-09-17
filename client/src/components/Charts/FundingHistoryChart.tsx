import { useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import { FundingHistory } from '../../types';
import AreaChart from './AreaChart';
import { TimeUnit } from '@amcharts/amcharts5/.internal/core/util/Time';

const FundingHistoryChart = () => {
  const selectedTimeFilter = useAppSelector((state) => state.timefilter.time);
  const timeRange = useAppSelector((state) => state.timefilter.timeRange);

  const selectedFundingHistory = useAppSelector(
    (state) => state.selecetedFundingHistory
  );

  const mapDataToChart = (data: FundingHistory[]) => {
    if (!data.length) return [];

    return data.map((item) => ({
      value: item.hourly_funding,
      date: new Date(item.timestamp).getTime(),
    }));
  };

  const getFundingData = () => {
    const now = Date.now(); // Get current timestamp in milliseconds
    let startDate;

    switch (timeRange) {
      case '1D':
        startDate = now - 24 * 60 * 60 * 1000; // Subtract 1 day (in milliseconds)
        break;
      case '1W':
        startDate = now - 7 * 24 * 60 * 60 * 1000; // Subtract 1 week (in milliseconds)
        break;
      case '1Y':
        startDate = now - 365 * 24 * 60 * 60 * 1000; // Subtract 1 year (in milliseconds)
        break;
      default:
        startDate = now - 24 * 60 * 60 * 1000; // Default to 1 day (in milliseconds)
    }

    const filteredData = selectedFundingHistory.data.filter((item) => {
      const itemTimestamp = new Date(item.timestamp).getTime(); // Assuming timestamp is in milliseconds
      return itemTimestamp > startDate;
    });

    const transformedData = filteredData
      .map((item) => {
        let funding;

        switch (selectedTimeFilter) {
          case '1H':
            funding = item.hourly_funding;
            break;
          case '1D':
            funding = item.daily_funding;
            break;
          case '1Y':
            funding = item.annual_funding;
            break;
          default:
            funding = item.annual_funding;
        }

        return {
          value: funding, // Mapping funding to value
          date: new Date(item.timestamp).getTime(), // Using raw timestamp for date
        };
      })
      .reverse();

    return transformedData;
  };

  const getTimeUnit = (): TimeUnit => {
    //logic to be implmenented later for different time ranges
    return 'hour';
  };

  useEffect(() => {
    mapDataToChart(selectedFundingHistory.data);
  }, [selectedFundingHistory.data.length]);

  return (
    <div className="relative">
      {selectedFundingHistory.loading ? (
        <div className="h-[500px] flex justify-center items-center">
          <p className="text-center text-xs font-bold text-primary-light">
            Loading....
          </p>
        </div>
      ) : !getFundingData().length ? (
        <div className="h-[500px] flex justify-center items-center">
          <p className="text-center text-xs font-bold text-primary-light">
            Data for chart is empty.
          </p>
        </div>
      ) : (
        <AreaChart
          timeUnit={getTimeUnit()}
          data={getFundingData()}
          id={'chart-id'}
        />
      )}
    </div>
  );
};

export default FundingHistoryChart;
