import { useState } from 'react';

export default function Counter({ initialValue = 0, step = 1 }) {
  const [count, setCout] = useState(initialValue);

  const increment = () => setCout(count + step);
  const decrement = () => setCout(count - step);
  const reset = () => setCout(initialValue);
  const double = () => setCout(count * 2);
  const half = () => setCout(count / 2);

  return (
    <div className="counter">
      <h3>🧮 Counter: {count}</h3>
      <div className="counter-display">
        <span className="counter-value">{count}</span>
      </div>
      <div className="counter-buttons">
        <button onClick={decrement} className="btn btn-danger">
          -{step}
        </button>
        <button onClick={reset} className="btn btn-secondary">
          🔄 Reset
        </button>
        <button onClick={increment} className="btn btn-success">
          +{step}
        </button>
      </div>
      <div className="counter-advanced">
        <button onClick={half} className="btn btn-warning">
          ➗ Half
        </button>
        <button onClick={double} className="btn btn-info">
          ✖️ Double
        </button>
      </div>
      <div className="counter-stats">
        <p>
          <strong>Stats:</strong>
          {count > 0 ? ' 📈 Positive' : count < 0 ? ' 📉 Negative' : ' ⚖️ Zero'}
          {count % 2 === 0 ? ' | 🔢 Even' : ' | 🔣Odd'}
        </p>
      </div>
    </div>
  );
}
