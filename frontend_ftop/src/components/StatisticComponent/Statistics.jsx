import React from 'react';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Chart } from 'react-google-charts';

// Register necessary components for Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const Statistics = () => {
  // Data and options for the Google Charts line chart
  const googleLineChartData = [
    ['Price', 'Size'],
    [50, 7], [60, 8], [70, 8], [80, 9], [90, 9],
    [100, 9], [110, 10], [120, 11],
    [130, 14], [140, 14], [150, 15],
  ];

  const googleLineChartOptions = {
    title: 'House Prices vs. Size (Google Charts)',
    hAxis: { title: 'Square Meters' },
    vAxis: { title: 'Price in Millions' },
    legend: 'none',
  };

  // Data for the Chart.js line chart
  const chartJSData = {
    labels: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
    datasets: [
      {
        label: 'House Prices vs. Size (Chart.js)',
        data: [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15],
        fill: false,
        borderColor: 'rgba(0,0,255,1.0)',
        backgroundColor: 'rgba(0,0,255,0.1)',
        tension: 0,
      },
    ],
  };

  const chartJSOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        min: 6,
        max: 16,
      },
    },
  };

  // Data and options for the Google Charts pie chart
  const googlePieChartData = [
    ['Country', 'Mhl'],
    ['Italy', 54.8],
    ['France', 48.6],
    ['Spain', 44.4],
    ['USA', 23.9],
    ['Argentina', 14.5],
  ];

  const googlePieChartOptions = {
    title: 'World Wide Wine Production',
    is3D: true,
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-8 p-4">
      {/* Container for two charts in a row */}
      <div className="flex flex-row space-x-8">
        {/* Google Charts Line Chart */}
        <div className="w-full max-w-md p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-center mb-4">House Prices vs. Size (Google Charts)</h2>
          <Chart
            chartType="LineChart"
            width="100%"
            height="400px"
            data={googleLineChartData}
            options={googleLineChartOptions}
          />
        </div>

        {/* Chart.js Line Chart */}
        <div className="w-full max-w-md p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-center mb-4">House Prices vs. Size (Chart.js)</h2>
          <Line data={chartJSData} options={chartJSOptions} />
        </div>
      </div>

      {/* Google Charts Pie Chart */}
      <div className="w-full max-w-xl p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">World Wide Wine Production</h2>
        <Chart
          chartType="PieChart"
          width="100%"
          height="400px"
          data={googlePieChartData}
          options={googlePieChartOptions}
        />
      </div>
    </div>
  );
};

export default Statistics;