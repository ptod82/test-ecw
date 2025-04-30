import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import ReactDOM from "react-dom";
import {
  LegendWrapper,
  LegendTitle,
  LegendColors,
  ColorBlockGroup,
  LegendText,
  Square,
  Light,
  Medium,
  Dark,
  TypeContainer,
  Myrp,
  Fer,
  FooterNote,
} from "./StyledLegend"; 

function LegendContent() {
  return (
    <LegendWrapper>
      <LegendTitle>
        Total funds allocated to active programmes, in millions (M)*
      </LegendTitle>
      <LegendColors>
        <ColorBlockGroup>
          <LegendText>
            <Square /> &lt; $20M
          </LegendText>
          <LegendText>
            <Light /> $20M - $40M
          </LegendText>
          <LegendText>
            <Medium /> $40M - $60M
          </LegendText>
          <LegendText>
            <Dark /> &gt; $60M
          </LegendText>
        </ColorBlockGroup>
        <TypeContainer>
          <div>
            <Myrp>M</Myrp> MYRP
          </div>
          <div>
            <Fer>F</Fer> FER
          </div>
        </TypeContainer>
      </LegendColors>
      <FooterNote>
        * Total cumulative funding allocated to grantees for all programmes
        active in 2024.
      </FooterNote>
    </LegendWrapper>
  );
}

export default function Legend() {
  const map = useMap();
  const legendRef = useRef(L.DomUtil.create("div", "leaflet-control legend"));

  useEffect(() => {
    const legend = L.control({ position: "bottomleft" });

    legend.onAdd = () => {
      return legendRef.current;
    };

    legend.addTo(map);

    return () => {
      legend.remove();
    };
  }, [map]);

  return ReactDOM.createPortal(<LegendContent />, legendRef.current);
}
