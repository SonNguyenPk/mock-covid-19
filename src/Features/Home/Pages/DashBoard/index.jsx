import { Grid } from "@material-ui/core";
import { covidApi } from "Api/covidApi";
import MainLayout from "Components/Layouts";
import LineChartCovid from "Features/Home/Components/LineChart";
import WorldMap from "Features/Home/Components/Map";
import React, { useEffect, useMemo, useState } from "react";
import {
  countNumberOfDay,
  createDataMapToChart,
  filterContinentData,
  transformDataMapToChart,
  transformToMapData,
} from "Utilise/utilise";

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
      console.log({ dataMapToChart });
      setTimelineData(dataMapToChart);
    } catch (error) {}
  };

  const getAllCountryData = async () => {
    try {
      const data = await covidApi.getAllCountry();
      const dataHighChart = transformToMapData(data);
      setData(dataHighChart);
    } catch (error) {
      console.log({ error });
    }
  };

  const getContinentsData = async () => {
    try {
      const continentsData = await covidApi.getAllContinent();
      setContinentsData(filterContinentData(continentsData));
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
    <div>
      <MainLayout>
        <Grid container>
          <Grid item xs={12}>
            {data && <WorldMap countriesData={data} />}
          </Grid>
          <Grid item xs={12}>
            {timelineData && <LineChartCovid timelineData={timelineData} />}
          </Grid>
        </Grid>
      </MainLayout>
    </div>
  );
}

export default HomePage;
