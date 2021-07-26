import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import _ from "lodash";
import { Box, Chip } from "@material-ui/core";

const renderLegend = (props) => {
  const { payload } = props;
  const list = payload[0]?.payload?.children;

  return (
    <Box display="flex" mt="1rem">
      {list?.map((entry, index) => (
        <Chip
          key={`item-${index}`}
          label={entry.props.name}
          style={{ backgroundColor: `${entry.props.fill}` }}
        />
      ))}
    </Box>
  );
};

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="custom-tooltip">
//         <p className="label">{`${label} : ${payload[0].value}`}</p>
//         <p className="desc">Anything you want can be displayed here.</p>
//       </div>
//     );
//   }
// };

const CovidBarChart = ({ data }) => {
  const total = _.sumBy(data, "cases");
  console.log({ total });

  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="continent" hide tickCount={7} />
      <YAxis dataKey="cases" name="Total cases" />
      <Tooltip />

      <Legend content={renderLegend} />
      <Bar dataKey="cases">
        {data?.map((entry, index) => (
          <Cell
            name={entry.continent}
            key={`cell-${index}`}
            // stroke={entry.color}
            fill={entry.color}
            strokeWidth={index === 2 ? 4 : 1}
          />
        ))}
      </Bar>
    </BarChart>
  );
};

export default React.memo(CovidBarChart);
