import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions, TimeScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns'; // For date/time axis support

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

interface FundingData {
  timestamp: string;
  funding: number;
}
// interface FundingData {
//   timestamp: string;
//   funding: number;
// }

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

  const processedData = data.map((item) => ({
    x: parseTimestamp(item.timestamp),
    y: item.funding,
  }));

  const chartData = {
    datasets: [
      {
        label: 'Funding',
        data: processedData,
        // borderColor: 'rgb(75, 192, 192)',
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
        // type: 'time',
        // time: {
        //   unit: 'hour',
        //   displayFormats: {
        //     // hour: 'MMM dd, HH:mm',
        //     hour: 'MMM dd',
        //   },
        // },
        type: 'time',
        time: {
          unit: timeRange === '1h' || timeRange === '24h' ? 'hour' : 'day',
          displayFormats: {
            hour: 'HH:mm',
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
        text: 'Funding History',
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