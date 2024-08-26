import React, { useMemo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions, TimeScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { subHours, subDays, startOfDay } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

interface FundingData {
  timestamp: string;
  funding: number;
}

interface HistoryChartProps {
  data: FundingData[];
  timeRange: string;
}

const HistoryChart: React.FC<HistoryChartProps> = ({ data, timeRange }) => {
  const parseTimestamp = (timestampStr: string): Date => {
    const [monthDayTime, hourMinute] = timestampStr.split("|");
    const [month, day] = monthDayTime.split(" ");
    const [hour, minute] = hourMinute.split(":");
    const monthNumber = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(month) + 1;

    return new Date(new Date().getFullYear(), monthNumber - 1, parseInt(day), parseInt(hour), parseInt(minute));
  };

  const processedData = useMemo(() => {
    return data.map((item) => ({
      x: parseTimestamp(item.timestamp),
      y: item.funding,
    }));
  }, [data]);

  const filteredData = useMemo(() => {
    const now = new Date();
    let startDate: Date;

    switch (timeRange) {
      case '1h':
        startDate = subHours(now, 1);
        break;
      case '24h':
        startDate = subHours(now, 24);
        break;
      case '7d':
        startDate = subDays(now, 7);
        break;
      case '30d':
        startDate = subDays(now, 30);
        break;
      case 'all':
      default:
        return processedData;
    }

    return processedData.filter(item => item.x >= startDate);
  }, [processedData, timeRange]);

  const chartData = {
    datasets: [
      {
        label: 'Funding',
        data: filteredData,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: timeRange === '1h' ? 'minute' : timeRange === '24h' ? 'hour' : 'day',
          displayFormats: {
            minute: 'HH:mm',
            hour: 'MMM dd, HH:mm',
            day: 'MMM dd',
          },
        },
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Funding ($)',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Funding History (${timeRange})`,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed.y;
            return `Funding: $${value.toFixed(2)}`;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default HistoryChart;