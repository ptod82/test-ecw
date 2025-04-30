import React from "react";
import CounterContainer from "./CounterBlocks";
import AFs from "../assets/Afs.png";
import Myrps from "../assets/Myrps.png";
import Fers from "../assets/Fers.png";
import WorldMap from "./WorldMap2";

export default function Chart() {
  const icons1 = [AFs, Myrps, Fers];
  const texts1 = [
    "Acceleration Facility",
    "Multi-Year Resilience Programmes",
    "First Emergency Responses ",
  ];
  const targetNumbers1 = [28, 35, 35];

  const icons2 = [AFs, Myrps, Fers]; 
  const texts2 = ["Global Budget", "Text 2", "Text 3"];
  const targetNumbers2 = [1000, 2450, 3440];

  return (
    <div>
      <CounterContainer
        id="counter1"
        icons={icons1}
        texts={texts1}
        targetNumbers={targetNumbers1}
      />
      <WorldMap />
      <CounterContainer
        id="counter2"
        icons={icons2}
        texts={texts2}
        targetNumbers={targetNumbers2}
      />
    </div>
  );
}
