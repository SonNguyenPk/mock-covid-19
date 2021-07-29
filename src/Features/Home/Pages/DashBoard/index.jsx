import { Container, Grid } from "@material-ui/core";
import { covidApi } from "Api/covidApi";
import MainLayout from "Components/Layouts";
import LineChartCovid from "Features/Home/Components/LineChart";
import BarChartCovid from "Features/Home/Components/BarChart";
import WorldMap from "Features/Home/Components/Map";
import React, { useEffect, useState } from "react";
import {
  countNumberOfDay,
  filterContinentDataMapToChart,
  transformDataMapToChart,
  transformToMapData,
} from "Utilise/utilise";
import { dataColorList } from "Constants/constants";
import TableCountriesCovid from "Features/Home/Components/Table";

HomePage.propTypes = {};

function HomePage(props) {
  const [countriesData, setCountriesData] = useState();
  const [continentsData, setContinentsData] = useState();
  const [timelineData, setTimelineData] = useState();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState();
  const [isGetNewestData, setIsGetNewsData] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllCountryData();
    getContinentsData();
    getTimeLineData();
    setIsLoading(false);
  }, [isGetNewestData]);

  // useMemo(()=>{},[])

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
      setData(dataHighChart);
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
      <Grid>{data && <WorldMap countriesData={data} />}</Grid>
      <Container>
        <Grid container>
          <Grid item xs={12} sm={5}>
            {continentsData && <BarChartCovid continentsData={continentsData} />}
          </Grid>
          <Grid item xs={12} sm={7}>
            {timelineData && <LineChartCovid timelineData={timelineData} />}
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
