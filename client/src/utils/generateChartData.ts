import { useState, useCallback } from 'react';

interface DataItem {
  value: number;
  date: number;
}

const useRandomTimeSeries = (
  startDate: Date,
  days: number,
  minValue: number,
  maxValue: number
) => {
  const generateData = useCallback(() => {
    const data: DataItem[] = [];

    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const value =
        Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;

      data.push({
        date: date.getTime(),
        value,
      });
    }

    return data;
  }, [startDate, days, minValue, maxValue]);

  const [data, setData] = useState<DataItem[]>(generateData);

  const regenerateData = () => {
    setData(generateData());
  };

  return { data, regenerateData };
};

export default useRandomTimeSeries;
