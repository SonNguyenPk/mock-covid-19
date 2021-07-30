import { Container, Grid, Typography } from "@material-ui/core";
import { covidApi } from "Api/covidApi";
import MainLayout from "Components/Layouts";
import CountryMap from "Features/Home/Components/CountryMap";
import LineChartCovid from "Features/Home/Components/LineChart";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { countNumberOfDay, transformDataMapToChart } from "Utilise/utilise";

CountryDetail.propTypes = {};

function CountryDetail(props) {
  const { country } = useParams();
  const [countryDataTimeline, setCountryDataTimeline] = useState();
  const [countrySummary, setCountrySummary] = useState();

  useEffect(() => {
    getCountryDetail(country);
    getCountrySummary(country);
  }, [country]);

  const getCountryDetail = async () => {
    try {
      const numberOfDay = countNumberOfDay();
      const timelineData = await covidApi.getByCountry(country, {
        lastdays: numberOfDay,
      });
      const dataMapToChart = transformDataMapToChart(timelineData.timeline);
      setCountryDataTimeline(dataMapToChart);
    } catch (error) {}
  };

  const getCountrySummary = async (country) => {
    try {
      const summaryData = await covidApi.getSummaryOfCountry(country);
      setCountrySummary(summaryData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <MainLayout>
        <Container>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <CountryMap countriesData={countrySummary} />
            </Grid>
            <Grid item xs={12}>
              {/* <Typography>
                ` In Russian Federation, from 3 January 2020 to 6:17pm CEST, 29 July 2021,
                there have been 6,195,232 confirmed cases of COVID-19 with 156,178 deaths,
                reported to WHO. As of 24 July 2021, a total of 52,782,888 vaccine doses
                have been administered.`
              </Typography> */}
            </Grid>
            <Grid item xs={12}>
              {countryDataTimeline && (
                <LineChartCovid timelineData={countryDataTimeline} />
              )}
            </Grid>
          </Grid>
        </Container>
      </MainLayout>
    </div>
  );
}

export default CountryDetail;
