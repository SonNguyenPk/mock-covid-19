import { FlashOnRounded, SyncDisabled } from "@material-ui/icons";
import _, { repeat } from "lodash";
import moment from "moment";

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

export const transformToMapData = (data) => {
  const newData = [];
  for (let i = 0; i < data.length; i++) {
    const object = {};
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
      borderWidth: 0,
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
      layout: "horizontal",
      align: "center",
      verticalAlign: "bottom",
    },

    responsive: {
      maxWidth: "100%",
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

// transform value map to chart
export const transformDataMapToChart = (data) => {
  if (data) {
    const { cases, deaths, recovered } = data;
    const dataCases = _.values(cases);
    const dataDeaths = _.values(deaths);
    const dataRecovered = _.values(recovered);
    const timeline = _.keys(cases);
    return {
      cases: dataCases,
      deaths: dataDeaths,
      recovered: dataRecovered,
      timeline: timeline,
    };
  }
};

// Create option for line chart
export const createOptionForLineChart = (
  Highcharts = null,
  chartData,
  title,
  subTitle
) => {
  const totalDay = chartData.cases.length;

  return {
    chart: {
      zoomType: "x",
    },
    title: {
      text: title,
    },

    subtitle: {
      text: subTitle,
    },

    yAxis: {
      title: {
        text: "Number",
      },
    },

    xAxis: {
      categories: chartData.timeline,
      accessibility: {
        rangeDescription: "As of today",
      },
      title: {
        text: "Day",
      },
    },
    // responsive: {
    //   maxWidth: "100%",
    // },
    legend: {
      layout: "horizontal",
      align: "center",
      verticalAlign: "bottom",
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },

    series: [
      {
        name: "Cases",
        data: chartData.cases,
      },
      {
        name: "Death",
        data: chartData.deaths,
        color: "red",
      },
      {
        name: "Recovered",
        data: chartData.recovered,
      },
    ],
  };
};

//Count day for filter covid case
export const countNumberOfDay = (dateFrom = "01-11-2019", dateTo = "") => {
  const pastDate = moment(dateFrom, "DD-MM-YYYY");
  if (!dateTo) {
    const today = moment();
    const days = today.diff(pastDate, "days");
    return today.diff(pastDate, "days");
  }
  const dateCount = moment(dateTo, "DD-MM-YYYY");
  return dateCount.diff(pastDate, "days");
};

export const filterContinentDataMapToChart = (data) => {
  console.log({ data });
  const continentList = [];
  for (let i = 0; i < data.length; i++) {
    continentList.push({ name: data[i].continent, data: [data[i].cases] });
  }
  console.log({ continentList });
  return continentList;
};

export const createOptionForBarChart = (
  Highcharts = null,
  chartData,
  title,
  subTitle
) => {
  return {
    chart: {
      type: "bar",
    },
    title: {
      text: title,
    },
    subtitle: {
      text: subTitle,
    },
    xAxis: {
      title: {
        text: "Continent",
      },
    },
    // responsive: {
    //   maxWidth: "100%",
    // },
    yAxis: {
      title: {
        text: "Total cases",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
    },
    tooltip: {},
    plotOptions: {
      bar: {
        groupPadding: 0.1,
        dataLabels: {
          enabled: true,
        },
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "bottom",
      x: 0,
      y: -40,
      floating: true,
      borderWidth: 1,
      backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
      shadow: true,
    },
    credits: {
      enabled: false,
    },
    series: chartData,
  };
};
