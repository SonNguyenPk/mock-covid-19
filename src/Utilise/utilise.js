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
    const dataCases = _.toPairs(cases);
    const dataDeaths = _.toPairs(deaths);
    const dataRecovered = _.toPairs(recovered);
    console.log(moment("7/12/21", "DD/MM/YY").format());
    console.log({ dataCases });
    return { cases: dataCases, deaths: dataDeaths, recovered: dataRecovered };
  }
};

// Create option for line chart
export const createOptionForLineChart = (Highcharts = null, chartData, title) => {
  const totalDay = chartData.cases.length;
  return {
    chart: {
      zoomType: "x",
    },
    title: {
      text: title,
    },

    subtitle: {
      text: "As of present",
    },

    yAxis: {
      title: {
        text: "Number",
      },
    },

    xAxis: {
      breaks: {
        from: 1,
        to: totalDay,
      },
      accessibility: {
        rangeDescription: "As of today",
      },
      title: {
        text: "Day",
      },
    },
    responsive: {
      maxWidth: "100%",
    },
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

export const filterContinentData = (data) => {
  const continentList = [];
  for (let i = 0; i < data.length; i++) {
    continentList.push(_.pick(data[i], ["continent", "cases"]));
  return continentList;
};

//Create option for bar chart
export const createOptionForBarChart = (Highcharts = null, chartData, title, subTitle) => {
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
      categories: ["Africa", "America", "Asia", "Europe", "Oceania"],
      title: {
        text: null,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Population (millions)",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
    },
    tooltip: {
      valueSuffix: " millions",
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "top",
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
      shadow: true,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Year 1800",
        data: [107, 31, 635, 203, 2],
      },
      {
        name: "Year 1900",
        data: [133, 156, 947, 408, 6],
      },
      {
        name: "Year 2000",
        data: [814, 841, 3714, 727, 31],
      },
      {
        name: "Year 2016",
        data: [1216, 1001, 4436, 738, 40],
      },
    ],
  };
};
