import React from "react";
import PropTypes from "prop-types";
import { MapContainer, GeoJSON } from "react-leaflet";
import { useTranslation } from "react-i18next";
import { features } from "../../../../Data/countries.json";

Map.propTypes = {};

function Map({ dataCovid }) {
  const [t] = useTranslation();
  const countryStyle = {
    opacity: 0.5,
    color: "black",
    weight: 0.5,
  };
  console.log({ features });

  const handleOnEachCountry = (country, layer) => {
    const name = country.properties.ADMIN;
    const textCases = country.properties.covidCase.textCases;
    layer.bindPopup(`${name} ${t("home.covidCase")}: ${textCases}`);
    layer.options.fillColor = country.properties.covidCase.color;
  };

  return (
    <MapContainer style={{ height: "50vh", width: "100vw" }} zoom={2} center={[20, 30]}>
      <GeoJSON
        style={countryStyle}
        data={dataCovid}
        onEachFeature={handleOnEachCountry}
      />
    </MapContainer>
  );
}

export default React.memo(Map);
