import React from "react";
import "./SuccessScreen.css";

const SuccessScreen = ({ score, time, onRestart }) => {
  return (
    <div className="success-screen">
      <h1>React Tiles</h1>
      <h2>Congratulations!</h2>
      <p>Your final score is: {score}</p>
      <p>Time taken: {time}s</p>
      <button onClick={onRestart}>Play Again</button>
    </div>
  );
};

export default SuccessScreen;
