import React from "react";
import PropTypes from "prop-types";
import LineChartCovid from "../LineChart";

Country.propTypes = {};

function Country({ country }) {
  return (
    <div>
      <LineChartCovid />
    </div>
  );
}

export default Country;
