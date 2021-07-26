import React, { useEffect, useState } from "react";
import { render } from "react-dom";
// Import Highcharts
import Highcharts from "highcharts";
import HighchartsMap from "highcharts/modules/map";
import HighchartsReact from "highcharts-react-official";

import map from "@highcharts/map-collection/custom/world.geo.json";
import { createOptionForMap } from "Utilise/utilise";

HighchartsMap(Highcharts);

const WorldMap = ({ countriesData }) => {
  const [option, setOption] = useState();
  useEffect(() => {
    const options = createOptionForMap(
      Highcharts,
      map,
      countriesData,
      "Covid Map",
      "update until today"
    );
    setOption(options);
    console.log({ options });
  }, [countriesData]);
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={option}
      constructorType={"mapChart"}
    />
  );
};

export default React.memo(WorldMap);
