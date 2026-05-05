"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PriceChart = ({ data }: any) => {
  const isUp =
    data?.length > 0
      ? data[0].price < data[data.length - 1].price
      : true;

  return (
    <div className="w-full h-80 bg-white/5 p-4 rounded-xl">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={isUp ? "#22c55e" : "#ef4444"}
                stopOpacity={0.4}
              />
              <stop
                offset="95%"
                stopColor={isUp ? "#22c55e" : "#ef4444"}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <XAxis dataKey="date" hide />
          <YAxis hide domain={["auto", "auto"]} />

          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",
              border: "none",
              borderRadius: "10px",
              color: "white",
            }}
            labelStyle={{ color: "#9ca3af" }}
            formatter={(value) => {
              if (typeof value !== "number") return ["$0.00", "Price"];
              return [`$${value.toFixed(2)}`, "Price"];
            }}
            labelFormatter={(label) => `${label}`}
          />

          <Area
            type="monotone"
            dataKey="price"
            stroke={isUp ? "#22c55e" : "#ef4444"}
            fill="url(#colorPrice)"
            strokeWidth={2}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;