import React, { useState } from "react";
import "./WelcomeScreen.css";

const WelcomeScreen = ({ onStart }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("playerName", name);
    onStart();
  };

  return (
    <div className="welcome-container">
      <h1 className="welcome-heading">React Tiles</h1>
      <div className="welcome-screen">
        <h2>Enter Your Name</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button type="submit">Start Game</button>
        </form>
      </div>
    </div>
  );
};

export default WelcomeScreen;
