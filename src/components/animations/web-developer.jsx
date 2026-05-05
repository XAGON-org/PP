import { useEffect, useState, useCallback } from "react";

export default function MorphTextLoop({
  texts = [],
  speed = 120,
  intervalTime = 2500,
  className = "",
  parentClassName = "",
}) {
  const [current, setCurrent] = useState(texts[0] || "");
  const [index, setIndex] = useState(0);

  const morphOnce = useCallback((start, end, done) => {
    let i = 0;
    const max = Math.max(start.length, end.length);

    const interval = setInterval(() => {
      i++;

      const next =
        end.slice(0, i) +
        start.slice(i);

      setCurrent(next.padEnd(max, " "));

      if (i >= max) {
        clearInterval(interval);
        done && done();
      }
    }, speed);
  }, [speed]);

  useEffect(() => {
    if (texts.length < 2) return;

    const loop = setInterval(() => {
      const nextIndex = (index + 1) % texts.length;

      morphOnce(texts[index], texts[nextIndex], () => {
        setIndex(nextIndex);
      });
    }, intervalTime);

    return () => clearInterval(loop);
  }, [index, texts, intervalTime, morphOnce]);

  return (
    <span className={parentClassName}>
      {current.split("").map((ch, i) => (
        <span key={i} className={className}>
          {ch}
        </span>
      ))}
    </span>
  );
}