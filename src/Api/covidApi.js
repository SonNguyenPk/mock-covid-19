import axios from "axios";
import axiosClient from "./clientApi";

export const covidApi = {
  getSummary(params) {
    const url = "/all";
    return axiosClient.get(url, { params });
  },
  getTimelineOfWorld(params) {
    const url = `/historical/all`;
    return axiosClient.get(url, { params });
  },
  getAllContinent(params) {
    const url = "/continents";
    return axiosClient.get(url, { params });
  },

  getAllCountry(params) {
    const url = `/countries`;
    return axiosClient.get(url, { params });
  },
  getByCountry(country, params) {
    const url = `/historical/${country}`;
    return axiosClient.get(url, { params });
  },
};
