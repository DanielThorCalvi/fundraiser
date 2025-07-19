import { useState } from "react";
import theme from "../theme";
import { addGoal } from "../services/goalService";

const GoalForm = ({ setOpen, setGoals }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid donation amount greater than 0.");
      return;
    }

    setError("");
    const newGoal = await addGoal({ amount: Number(amount), name });
    setGoals(prev => [newGoal, ...prev]);
    setAmount("");
    setName("");
    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.field}>
        <label htmlFor="name" style={styles.label}>Nafn:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.field}>
        <label htmlFor="amount" style={styles.label}>Upphæð:</label>
        <input
          id="amount"
          type="number"
          min="1"
          step="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={styles.input}
          required
        />
      </div>

      {error && <p style={styles.error}>{error}</p>}

      <button type="submit" style={styles.button}>Senda</button>
    </form>
  );
};

const styles = {
  form: {
    maxWidth: "320px",
    margin: "20px auto",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  field: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "6px",
    fontWeight: "600",
    color: "#333",
  },
  input: {
    padding: "8px 12px",
    fontSize: "1rem",
    borderRadius: "4px",
    border: `1px solid ${theme.palette.secondary.main}`,
  },
  button: {
    padding: "10px 16px",
    fontSize: "1rem",
    backgroundColor: theme.palette.primary.main,
    color: "white",
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
  error: {
    color: "red",
    fontSize: "0.9rem",
  },
};

export default GoalForm;