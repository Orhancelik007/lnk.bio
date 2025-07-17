"use client";

import { addDays, differenceInDays, formatISO9075, parseISO } from "date-fns";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Chart({ data }) {
  let datav2 = data;
  if(datav2.length === 0){
    datav2=[{"date":formatISO9075(new Date(), { representation: 'date' },),"views":0}]
  }
    const xLabelKey = Object.keys(datav2[0]).find((key) => key !== "date");

  const dataWithoutGaps = [];
  datav2.forEach((value, index) => {
    const date = value.date;
    dataWithoutGaps.push({
      date,
      [xLabelKey]: value?.[xLabelKey] || 0,
    });
    const nextDate = datav2?.[index + 1]?.value?.date;
    if (date && nextDate) {
      const daysBetween = differenceInDays(parseISO(nextDate), parseISO(date));
      if (daysBetween > 0) {
        for (let i = 1; i < daysBetween; i++) {
          const dateBetween = formatISO9075(
            addDays(parseISO(date), i).split(" ")[0]
          );
          dataWithoutGaps.push({
            date: dateBetween,
            [xLabelKey]: 0,
          });
        }
      }
    }
  });

  return (
    <div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={730}
          height={250}
          data={dataWithoutGaps}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid horizontal={false} strokeWidth="2" stroke="#f5f5f5" />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tick={{ fill: "#aaa" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tick={{ fill: "#aaa" }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey={xLabelKey}
            stroke="#6fc276"
            strokeWidth="4"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
