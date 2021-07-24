import { covidApi } from "Api/covidApi";
import MainLayout from "Components/Layouts";
import Loading from "Components/Loading";
import WorldCovidMap from "Features/Home/Components/Map";
import React, { useEffect, useState } from "react";
import { addCasesToGEOJson } from "Utilise/utilise";

HomePage.propTypes = {};

function HomePage(props) {
  const [covidData, setCovidData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({ lastdays: 30 });

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data = await covidApi.getAllCountry();
        const newData = addCasesToGEOJson(data);
        setCovidData(newData);
        setIsLoading(false);
      } catch (error) {
        console.log({ error });
      }
    })();
  }, []);

  return (
    <div>
      <MainLayout>
        {isLoading && <Loading />}
        {covidData && <WorldCovidMap dataCovid={covidData} />}
      </MainLayout>
    </div>
  );
}

export default HomePage;
