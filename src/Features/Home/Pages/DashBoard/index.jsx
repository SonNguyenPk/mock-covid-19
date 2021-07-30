import { Container, Grid } from "@material-ui/core";
import { covidApi } from "Api/covidApi";
import MainLayout from "Components/Layouts";
import BarChartCovid from "Features/Home/Components/BarChart";
import LineChartCovid from "Features/Home/Components/LineChart";
import WorldMap from "Features/Home/Components/Map";
import TableCountriesCovid from "Features/Home/Components/Table";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  countNumberOfDay,
  filterContinentDataMapToChart,
  transformDataMapToChart,
  transformToMapData,
} from "Utilise/utilise";

HomePage.propTypes = {};

function HomePage(props) {
  const [countriesData, setCountriesData] = useState();
  const [continentsData, setContinentsData] = useState();
  const [timelineData, setTimelineData] = useState();
  const [summaryData, setSummaryData] = useState();
  const [mapData, setMapData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState();
  const [isGetNewestData, setIsGetNewsData] = useState(false);
  const [t] = useTranslation();

  useEffect(() => {
    setIsLoading(true);

    getAllCountryData();
    getContinentsData();
    getTimeLineData();
    getSummaryOfWorldData();

    setIsLoading(false);
  }, [isGetNewestData]);

  const getSummaryOfWorldData = async () => {
    try {
      const summaryData = await covidApi.getSummary();
      const dateUpdate = moment(summaryData.updated).format("L");
      summaryData.dateUpdated = dateUpdate;
      setSummaryData(summaryData);
    } catch (error) {}
  };

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

  const getAllCountryData = async () => {
    try {
      const data = await covidApi.getAllCountry();
      const dataHighChart = transformToMapData(data);
      setMapData(dataHighChart);
      setCountriesData(data);
    } catch (error) {
      console.log({ error });
    }
  };

  const getContinentsData = async () => {
    try {
      const continentsData = await covidApi.getAllContinent();
      setContinentsData(filterContinentDataMapToChart(continentsData));
    } catch (error) {
      console.log({ error });
    }
  };

  const handleUpdateNewData = () => {
    if (isGetNewestData) {
      setIsGetNewsData(false);
    }
    if (!isGetNewestData) {
      setIsGetNewsData(true);
    }
  };

  return (
    <MainLayout>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            {mapData && <WorldMap countriesData={mapData} />}
          </Grid>
          <Grid item xs={12}>
            <h2>{}</h2>
          </Grid>
          <Grid item xs={12} sm={5}>
            {continentsData && <BarChartCovid continentsData={continentsData} />}
          </Grid>
          <Grid item xs={12} sm={7}>
            {timelineData && <LineChartCovid timelineData={timelineData} />}
          </Grid>
          <Grid>
            <h3>{t("home.tableTitle")}</h3>
          </Grid>
          <Grid item xs={12}>
            {countriesData && <TableCountriesCovid countriesData={countriesData} />}
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  );
}

export default HomePage;
