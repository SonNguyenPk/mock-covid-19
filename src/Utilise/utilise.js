import _ from "lodash";

export const checkLogin = () => {
  return window.localStorage.getItem("user");
};

// bind color follow to number of cases
export const checkColor = (number) => {
  if (number < 0) return;
  if (number >= 1e7) return "red";
  if (number >= 1e6 && number < 1e7) return "green";
  if (number >= 0 && number < 1e6) return "blue";
};

// get continent list and its data
export const filterContinentData = (data) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#9ccc65", "#607d8b"];
  const continentList = [];
  for (let i = 0; i < data.length; i++) {
    continentList.push(_.pick(data[i], ["continent", "cases"]));
    continentList[i].color = COLORS[i];
  }
  return continentList;
};

export const transformToMapData = (data) => {
  const newData = [];
  for (let i = 0; i < data.length; i++) {
    const object = {};
    // object["iso-a3"] = data[i].countryInfo.iso3;
    object.code3 = data[i].countryInfo.iso3;
    object.z = data[i].cases;
    object.textCases = new Intl.NumberFormat().format(data[i].cases);
    object.color = checkColor(data[i].cases);
    newData.push(object);
  }
  return newData;
};

// Create option file for map
export const createOptionForMap = (Highcharts = null, map, mapData, title, subTile) => {
  return {
    chart: {
      borderWidth: 1,
      map: map,
    },

    title: {
      text: title,
    },

    subtitle: {
      text: subTile,
    },

    colorAxis: {
      dataClasses: [
        {
          color: "blue",
          from: 0,
          name: "<1M",
          to: 1e6 - 1,
        },
        {
          color: "green",
          from: 1e6,
          name: "<10M",
          to: 1e7 - 1,
        },
        {
          color: "red",
          from: 1e7,
          name: ">10M",
        },
      ],
    },

    legend: {
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
        data: mapData,
        mapData: map,
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
        data: mapData,
        nullColor: "gray",
        showInLegend: false,
        enableMouseTracking: true,
      },
    ],
  };
};

export const createOptionForLineChart = (
  Highcharts = null,
  chartData,
  title,
  subTile = ""
) => {
  return {
    chart: {
      zoomType: "x",
    },
    title: {
      text: title,
    },
    subtitle: {
      text:
        document.ontouchstart === undefined
          ? "Click and drag in the plot area to zoom in"
          : "Pinch the chart to zoom in",
    },
    xAxis: {
      type: "datetime",
    },
    yAxis: {
      title: {
        text: "Total cases",
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [
              1,
              Highcharts.color(Highcharts.getOptions().colors[0])
                .setOpacity(0)
                .get("rgba"),
            ],
          ],
        },
        marker: {
          radius: 2,
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1,
          },
        },
        threshold: null,
      },
    },

    series: [
      {
        type: "area",
        name: "Cases in period",
        data: chartData,
      },
    ],
  };
};
