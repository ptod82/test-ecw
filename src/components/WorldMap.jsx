import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js";
import {
  ChoroplethController,
  GeoFeature,
  ProjectionScale,
  ColorScale,
} from "chartjs-chart-geo";
import { CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import * as ChartGeo from "chartjs-chart-geo";

Chart.register(
  ChoroplethController,
  GeoFeature,
  ProjectionScale,
  ColorScale,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const countryValues = {
  Afghanistan: { value: 75, FERs: "F", MYRPs: "M" },
  Uganda: { value: 65, FERs: "", MYRPs: "M" },
  Brazil: { value: 80, FERs: "F", MYRPs: "M" },
  India: { value: 90, FERs: "F", MYRPs: "" },
  China: { value: 50, FERs: "F", MYRPs: "" },
  Tanzania: { value: 60, FERs: "F", MYRPs: "M" },
  Somalia: { value: 55, FERs: "F", MYRPs: "" },
  Benin: { value: 70, FERs: "F", MYRPs: "M" },
};

export default function WorldMap() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    async function fetchWorldData() {
     const res = await fetch(
       "https://unpkg.com/world-atlas@2.0.2/countries-50m.json"
     );
     const world = await res.json();
     const countries = ChartGeo.topojson
       .feature(world, world.objects.countries)
       .features.filter((feature) => feature.properties.name !== "Antarctica" );

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new Chart(canvasRef.current, {
        type: "choropleth",
        data: {
          labels: countries.map((d) => d.properties.name),
          datasets: [
            {
              label: "Countries",
              data: countries.map((d) => ({
                feature: d,
                value: countryValues[d.properties.name]?.value ?? 0,
                MYRPs: countryValues[d.properties.name]?.MYRPs,
                FERs: countryValues[d.properties.name]?.FERs,
              })),
              showGraticule: false,
            },
          ],
        },
        options: {
          scales: {
            projection: {
              axis: 'x',
              projection: "mercator", // Using the Mercator projection
              scale: 100, // Adjust the scale value to zoom in (higher value = more zoom)
              center: [500, 10], // Adjust center to focus on a specific region (latitude, longitude)
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                title: function (context) {
                  // Get the country name properly
                  return context[0]?.raw?.feature?.properties?.name || "";
                },
                label: function (context) {
                  const value = context.raw?.value ?? 0;

                  if (value !== 0) {
                    return ` $${value} M`;
                  }
                  return null;
                },
                labelTextColor: function () {
                  return "#000";
                },
                footer: function (context) {
                  const MYRPs = context[0]?.raw?.MYRPs || "";
                  const FERs = context[0]?.raw?.FERs || "";

                  if (MYRPs || FERs) {
                    return `${MYRPs} ${FERs}`;
                  }
                  return null;
                },
              },
              backgroundColor: "#f1f1f1",
              titleColor: "#000",
              footerColor: "#333",
              footerFont: { weight: "normal" },
              borderColor: "#ccc",
              borderWidth: 1,
            },
          },
        },
      });
    }

    fetchWorldData();

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{height: "30vh" }}
      />
    </div>
  );
}
