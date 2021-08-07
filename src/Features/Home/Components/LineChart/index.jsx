import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// import Highcharts from "highcharts/highstock";
// import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { createOptionForLineChart } from "Utilise/utilise";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

LineChartCovid.propTypes = {
  timelineData: PropTypes.object,
};

function LineChartCovid({ timelineData }) {
  const [option, setOption] = useState({});
  const [highCharts, setHighCharts] = useState();
  const globalState = useSelector((state) => state.global);
  const [t] = useTranslation();

  const title = t("home.titleLineChart");
  const subTitle = t("home.subTitleChart");

  useEffect(() => {
    (async () => {
      try {
        const response = await import("highcharts");
        const highCharts = response.default;
        setHighCharts(highCharts);
        const options = createOptionForLineChart(
          highCharts,
          timelineData,
          title,
          subTitle
        );
        setOption(options);
      } catch (error) {}
    })();
  }, [timelineData, globalState.themeMode]);

  return <HighchartsReact highcharts={highCharts} options={option} immutable />;
}

export default React.memo(LineChartCovid);
