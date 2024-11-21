import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Chart as GoogleChart } from "react-google-charts";
// import Chart from "chart.js/auto";
import axios from "axios";

// Register necessary components for Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const Statistics = ({ filterType, filterValue }) => {
  // Data and options for the Google Charts line chart

  const fetchOrderCount = async (filterType, filterValue) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/store/order-count`,
        {
          params: { filterType, filterValue },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching order count:", error);
      return [];
    }
  };

  const transformDataForGoogleChart = (data) => {
    const chartData = [["Store", "Order Count"]];
    data.forEach((item) => {
      chartData.push([item.storeName, parseInt(item.orderCount, 10)]);
    });
    return chartData;
  };

  const [chartData, setChartData] = useState([["Store", "Order Count"]]);
  const [chartData1, setChartData1] = useState([["Product", "Percentage"]]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchOrderCount(filterType, filterValue);
      const transformedData = transformDataForGoogleChart(data);
      setChartData(transformedData);
    };
    fetchData();
  }, [filterType, filterValue]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/order-item/sales");
        const sales = response.data;

        
        const totalSold = sales.reduce(
          (sum, item) => sum + Number(item.totalSold),
          0
        );

        
        const formattedData = [
          ["Product", "Percentage"], 
          ...sales.map((item) => [
            `Product ${item.product.productId}`,
            (Number(item.totalSold) / totalSold) * 100,
          ]),
        ];

        
        setChartData1(formattedData);
        
      } catch (error) {
        console.error("Error fetching sales data:", error);
        
      }
    };

    fetchSalesData();
  }, []);

  const chartOptions = {
    title: "Product Sales Statistics (Percentage)",
    is3D: true,
    pieSliceText: "percentage",
  };

  const googleLineChartOptions = {
    title: "Order Count Statistics",
    hAxis: { title: "Store" },
    vAxis: { title: "Order Count" },
    legend: "none",
  };

  // Data for the Chart.js line chart
  const chartJSData = {
    labels: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
    datasets: [
      {
        label: "House Prices vs. Size (Chart.js)",
        data: [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15],
        fill: false,
        borderColor: "rgba(0,0,255,1.0)",
        backgroundColor: "rgba(0,0,255,0.1)",
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

  // const chartRef = useRef(null);
  // const myChartRef = useRef(null);

  // useEffect(() => {
  //   const xValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  //   myChartRef.current = new Chart(chartRef.current, {
  //     type: "line",
  //     data: {
  //       labels: xValues,
  //       datasets: [
  //         {
  //           data: [860, 1140, 1060, 1060, 1070, 1110, 1330, 2210, 7830, 2478],
  //           borderColor: "red",
  //           fill: false,
  //         },
  //         {
  //           data: [1600, 1700, 1700, 1900, 2000, 2700, 4000, 5000, 6000, 7000],
  //           borderColor: "green",
  //           fill: false,
  //         },
  //         {
  //           data: [300, 700, 2000, 5000, 6000, 4000, 2000, 1000, 200, 100],
  //           borderColor: "blue",
  //           fill: false,
  //         },
  //       ],
  //     },
  //     options: {
  //       legend: { display: false },
  //     },
  //   });
  //   return () => {
  //     myChartRef.current.destroy();
  //   };
  // }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-8 p-4">
      <div className="flex flex-row space-x-8">
        <div className="w-full max-w-md p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-center mb-4">
            Order Count Chart
          </h2>
          <GoogleChart
            chartType="LineChart"
            width="100%"
            height="400px"
            data={chartData}
            options={googleLineChartOptions}
          />
        </div>

        {/* Chart.js Line Chart */}
        <div className="w-full max-w-md p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-center mb-4">
            House Prices vs. Size (Chart.js)
          </h2>
          <Line data={chartJSData} options={chartJSOptions} />
        </div>
      </div>

      <div className="flex flex-row space-x-8">
      <div className="w-full max-w-xl p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Product Sales Statistics
      </h2>
        <GoogleChart
          chartType="PieChart"
          width="100%"
          height="400px"
          data={chartData1}
          options={chartOptions}
        />
    </div>

        {/* <canvas
          ref={chartRef}
          style={{ width: "100%", maxWidth: "600px" }}
        ></canvas> */}
      </div>

      {/* Google Charts Pie Chart */}
    </div>
  );
};

export default Statistics;
