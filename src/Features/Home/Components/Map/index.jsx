import map from "@highcharts/map-collection/custom/world.geo.json";
// Import Highcharts
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMap from "highcharts/modules/map";
import React, { useEffect, useState } from "react";
import { createOptionForMap } from "Utilise/utilise";

HighchartsMap(Highcharts);
const inItOption = {
  chart: {
    borderWidth: 0,
    // map: map,
  },

  title: {
    text: "",
  },

  subtitle: {
    text: "",
  },

  colorAxis: {
    dataClasses: [
      {
        color: "blue",
        from: 0,
        name: "<1M",
        // to: 1e6 - 1,
      },
      {
        color: "green",
        from: 1e6,
        name: "<10M",
        // to: 1e7 - 1,
      },
      {
        color: "red",
        // from: 1e7,
        name: ">10M",
      },
    ],
  },

  legend: {
    // enabled: rest.length > 0 ? false : true,
    layout: "horizontal",
    align: "center",
    verticalAlign: "bottom",
  },

  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: "bottom",
    },
  },
  tooltip: {
    pointFormat: "{point.properties.name}: {point.textCases}",
  },

  series: [
    {
      data: "",
      mapData: "",
      joinBy: ["iso-a3", "code3"],
      name: "Total cases",
      states: {
        hover: {
          color: Highcharts.getOptions().colors[2],
        },
      },
    },

    {
      type: "mapline",
      name: "Separators",
      data: "",
      nullColor: "gray",
      showInLegend: false,
      enableMouseTracking: true,
    },
  ],
};

const WorldMap = ({ countriesData }) => {
  const [option, setOption] = useState({});
  useEffect(() => {
    const options = createOptionForMap(
      Highcharts,
      map,
      countriesData,
      "Covid Map",
      "update until today"
    );
    setOption(options);
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
