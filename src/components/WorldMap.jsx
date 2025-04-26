import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps";

// Sample data - Replace this with your actual data (e.g., population, GDP, etc.)
const countryData = {
  "United States": 100,
  Canada: 30,
  Brazil: 20,
  Germany: 85,
  India: 30,
  Australia: 60,
  China: 90,
  // Add more countries and data
};

const WorldMap = () => {
  // GeoJSON URL for world countries
  const geoUrl =
    "https://cdn.jsdelivr.net/gh/johan/world.geo.json@master/countries.geo.json";

  const [data, setData] = useState(null);
  const [tooltipContent, setTooltipContent] = useState("");
  const [clickedCountry, setClickedCountry] = useState(null);

  useEffect(() => {
    const fetchGeoJson = async () => {
      const res = await fetch(geoUrl);
      const geoData = await res.json();
      setData(geoData);
    };

    fetchGeoJson();
  }, []);

  // Function to determine color based on country data value
  const getColor = (countryName) => {
    const value = countryData[countryName];
    if (value <= 30) return "#F3F4F6"; // Light color for low values
    if (value <= 60) return "#FB8C00"; // Medium color for mid-range values
    return "#FF5722"; // Dark color for high values
  };

  return (
    <div style={{ width: "400px", height: "300px", position: "relative" }}>
      {data && (
        <>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 200 }}
          >
            <ZoomableGroup zoom={1} center={[0, 0]} disableZoom>
              {" "}
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const countryName = geo.properties.name;
                    const fillColor = getColor(countryName); // Get color based on the data

                    // Check if the current country is the clicked one
                    const isClicked = clickedCountry === countryName;

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={fillColor}
                        onMouseEnter={() => {
                          const value = countryData[countryName];
                          setTooltipContent(`${countryName}: ${value}`);
                        }}
                        onMouseLeave={() => {
                          setTooltipContent(""); // Hide tooltip when mouse leaves
                        }}
                        onClick={() => {
                          // Toggle the clicked country on click
                          setClickedCountry(isClicked ? null : countryName);
                        }}
                        style={{
                          default: {
                            outline: "none", // Remove outline/border
                            stroke: "#FFFFFF", // No stroke if clicked, else default stroke color
                          },
                          hover: {
                            stroke:  "#FFFFFF", // No stroke if clicked, else default stroke color
                            transition: "all 250ms",
                          },
                          pressed: {
                            fill: "red", // Optional: Change color on click
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>

          {/* Tooltip */}
          {tooltipContent && (
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                color: "#fff",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              {tooltipContent}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WorldMap;
