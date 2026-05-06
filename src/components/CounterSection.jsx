import React, { useEffect, useRef, useState } from 'react';
import './CounterSection.css';

const parseStatValue = (value) => {
  const match = String(value).match(/^(\d+)(.*)$/);

  if (!match) {
    return { target: 0, suffix: value };
  }

  return {
    target: Number(match[1]),
    suffix: match[2],
  };
};

const stats = [
  { label: 'Established', value: '2019' },
  { label: 'Stores', value: '36' },
  { label: 'Customers', value: '1m+' },
];

const CounterSection = () => {
  const sectionRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return undefined;

    const parsedStats = stats.map((stat) => parseStatValue(stat.value));
    const duration = 1400;
    const startedAt = performance.now();
    let animationFrame;

    const tick = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounts(parsedStats.map(({ target }) => Math.round(target * eased)));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted]);

  return (
    <section className="count-container" ref={sectionRef}>

      
      <div className="count-wrapper">
        {stats.map((stat, index) => {
          const { suffix } = parseStatValue(stat.value);

          return (
            <div key={index} className="count-item">
              <span className="count-label">{stat.label}</span>
              <span className="count-value">{counts[index]}{suffix}</span>
            </div>
          );
        })}
      </div>

  
    </section>
  );
};

export default CounterSection;
