import { useEffect, useState, useRef } from "react";
import theme from "../theme";
const FundraiserProgress = ({ goalAmount, currentAmount }) => {
  const [displayedAmount, setDisplayedAmount] = useState(0);
  const prevAmountRef = useRef(currentAmount);

  useEffect(() => {
    const start = prevAmountRef.current;
    const end = currentAmount;
    const duration = 800; // ms
    const steps = 30;
    const increment = (end - start) / steps;
    let current = start;
    let count = 0;

    const interval = setInterval(() => {
      current += increment;
      count++;
      if (count >= steps || (increment > 0 && current >= end) || (increment < 0 && current <= end)) {
        setDisplayedAmount(end);
        clearInterval(interval);
      } else {
        setDisplayedAmount(Math.round(current));
      }
    }, duration / steps);

    // Store the currentAmount for the next animation
    prevAmountRef.current = currentAmount;

    return () => clearInterval(interval);
  }, [currentAmount]);

  const progress = Math.min((displayedAmount / goalAmount) * 100, 100);

  return (
    <div style={styles.container}>
      <div style={styles.meterContainer}>
        <div
          style={{
            ...styles.filler,
            height: `${progress}%`,
          }}
        />
      </div>
      <div style={styles.text}>
        <div style={styles.amount}>{displayedAmount.toLocaleString('de-DE')} kr</div>
        <div style={styles.goal}>of {goalAmount.toLocaleString('de-DE')} kr</div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "90vw",
    margin: "20px auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: "center",
  },
  meterContainer: {
    position: "relative",
    height: "250px",
    width: "40px",
    border: `3px solid ${theme.palette.secondary.main}`,
    borderRadius: "20px",
    backgroundColor: "#e0e0e0",
    overflow: "hidden",
    margin: "0 auto",
  },
  filler: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: theme.palette.primary.main,
    transition: "height 0.3s ease-out",
    borderRadius: "0 0 20px 20px",
  },
  text: {
    marginTop: "12px",
  },
  amount: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#333",
  },
  goal: {
    fontSize: "0.9rem",
    color: "#666",
  },
};

export default FundraiserProgress;
