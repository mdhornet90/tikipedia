import { useEffect, useState } from "react";
import LargeTitle from "../LargeTitle";
import styles from "./index.module.css";

export default function Loading() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((old) => (old + 1) % 4);
    }, 250);
    return () => clearInterval(interval);
  }, [tick]);

  return (
    <div className={styles.loadingArea}>
      <LargeTitle title={currentState(tick)} />
    </div>
  );
}

function currentState(tick: number): string {
  switch (tick) {
    case 1:
      return "Loading.";
    case 2:
      return "Loading..";
    case 3:
      return "Loading...";
    default:
      return "Loading";
  }
}
