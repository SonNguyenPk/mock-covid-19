import map from "@highcharts/map-collection/custom/world.geo.json";
import { darkTheme } from "Constants/themeHighcharts";
// Import Highcharts
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMap from "highcharts/modules/map";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createOptionForMap } from "Utilise/utilise";

// HighchartsMap(Highcharts);

const WorldMap = ({ countriesData, isLoading }) => {
  const [option, setOption] = useState({});
  const [highCharts, setHighCharts] = useState();
  const globalState = useSelector((state) => state.global);

  useEffect(() => {
    (async () => {
      try {
        const response = await import("highcharts");
        const highCharts = response.default;
        console.log({ highCharts });
        HighchartsMap(highCharts);
        setHighCharts(highCharts);

        const options = createOptionForMap(
          map,
          countriesData,
          "Covid Map",
          "update until today"
        );
        setOption(options);
        console.log("re-render");
      } catch (error) {}
    })();
  }, [countriesData, globalState.themeMode]);
  return (
    <HighchartsReact
      highcharts={highCharts}
      options={option}
      constructorType={"mapChart"}
      immutable
    />
  );
};

export default React.memo(WorldMap);
