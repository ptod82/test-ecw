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
  Afghanistan: { value: 15, FERs: "F", MYRPs: "M" },
  Uganda: { value: 25, FERs: "", MYRPs: "M" },
  Brazil: { value: 45, FERs: "F", MYRPs: "M" },
  India: { value: 55, FERs: "F", MYRPs: "" },
  China: { value: 65, FERs: "F", MYRPs: "" },
  Tanzania: { value: 35, FERs: "F", MYRPs: "M" },
  Somalia: { value: 50, FERs: "F", MYRPs: "" },
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
        .features.filter((feature) => feature.properties.name !== "Antarctica");

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
              backgroundColor: (context) => {
                const value = context.raw.value;
                if (value < 20) return "#ffe6d6";
                if (value >= 20 && value < 40) return "#fdbb93";
                if (value >= 40 && value < 60) return "#fc9a5e";
                return "#fc7828";
              },
            },
          ],
        },
        options: {
          scales: {
            projection: {
              axis: "x",
              projection: "mercator",
            },
            color: {
              axis: "x",
              interpolate: (v) => (v < 0.5 ? "transparent" : "transparent"),
              legend: {
                display: false,
              },
            },
          },

          plugins: {
            legend: {
              display: true,
              labels: {
                generateLabels(chart) {
                  return [
                    {
                      text: "< 20",
                      fillStyle: "#ffe6d6",
                      strokeStyle: "#ffe6d6",
                    },
                    {
                      text: "20 - 40",
                      fillStyle: "#fdbb93",
                      strokeStyle: "#fdbb93",
                    },
                    {
                      text: "40 - 60",
                      fillStyle: "#fc9a5e",
                      strokeStyle: "#fc9a5e",
                    },
                    {
                      text: "> 60",
                      fillStyle: "#fc7828",
                      strokeStyle: "#fc7828",
                    },
                  ];
                },
              },
            },
            tooltip: {
              callbacks: {
                title: function (context) {
                  return context[0]?.raw?.feature?.properties?.name || "";
                },
                label: function (context) {
                  const value = context.raw?.value ?? 0;
                  if (value !== 0) {
                    return ` $${value} M`;
                  }
                  return null;
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
              borderColor: "#ccc",
              bodyColor: "#000", 
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
    <div style={{ width: "100vw", height: "100vh" }}>
      <canvas ref={canvasRef} />
    </div>
  );
}
