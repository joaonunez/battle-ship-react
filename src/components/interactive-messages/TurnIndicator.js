import React from "react";

const TurnIndicator =   ({isPlayerTurn}) =>{
    //si isPlayerTurn es verdadero se muestra que es el turno que el jugador, caso contrario sera false y sera el turno de la IA
    return <h2 className="turn-indicator">{isPlayerTurn ? "Es el turno del jugador" : "Es el turno de la IA"}</h2>;
};

export default TurnIndicator;