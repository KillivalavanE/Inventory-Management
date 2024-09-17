import { useGetDashboardMetricsQuery } from "@/state/api";
import { TrendingUp } from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CardSalesSummary = () => {
  const { data, isLoading, isError } = useGetDashboardMetricsQuery();
  const salesData = data?.saleSummary || [];
  console.log("Salesdata", salesData);
  const [timeframe, setTimeframe] = useState("weekly");
  const totalValueSum =
    salesData.reduce((acc, curr) => acc + curr.totalValue, 0) || 0;
  const averageChangePercentage =
    salesData.reduce((acc, curr, _, array) => {
      return acc + curr.changePercentage! / array.length;
    }, 0) || 0;

  const highestValue = salesData.reduce((acc,curr)=>{
    return acc.totalValue>curr.totalValue ? acc : curr;
  },salesData[0] || {})
  const date = new Date(highestValue.date);
  const highestDateValue= date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  if (isError) {
    return <div className="m-5">Failed to fetch data</div>;
  }
  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl flex flex-col justify-between">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          {/* Header */}
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Sales Summary
            </h2>
          </div>
          <hr/>
          {/* BODY */}
          <div>
            <div className="flex items-center mt-2 justify-between mb-6 px-7">
              <div className="text-lg font-medium">
                <p className="text-xs text-gray-400">Value</p>
                <span className="text-2xl font-extrabold">
                  $
                  {(totalValueSum / 1e6).toLocaleString("en", {
                    maximumFractionDigits: 2,
                  })}
                  M
                </span>
                <span className="text-green-500 text-sm ml-2">
                  <TrendingUp className="inline w-4 h-4 mr-1" />
                  {averageChangePercentage.toFixed(2)}%
                </span>
              </div>
              <select
                className="shadow-sm border border-gray-300 bg-white p-2 rounded"
                value={timeframe}
                onChange={(e) => {
                  setTimeframe(e.target.value);
                }}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={350} className="px-7">
              <BarChart
                data={salesData}
                margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getMonth() + 1}/${date.getDate()}`;
                  }}
                />
                <YAxis
                  tickFormatter={(value) => {
                    return `$${(value / 1e6).toFixed(0)}M`;
                  }}
                  tick={{ fontSize: 12, dx: -1 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(value: number) => [
                    `$${value.toLocaleString("en")}`,
                  ]}
                  labelFormatter={(label) => {
                    const date = new Date(label);
                    return date.toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    });
                  }}
                />
                <Bar
                  dataKey="totalValue"
                  fill="#3182ce"
                  barSize={25}
                  radius={[0, 0, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <hr />
            <div className="flex justify-between items-center pb-2 text-sm px-7 mb-6 mt-1">
                <p>{salesData.length||0} Days</p>
                <p className="text-sm">Highest Sales Date : {" "}
                <span className="font-bold">{highestDateValue}</span>
                </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardSalesSummary;
