import React, { useState, useEffect } from "react";
import Tile from "./Tile";
import SuccessScreen from "./SuccessScreen";
import "./GameBoard.css";

const GameBoard = () => {
  const [tiles, setTiles] = useState(shuffleTiles(generateTiles()));
  const [flippedTiles, setFlippedTiles] = useState([]);
  const [matchedTiles, setMatchedTiles] = useState([]);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const playerName = localStorage.getItem("playerName");

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const handleTileClick = (index) => {
    if (
      flippedTiles.length < 2 &&
      !flippedTiles.includes(index) &&
      !matchedTiles.includes(index)
    ) {
      const newFlippedTiles = [...flippedTiles, index];
      setFlippedTiles(newFlippedTiles);

      if (newFlippedTiles.length === 2) {
        const [first, second] = newFlippedTiles;
        if (tiles[first] === tiles[second]) {
          setMatchedTiles([...matchedTiles, first, second]);
          setScore(score + 1);
          setFlippedTiles([]);
        } else {
          setTimeout(() => {
            setFlippedTiles([]);
          }, 1000);
          setScore(score - 1);
        }
      } else {
        setFlippedTiles(newFlippedTiles);
      }
    }

    if (matchedTiles.length === tiles.length - 2) {
      setTimeout(() => {
        setGameOver(true);
      }, 1000);
    }
  };

  const handleRestart = () => {
    setTiles(shuffleTiles(generateTiles()));
    setFlippedTiles([]);
    setMatchedTiles([]);
    setScore(0);
    setStartTime(Date.now()); // Restart the timer by setting a new start time
    setElapsedTime(0);
    setGameOver(false);
  };

  if (gameOver) {
    return (
      <SuccessScreen
        score={score}
        time={elapsedTime}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="game-board-container">
      <h1>Mahajong Game</h1>
      <div className="game-info">
        <div className="player-name">Welcome, {playerName}!</div>
        <div className="score">Score: {score}</div>
        <div className="time">Time: {elapsedTime}s</div>
      </div>
      <div className="game-board">
        {tiles.map((tile, index) => (
          <Tile
            key={index}
            value={tile}
            isFlipped={
              flippedTiles.includes(index) || matchedTiles.includes(index)
            }
            onClick={() => handleTileClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

const generateTiles = () => {
  const emojis = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣"];
  return [...emojis, ...emojis];
};

const shuffleTiles = (tiles) => {
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  return tiles;
};

export default GameBoard;
