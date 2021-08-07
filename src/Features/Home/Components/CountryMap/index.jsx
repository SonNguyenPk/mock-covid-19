// Import Highcharts
import { Typography } from "@material-ui/core";
// import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMap from "highcharts/modules/map";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createOptionForMap } from "Utilise/utilise";

const CountryMap = ({ countriesData }) => {
  const [option, setOption] = useState({});
  const [highCharts, setHighCharts] = useState();
  const globalState = useSelector((state) => state.global);
  const [isError, setIsError] = useState(false);
  const { country } = useParams();
  const countryName = countriesData?.country;
  const [t] = useTranslation();

  useEffect(() => {
    (async () => {
      try {
        const id = _.lowerCase(country);
        const mapImported = await import(
          `@highcharts/map-collection/countries/${id}/${id}-all.geo.json`
        );
        const response = await import("highcharts");
        const mapData = mapImported.default;
        const highCharts = response.default;
        HighchartsMap(highCharts);
        setHighCharts(highCharts);
        const options = createOptionForMap(
          mapData,
          null,
          countryName,
          "",
          "noShowLegend"
        );
        setOption(options);
      } catch (error) {
        console.log(error);
        setIsError(true);
      }
    })();
  }, [country, countriesData, globalState.themeMode]);

  return (
    <>
      {isError ? (
        <Typography>{t("error.failLoadingMap")}</Typography>
      ) : (
        <HighchartsReact
          highcharts={highCharts}
          options={option}
          constructorType={"mapChart"}
          immutable
        />
      )}
    </>
  );
};

export default CountryMap;
