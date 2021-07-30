// Import Highcharts
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMap from "highcharts/modules/map";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createOptionForMap } from "Utilise/utilise";

HighchartsMap(Highcharts);

const CountryMap = ({ countriesData }) => {
  const [option, setOption] = useState();
  const { country } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const countryName = countriesData.country;
        const id = _.lowerCase(country);
        const mapImported = await import(
          `@highcharts/map-collection/countries/${id}/${id}-all.geo.json`
        );
        const mapData = mapImported.default;
        const options = createOptionForMap(
          Highcharts,
          mapData,
          null,
          countryName,
          "",
          "noShowLegend"
        );
        console.log({ options });
        setOption(options);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [country, countriesData]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={option}
      constructorType={"mapChart"}
    />
  );
};

export default CountryMap;
