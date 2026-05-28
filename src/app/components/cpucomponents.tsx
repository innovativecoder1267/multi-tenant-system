"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type cpuchart={
  data:any
}

export default function CPUChart({
  data,
}:cpuchart) {
   return (
    
    <ResponsiveContainer
      width="100%"
      height={300}
    >

      <LineChart data={data}>

        <XAxis dataKey="time" />

        <YAxis domain={[0, "auto"]} />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="cpu"
        />
        <Line
          dataKey="incoming"
          stroke="#3b82f6"
       />

        <Line
          dataKey="outgoing"
          stroke="#22c55e"
        />

      </LineChart>

    </ResponsiveContainer>
  );
}
