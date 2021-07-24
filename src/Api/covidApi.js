import axiosClient from "./clientApi";

export const userApi = {
  getSummary(params) {
    const url = "/all";
    return axiosClient.get(url, { params });
  },

  getAllCountry() {
    const url = `/jhucsse`;
    return axiosClient.get(url);
  },
  getByCountry(country, params) {
    const url = `/historical/${country}`;
    return axiosClient.get(url, { params });
  },
};
