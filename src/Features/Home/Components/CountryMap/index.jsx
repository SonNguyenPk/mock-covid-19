// Import Highcharts
import { Typography } from "@material-ui/core";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMap from "highcharts/modules/map";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { createOptionForMap } from "Utilise/utilise";

HighchartsMap(Highcharts);

const CountryMap = ({ countryID }) => {
  const [option, setOption] = useState({});
  const globalState = useSelector((state) => state.global);
  const [isError, setIsError] = useState(false);
  const [t] = useTranslation();

  useEffect(() => {
    (async () => {
      try {
        const id = _.lowerCase(countryID);
        const mapImported = await import(
          `@highcharts/map-collection/countries/${id}/${id}-all.geo.json`
        );
        const mapData = mapImported.default;
        const options = createOptionForMap(mapData, null, "", "", "noShowLegend");
        setOption(options);
      } catch (error) {
        console.log(error);
        setIsError(true);
      }
    })();
  }, [countryID, globalState.themeMode]);

  return (
    <>
      {isError ? (
        <Typography>{t("error.failLoadingMap")}</Typography>
      ) : (
        <HighchartsReact
          highcharts={Highcharts}
          options={option}
          constructorType={"mapChart"}
          immutable
        />
      )}
    </>
  );
};

export default React.memo(CountryMap);
