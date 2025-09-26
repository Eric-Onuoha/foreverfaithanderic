import React, { useEffect, useState, useRef } from "react";
import "./countdownPreview.styles.scss";


const bigDay = "2025-12-13T00:00:00+01:00";

function pad(n) {
  return String(n).padStart(2, "0");
}

function msToParts(ms) {
  const sign = ms < 0 ? -1 : 1;
  let t = Math.abs(ms);
  const days = Math.floor(t / (24 * 3600 * 1000));
  t -= days * 24 * 3600 * 1000;
  const hours = Math.floor(t / (3600 * 1000));
  t -= hours * 3600 * 1000;
  const minutes = Math.floor(t / (60 * 1000));
  t -= minutes * 60 * 1000;
  const seconds = Math.floor(t / 1000);
  return { sign, days, hours, minutes, seconds };
}

const CountDownPreview = ({ className = "", showAfter = true }) => {
  const [now, setNow] = useState(() => new Date());
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => setNow(new Date()), 250);
    return () => clearInterval(intervalRef.current);
  }, []);

  const target = new Date(bigDay);
  const diffMs = target.getTime() - now.getTime();
  const parts = msToParts(diffMs);

  const isPast = diffMs < 0;
  const containerLabel = isPast ? "since our big day" : "until our big day";

  return (
    <div id="countdownPreviewComponent">
      <div className={`countdown-card ${className}`.trim()} aria-live="polite">
      <div className="countdown-header">
        <h3>Countdown {containerLabel}</h3>
      </div>

      <div className={`ticker ${isPast ? "past" : "future"}`}>
        <div className="unit">
          <div className="value">{parts.days}</div>
          <div className="label">{parts.days === 1 ? "Day" : "Days"}</div>
        </div>

        <div className="unit">
          <div className="value">{pad(parts.hours)}</div>
          <div className="label">{parts.hours === 1 ? "Hour" : "Hours"}</div>
        </div>

        <div className="unit">
          <div className="value">{pad(parts.minutes)}</div>
          <div className="label">{parts.minutes === 1 ? "Minute" : "Minutes"}</div>
        </div>

        <div className="unit seconds-unit">
          <div className="value pulse">{pad(parts.seconds)}</div>
          <div className="label">{parts.seconds === 1 ? "Second" : "Seconds"}</div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CountDownPreview;