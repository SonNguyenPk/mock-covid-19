import HighchartsReact from "highcharts-react-official";
// import Highcharts from "highcharts/highstock";
// import Highcharts from "highcharts";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { createOptionForBarChart } from "Utilise/utilise";

BarChartCovid.propTypes = {};

function BarChartCovid({ continentsData }) {
  const [option, setOption] = useState({});
  const [highCharts, setHighCharts] = useState();
  const globalState = useSelector((state) => state.global);
  const [t] = useTranslation();

  const title = t("home.titleBarChart");
  const subTitle = t("home.subTitleChart");

  useEffect(() => {
    (async () => {
      try {
        const response = await import("highcharts");
        const highCharts = response.default;
        setHighCharts(highCharts);
        const options = createOptionForBarChart(
          highCharts,
          continentsData,
          title,
          subTitle
        );
        setOption(options);
      } catch (error) {}
    })();
  }, [continentsData, globalState.themeMode]);

  return <HighchartsReact highcharts={highCharts} options={option} immutable />;
}

export default React.memo(BarChartCovid);
