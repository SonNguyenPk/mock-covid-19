import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MainLayout from "Components/Layouts";
import TabBarNews from "Features/News/Components/TabBarNews";
import { Container, Divider, Grid } from "@material-ui/core";
import { newsApi } from "Api/covidApi";
import NewsCardItem from "Features/News/Components/NewsCardItem";
import _ from "lodash";

NewsPage.propTypes = {};

const initialFilters = {
  country: "us",
  category: "business",
  apiKey: "fa903974bd1c4272b874264bd743e3ef",
};

function NewsPage(props) {
  const [newsList, setNewsList] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    getNewsList(filters);
  }, [filters]);

  const getNewsList = async (filters) => {
    try {
      const newsList = await newsApi.getAllHotNews(filters);
      setNewsList(newsList.sources);
      console.log({ newsList });
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeCategory = (category) => {
    setFilters({ ...filters, category: category });
  };

  return (
    <MainLayout>
      <Container>
        <TabBarNews onChangeCategory={handleChangeCategory} />
        <Divider />
        <Grid container justifyContent="space-between" spacing={3}>
          {newsList &&
            newsList?.map((news) => (
              <Grid item xs={12} sm={6} md={4}>
                <NewsCardItem news={news} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </MainLayout>
  );
}

export default NewsPage;
