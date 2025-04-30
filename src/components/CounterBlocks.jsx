import React, { useEffect, useState, useRef } from "react";
import "./Counterblocks.css";

const CounterBlock = ({ target, text, icon, index, startCounter }) => {
  const [count, setCount] = useState(0);
  const circleRef = useRef(null);

  const formatNumber = (num) => {
    return new Intl.NumberFormat("de-DE").format(num);
  };

  useEffect(() => {
    if (!startCounter) return;

    let start = 0;
    const duration = 2000;
    const interval = 30;
    const step = Math.ceil(target / (duration / interval));
    const totalLength = 2 * Math.PI * 40;

    const circle = circleRef.current;

    const counter = setInterval(() => {
      start += step;
      if (start >= target) {
        start = target;
        clearInterval(counter);
      }

      setCount(start);

      if (circle) {
        const progress = start / target;
        const offset = totalLength * (1 - progress);
        circle.style.strokeDashoffset = offset;
      }
    }, interval);

    return () => clearInterval(counter);
  }, [startCounter, target]);

  return (
    <div
      className={`counter-block ${startCounter ? "visible" : ""}`}
      style={{
        animationDelay: `${index * 0.3}s`, // Add delay based on index
      }}
    >
      <div className={`counter-number ${startCounter ? "fade-in" : ""}`}>
        {formatNumber(count)} 
      </div>
      <div className="counter-text">{text}</div>
      <div className="icon-wrapper">
        <svg className="progress-ring" width="90" height="90">
          <circle
            ref={circleRef}
            className={`progress-ring-circle ${count === target ? "done" : ""}`}
            stroke="#00b4ac"
            strokeWidth="10"
            fill="transparent"
            r="40"
            cx="45"
            cy="45"
          />
        </svg>
        <img src={icon} alt={text} className="counter-icon" />
      </div>
    </div>
  );
};

export default function CounterContainer({ id, icons, texts, targetNumbers }) {
  const [startCounter, setStartCounter] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStartCounter(true); 
            entry.target.classList.add("visible"); 
          }
        });
      },
      { threshold: 0.1 } 
    );

    const container = containerRef.current;
    if (container) {
      observer.observe(container);
    }

    return () => {
      if (container) observer.unobserve(container);
    };
  }, []);

  return (
    <div ref={containerRef} className="counter-container" id={id}>
      {targetNumbers.map((num, i) => (
        <CounterBlock
          key={i}
          target={num}
          text={texts[i]}
          icon={icons[i]}
          index={i}
          startCounter={startCounter}
        />
      ))}
    </div>
  );
}
