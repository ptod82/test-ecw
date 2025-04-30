import React, { useEffect, useState, useRef } from "react";
import styled, { css, keyframes } from "styled-components";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const popUp = keyframes`
  from { transform: scale(0.8); }
  to { transform: scale(1); }
`;

const growRing = keyframes`
  0% {
    transform: scale(0.1);
    opacity: 0.4;
  }
  100% {
    transform: scale(1.2);
    opacity: 1;
  }
`;

// Styled Components
const CounterContainerWrapper = styled.div`
  display: flex;
  gap: 4rem;
  justify-content: center;
  margin: 90px 0;
`;

const CounterBlockWrapper = styled.div`
  display: flex;
  flex: 1;
  max-width: 300px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: white;
  background-color: #474747;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: scale(0.8);

  ${({ visible, index }) =>
    visible &&
    css`
      animation: ${popUp} 0.5s ease-out forwards;
      animation-delay: ${index * 0.2}s;
    `}
`;

const CounterNumber = styled.div`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgb(141, 141, 141);
  flex: 1;
  width: 80%;
  text-align: center;
  opacity: 0;
  ${({ visible }) =>
    visible &&
    css`
      animation: ${fadeIn} 2s forwards;
    `}
`;

const CounterText = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  flex: 1;
`;

const IconWrapper = styled.div`
  position: relative;
  width: 90px;
  height: 90px;
  margin: auto;
  margin-bottom: 1rem;
`;

const CounterIcon = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  z-index: 2;
  position: absolute;
  top: 5px;
  left: 5px;
`;

const ProgressRing = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  transform: rotate(-90deg);
  z-index: 1;
`;

const ProgressRingCircle = styled.circle`
  stroke: #00b4ac;
  stroke-width: 10;
  fill: transparent;
  stroke-dasharray: 251.2;
  stroke-dashoffset: ${({ offset }) => offset};
  transition: stroke-dashoffset 0.3s ease;
`;

// Counter Block Component
const CounterBlock = ({ target, text, icon, index, startCounter }) => {
  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(251.2);

  useEffect(() => {
    if (!startCounter) return;

    let start = 0;
    const duration = 2000;
    const interval = 30;
    const step = Math.ceil(target / (duration / interval));
    const totalLength = 251.2;

    const counter = setInterval(() => {
      start += step;
      if (start >= target) {
        start = target;
        clearInterval(counter);
      }

      setCount(start);
      setOffset(totalLength * (1 - start / target));
    }, interval);

    return () => clearInterval(counter);
  }, [startCounter, target]);

  const formatNumber = (num) => new Intl.NumberFormat("de-DE").format(num);

  return (
    <CounterBlockWrapper visible={startCounter} index={index}>
      <CounterNumber visible={startCounter}>
        {formatNumber(count)}
      </CounterNumber>
      <CounterText>{text}</CounterText>
      <IconWrapper>
        <ProgressRing width="90" height="90">
          <ProgressRingCircle offset={offset} r="40" cx="45" cy="45" />
        </ProgressRing>
        <CounterIcon src={icon} alt={text} />
      </IconWrapper>
    </CounterBlockWrapper>
  );
};

// Counter Container Component
export default function CounterContainer({ id, icons, texts, targetNumbers }) {
  const [startCounter, setStartCounter] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStartCounter(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const container = containerRef.current;
    if (container) observer.observe(container);

    return () => {
      if (container) observer.unobserve(container);
    };
  }, []);

  return (
    <CounterContainerWrapper ref={containerRef} id={id} >
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
    </CounterContainerWrapper>
  );
}
