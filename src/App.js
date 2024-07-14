import React, { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import GameBoard from "./components/GameBoard";

const App = () => {
  const [hasStarted, setHasStarted] = useState(false);

  const handleStart = () => {
    setHasStarted(true);
  };

  return (
    <div className="app">
      {hasStarted ? <GameBoard /> : <WelcomeScreen onStart={handleStart} />}
    </div>
  );
};

export default App;
