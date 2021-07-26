import { covidApi } from "Api/covidApi";
import MainLayout from "Components/Layouts";
import WorldMap from "Features/Home/Components/Map";
import React, { useEffect, useState } from "react";
import { filterContinentData, transformToMapData } from "Utilise/utilise";

HomePage.propTypes = {};

function HomePage(props) {
  const [countriesData, setCountriesData] = useState();
  const [continentsData, setContinentsData] = useState();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({ lastdays: 30 });
  const [isGetNewestData, setIsGetNewsData] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllCountryData();
    getContinentsData();
    setIsLoading(false);
  }, [isGetNewestData]);

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
      <MainLayout>{data && <WorldMap countriesData={data} />}</MainLayout>
    </div>
  );
}

export default HomePage;
