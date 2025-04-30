import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

export default function Legend (){
  const map = useMap();

  useEffect(() => {
    const legend = L.control({ position: "bottomleft" });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");
      div.innerHTML = `
        <div class="legend-container">
          <b>Total funds allocated to active programmes, in millions (M)*</b>
          <div class="legend-colors">
            <div>
              <div class="legend-text"><span class="square"></span> < $20M</div>
              <div class="legend-text"><span class="square light"></span> $20M - $40M</div>
              <div class="legend-text"><span class="square medium"></span> $40M - $60M</div>
              <div class="legend-text"><span class="square dark"></span> > $60M</div>
            </div>
            <div style="flex-direction: column; display: flex">
              <div><div class="myrp">M</div> MYRP </div>
               <div><div class="fer">F</div> FER </div>
            </div>
          </div>
          <span>* Total cumulative funding allocated to grantees for all
programmes active in 2024.</span>
        </div>
      `;
      return div;
    };

    legend.addTo(map);

    // Cleanup on unmount
    return () => {
      legend.remove();
    };
  }, [map]);

  return null;
};

