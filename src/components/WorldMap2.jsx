import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const countryData = {
  USA: 75,
  Canada: 65,
  Brazil: 80,
  India: 90,
  China: 50,
};

const WorldMap = () => {
  const [geojsonData, setGeojsonData] = useState(null);

  useEffect(() => {
    fetch(
      "https://cdn.jsdelivr.net/gh/johan/world.geo.json@master/countries.geo.json"
    )
      .then((response) => response.json())
      .then((data) => setGeojsonData(data))
      .catch((err) => console.log(err));
  }, []);

  const getCountryColor = (countryName) => {
    const value = countryData[countryName];
    if (!value) return "#ccc"; 

    if (value <= 50) return "#ffeda0"; // Light color
    if (value <= 70) return "#feb24c"; // Medium color
    return "#f03b20"; // Dark color
  };

  const style = (feature) => {
    return {
      fillColor: getCountryColor(feature.properties.name),
      weight: 1,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
    };
  };

  const onEachFeature = (feature, layer) => {
    const countryName = feature.properties.name;
    const value = countryData[countryName];

    const tooltipContent = `${countryName}: ${value ? value : "No data"}`;
    layer.bindTooltip(tooltipContent, { permanent: false, sticky: true });
  };

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={2}
      style={{ height: "100vh", width: "100%" }}
      zoomControl={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      boxZoom={false}
      dragging={false}
      worldCopyJump={true}      
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {geojsonData && (
        <GeoJSON
          data={geojsonData}
          style={style}
          onEachFeature={onEachFeature}
        />
      )}
    </MapContainer>
  );
};

export default WorldMap;
