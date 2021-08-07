import { Container, Grid, Typography } from "@material-ui/core";
import { covidApi } from "Api/covidApi";
import MainLayout from "Components/Layouts";
import BarChartCovid from "Features/Home/Components/BarChart";
import LineChartCovid from "Features/Home/Components/LineChart";
import WorldMap from "Features/Home/Components/Map";
import TableCountriesCovid from "Features/Home/Components/Table";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  countNumberOfDay,
  filterContinentDataMapToChart,
  transformDataMapToChart,
  transformToMapData,
} from "Utilise/utilise";
// import Highcharts from "highcharts";
// import { darkTheme, defaultTheme } from "Constants/themeHighcharts";

HomePage.propTypes = {};

function HomeTitle({ summaryData }) {
  const { updatedAt, cases, deaths, recovered } = summaryData;
  const [t] = useTranslation();

  return (
    <>
      <Trans i18nKey="home.title" t={t}>
        Globally, as of
        <strong style={{ color: "green" }}>{{ updatedAt }}</strong>, there have been
        <strong style={{ color: "blue" }}>{{ cases }}</strong> confirmed cases of
        COVID-19, including <strong style={{ color: "red" }}>{{ deaths }}</strong> deaths,
        <strong style={{ color: "blue" }}>{{ recovered }}</strong> recovered reported to
        WHO
      </Trans>
    </>
  );
}

function HomePage(props) {
  const [countriesData, setCountriesData] = useState();
  const [continentsData, setContinentsData] = useState();
  const [timelineData, setTimelineData] = useState();
  const [mapData, setMapData] = useState();
  const [summaryData, setSummaryData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState();
  const [t] = useTranslation();
  const globalState = useSelector((state) => state.global);

  useEffect(() => getSummaryOfWorldData(), [globalState]);
  useEffect(() => getContinentsData(), []);
  useEffect(() => getTimeLineData(), []);
  useEffect(() => getAllCountryData(), []);

  //change theme darkmode
  // useEffect(() => {
  //   (() => {
  //     setIsLoading(true);
  //     if (globalState.themeMode === "dark") {
  //       Highcharts.theme = darkTheme;
  //       // DarkBlue(Highcharts);
  //       Highcharts.setOptions(Highcharts.theme);

  //     }
  //     if (globalState.themeMode === "light") {
  //       Highcharts.theme = defaultTheme;
  //       Highcharts.setOptions(Highcharts.theme);
  //     }
  //     setIsLoading(false);
  //   })();
  // }, [globalState.themeMode]);

  // data to fill title
  const getSummaryOfWorldData = async () => {
    try {
      const summaryWorldData = await covidApi.getSummary();
      const { updated, cases, deaths, recovered } = summaryWorldData;
      setSummaryData({
        ...summaryData,
        updatedAt:
          globalState.language === "en"
            ? moment(updated).format("LL")
            : moment(updated).format("DD/MM/YYYY"),
        cases: new Intl.NumberFormat().format(+cases),
        deaths: new Intl.NumberFormat().format(+deaths),
        recovered: new Intl.NumberFormat().format(+recovered),
      });
    } catch (error) {}
  };

  // data of line chart
  const getTimeLineData = async () => {
    try {
      const numberOfDayFromToday = countNumberOfDay();
      const newFilters = { lastdays: numberOfDayFromToday };
      setFilters(newFilters);

      const timelineData = await covidApi.getTimelineOfWorld(newFilters);
      const dataMapToChart = transformDataMapToChart(timelineData);
      setTimelineData(dataMapToChart);
    } catch (error) {}
  };

  // data of world map and table
  const getAllCountryData = async () => {
    try {
      const data = await covidApi.getAllCountry();
      const mapData = transformToMapData(data);
      setMapData(mapData);
      setCountriesData(data);
    } catch (error) {
      console.log({ error });
    }
  };

  // data of bar chart
  const getContinentsData = async () => {
    try {
      const continentsData = await covidApi.getAllContinent();
      setContinentsData(filterContinentDataMapToChart(continentsData));
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <MainLayout>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <WorldMap countriesData={mapData} />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5">
              {summaryData && <HomeTitle summaryData={summaryData} />}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={5}>
            {continentsData && <BarChartCovid continentsData={continentsData} />}
          </Grid>
          <Grid item xs={12} sm={7}>
            {timelineData && <LineChartCovid timelineData={timelineData} />}
          </Grid>
          <Grid item xs={12}>
            <h3>{t("home.tableTitle")}</h3>
            {countriesData && <TableCountriesCovid countriesData={countriesData} />}
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  );
}

export default HomePage;
