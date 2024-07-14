import React from "react";
import "./Tile.css";

const Tile = ({ value, isFlipped, onClick }) => {
  return (
    <div className={`tile ${isFlipped ? "flipped" : ""}`} onClick={onClick}>
      {isFlipped ? value : "X"}
    </div>
  );
};

export default Tile;
