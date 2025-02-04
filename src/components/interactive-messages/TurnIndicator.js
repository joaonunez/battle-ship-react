import React from "react";

const TurnIndicator = ({ isPlayerTurn }) => {
  return (
    <h2 className="turn-indicator">
      {isPlayerTurn ? (
        <>
          <span>Es el turno del jugador</span>
          <h3>Estás viendo la zona enemiga</h3>
          <p>¡Prepárate para atacar!</p>
        </>
      ) : (
        <span>Es el turno de la IA</span>
      )}
    </h2>
  );
};

export default TurnIndicator;
