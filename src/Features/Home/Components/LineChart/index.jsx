import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { createOptionForLineChart } from "Utilise/utilise";
import { useTranslation } from "react-i18next";

LineChartCovid.propTypes = {
  timelineData: PropTypes.object,
};

function LineChartCovid({ timelineData }) {
  console.log({ timelineData });
  const [option, setOption] = useState({});

  const [t] = useTranslation();

  const title = t("home.titleLineChart");
  const subTitle = t("home.subTitleChart");

  useEffect(() => {
    const options = createOptionForLineChart(Highcharts, timelineData, title, subTitle);
    setOption(options);
  }, [timelineData]);

  return <HighchartsReact highcharts={Highcharts} options={option} />;
}

export default React.memo(LineChartCovid);
