import _ from "lodash";
import { features } from "../Data/countries.json";

export const checkLogin = () => {
  return window.localStorage.getItem("user");
};

export const checkColor = (number) => {
  if (number < 0) return;
  if (number >= 1e7) return "red";
  if (number >= 1e6 && number < 1e7) return "green";
  if (number >= 0 && number < 1e6) return "blue";
};

export const getLocation = (country) => {
  if (!country) return;
  return _.values(_.pick(country.countryInfo, ["lat", "long"]));
};

export const addCasesToGEOJson = (covidData) => {
  let countryList = features;
  for (let i = 0; i < countryList.length; i++) {
    let country = countryList[i];
    const covidCountry = covidData.find(
      (x) => x.countryInfo.iso3 === country.properties.ISO_A3
    );
    if (covidCountry) {
      const cases = covidCountry.cases;
      const textCases = new Intl.NumberFormat().format(cases);
      const color = checkColor(cases);
      // country.properties.cases = cases;
      // country.properties.textCases = textCases;
      // country.properties.color = color;
      _.setWith(country, "properties.covidCase", {
        cases: cases,
        textCases: textCases,
        color: color,
      });
    }
    if (!covidCountry) {
      // country.properties.cases = 0;
      // country.properties.textCases = "0";
      // country.properties.color = "transparent";
      _.setWith(country, "properties.covidCase", {
        cases: 0,
        textCases: "0",
        color: "transparent",
      });
    }
  }
  return countryList;
};
