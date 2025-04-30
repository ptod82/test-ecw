import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

export const LeafletGlobalStyles = createGlobalStyle`
  .leaflet-tooltip.custom-tooltip {
    display: block !important;
    visibility: visible !important;
    pointer-events: auto !important;
    z-index: 9999 !important;

    font-size: 15px;
    background-color: rgb(78, 63, 48);
    border: 1px solid rgb(78, 63, 48);
    color: white;
    border-radius: 8px;
    padding: 5px 10px 8px;
  }
  

  .leaflet-marker-icon.leaflet-interactive, .leaflet-image-layer.leaflet-interactive, .leaflet-pane > svg path.leaflet-interactive, svg.leaflet-image-layer.leaflet-interactive path{
    cursor: pointer;
    pointer-events: auto;
  }

  .leaflet-container .leaflet-control-container .leaflet-top.leaflet-left{
    left: 1vw!important;
    bottom: 250px!important;
    top: auto!important;
    position: absolute
  }

  .leaflet-interactive:focus {
    outline: none!important;
  }

  .leaflet-container {
    pointer-events: auto !important;
    touch-action: auto !important;
  }

  .leaflet-tooltip.custom-tooltip .myrp {
    background-color: purple;
    color: white;
    border-radius: 40px;
    font-size: smaller;
    width: 20px;
    height: 20px;
    justify-content: center;
    display: inline-flex;
    align-items: center;
    border: 1px solid white;
    margin-top: 4px;
    margin-right: 5px;
  }

  /* FER Circle */
  .leaflet-tooltip.custom-tooltip .fer {
    background-color: red;
    color: white;
    border-radius: 40px;
    font-size: smaller;
    width: 20px;
    height: 20px;
    justify-content: center;
    display: inline-flex;
    align-items: center;
    border: 1px solid white;
    margin-top: 4px;
    margin-right: 2px;
  }

  #map-custom .leaflet-control.legend:hover{
    pointer-event: none!important
  }   
`;



export const LegendWrapper = styled.div`
  background-color: rgb(229, 229, 229);
  width: 220px;
  border: 1px solid #999;
  border-radius: 10px;
  padding: 20px;
  font-size: 13px;
  position: absolute;
  bottom: 10px;
  left: 10px;
`;

export const LegendTitle = styled.b`
  display: block;
  margin-bottom: 10px;
`;

export const LegendColors = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ColorBlockGroup = styled.div``;

export const LegendText = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const Square = styled.div`
  width: 10px;
  height: 10px;
  margin-right: 5px;
  background-color: #fcd9c4;
`;

export const Light = styled(Square)`
  background-color: #f4ac80;
`;

export const Medium = styled(Square)`
  background-color: #cc7540;
`;

export const Dark = styled(Square)`
  background-color: #ff6100;
`;


export const TypeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Myrp = styled.div`
  background-color: purple;
  color: white;
  border-radius: 40px;
  font-size: smaller;
  width: 20px;
  height: 20px;
  justify-content: center;
  display: inline-flex;
  align-items: center;
  border: 1px solid white;
  margin-top: 4px;
  margin-right: 5px;
`;

export const Fer = styled.div`
  background-color: red;
  color: white;
  border-radius: 40px;
  font-size: smaller;
  width: 20px;
  height: 20px;
  justify-content: center;
  display: inline-flex;
  align-items: center;
  border: 1px solid white;
  margin-top: 4px;
  margin-right: 5px;
`;

export const FooterNote = styled.span`
  font-size: smaller;
  font-style: italic;
  line-height: 1.2;
  display: block;
  margin-top: 10px;
`;
