import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Chart as GoogleChart } from "react-google-charts";
import axios from "axios";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const Statistics = ({ filterType, filterValue }) => {
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
        const response = await axios.get(
          "http://localhost:8000/api/order-item/sales"
        );
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
        </div>
      </div>
    </div>
  );
};

export default Statistics;
