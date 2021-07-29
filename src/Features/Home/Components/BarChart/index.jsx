import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { createOptionForBarChart } from "Utilise/utilise";

BarChartCovid.propTypes = {};

function BarChartCovid({ continentsData }) {
  const [option, setOption] = useState();
  const [t] = useTranslation();

  const title = t("home.titleBarChart");
  const subTitle = t("home.subTitleChart");

  useEffect(() => {
    const options = createOptionForBarChart(Highcharts, continentsData, title, subTitle);
    console.log({ options });
    setOption(options);
  }, [continentsData]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={option}
    />
  );
}

export default React.memo(BarChartCovid);
