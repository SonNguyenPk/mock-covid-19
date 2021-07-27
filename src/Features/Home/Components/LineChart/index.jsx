import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { createOptionForLineChart } from "Utilise/utilise";

LineChartCovid.propTypes = {};

function LineChartCovid({ timelineData }) {
  const [option, setOption] = useState();
  const { cases, deaths, recovered } = timelineData;

  useEffect(() => {
    const options = createOptionForLineChart(
      Highcharts,
      timelineData,
      "Detail timeline of covid cases"
    );
    console.log({ options });
    setOption(options);
  }, [cases]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={option}
      //   constructorType={"stockChart"}
    />
  );
}

export default LineChartCovid;
