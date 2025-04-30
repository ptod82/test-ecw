import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Legend from "./Legend";

const countryData = {
  Colombia: {
    value: 24.4,
    info: `<span class="myrp">M</span>`,
  },
  Ecuador: {
    value: 15.4,
    info: `<span class="myrp">M</span>`,
  },
  Haiti: {
    value: 14.3,
    info: `<span class="myrp">M</span> <span class="fer">F</span>`,
  },
  Peru: {
    value: 13.4,
    info: `<span class="myrp">M</span>`,
  },
  Armenia: {
    value: 1,
    info: `<span class="fer">F</span>`,
  },
  Moldova: {
    value: 1.5,
    info: `<span class="fer">F</span>`,
  },
  Ukraine: {
    value: 20.4,
    info: `<span class="myrp">M</span>`,
  },
  Afghanistan: {
    value: 30,
    info: `<span class="myrp">M</span>`,
  },
  Egypt: {
    value: 5.5,
    info: `<span class="fer">F</span>`,
  },
  Iraq: {
    value: 21.5,
    info: `<span class="myrp">M</span>`,
  },
  Lebanon: {
    value: 17.7,
    info: `<span class="myrp">M</span> <span class="fer">F</span>`,
  },
  Libya: {
    value: 14.6,
    info: `<span class="myrp">M</span> <span class="fer">F</span>`,
  },
  "West Bank": {
    value: 30,
    info: `<span class="myrp">M</span> <span class="fer">F</span>`,
  },
  Syria: {
    value: 28.5,
    info: `<span class="myrp">M</span> <span class="fer">F</span>`,
  },
  Pakistan: {
    value: 20.7,
    info: `<span class="myrp">M</span> <span class="fer">F</span>`,
  },
  Bangladesh: {
    value: 33.5,
    info: `<span class="myrp">M</span>`,
  },
  Myanmar: {
    value: 19,
    info: `<span class="myrp">M</span>`,
  },
  Yemen: {
    value: 5,
    info: `<span class="fer">F</span>`,
  },
  Ethiopia: {
    value: 72,
    info: `<span class="myrp">M</span> <span class="fer">F</span>`,
  },
  Kenya: {
    value: 2,
    info: `<span class="fer">F</span>`,
  },
  Somalia: {
    value: 18.9,
    info: `<span class="myrp">M</span> <span class="fer">F</span>`,
  },
  "South Sudan": {
    value: 41.5,
    info: `<span class="myrp">M</span> <span class="fer">F</span>`,
  },
  Sudan: {
    value: 29.7,
    info: `<span class="myrp">M</span> <span class="fer">F</span>`,
  },
  Uganda: {
    value: 29.6,
    info: `<span class="myrp">M</span> <span class="fer">F</span>`,
  },
  "Burkina Faso": {
    value: 26.1,
    info: `<span class="myrp">M</span>`,
  },
  Burundi: {
    value: 12,
    info: `<span class="myrp">M</span>`,
  },
  Cameroon: {
    value: 25,
    info: `<span class="myrp">M</span>`,
  },
  Mali: {
    value: 40.8,
    info: `<span class="myrp">M</span>`,
  },
  Niger: {
    value: 11.1,
    info: `<span class="myrp">M</span>`,
  },
  "Central African Republic": {
    value: 42.5,
    info: `<span class="myrp">M</span> <span class="fer">F</span>`,
  },
  Chad: {
    value: 50.9,
    info: `<span class="myrp">M</span> <span class="fer">F</span>`,
  },
  Nigeria: {
    value: 37.6,
    info: `<span class="myrp">M</span> <span class="fer">F</span>`,
  },
  "Democratic Republic of the Congo": {
    value: 28.3,
    info: `<span class="myrp">M</span> <span class="fer">F</span>`,
  },
};

export default function WorldMa () {
  const [geojsonData, setGeojsonData] = useState(null);
  const mapRef = useRef();

  useEffect(() => {
    fetch(
      "https://cdn.jsdelivr.net/gh/johan/world.geo.json@master/countries.geo.json"
    )
      .then((response) => response.json())
      .then((data) => setGeojsonData(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    }, 1000); 
  }, []);

  const getCountryColor = (countryName) => {
    const value = countryData[countryName]?.value;
    if (!value) return "#ccc"; // No data color
    if (value < 20) return "#fcd9c4";
    if (value >= 20 && value < 40) return "#f4ac80";
    if (value >= 40 && value < 60) return "#cc7540";
    return "#ff6100"; // Dark color
  };

  const style = (feature) => {
    return {
      fillColor: getCountryColor(feature.properties.name),
      weight: 1,
      opacity: 1,
      color: "white",
      fillOpacity: 0.7,
    };
  };

  
  const onEachFeature = (feature, layer) => {
    const countryName = feature.properties.name;
    const palestine = feature.properties.name === "West Bank" ? 'Palestine' : null;
    const countryInfo = countryData[countryName];

    if (countryInfo) {
      const tooltipContent = `<b>${palestine ? palestine : countryName}</b>: $${countryInfo.value.toFixed(1)}M <br/> ${countryInfo.info}`;
      layer.bindTooltip(tooltipContent, {
        permanent: false,
        sticky: true,
        direction: "top",
        className: "tooltip",
      });
    }
  };

  return (
    <div style={{ height: "80vh", display: "flex" }}>
      <MapContainer
        center={[0, 0]}
        zoom={3}
        style={{ height: "100%", width: "100%", backgroundColor: "#aad3df" }}
        worldCopyJump={false}
        boxZoom={false}
        attributionControl={false}
        scrollWheelZoom={false}
        doubleClickZoom={false} 
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
      >
        {geojsonData && (
          <GeoJSON
            data={geojsonData}
            style={style}
            onEachFeature={onEachFeature}
          />
        )}
        <Legend />
      </MapContainer>
    </div>
  );
};

