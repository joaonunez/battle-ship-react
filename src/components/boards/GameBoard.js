import React, { useState } from "react";
import "../alerts/ShipDestroyedAlert";
import { generateRandomBoard } from "../../utils/boardUtils";
import { fireTorpedo } from "../../utils/gameLogic";
import { setTurn } from "../../utils/gameLogic";


//para pasar props de manera correcta debemos agregarlas dentro de ({})
const GameBoard = ({isPlayerTurn, onTurnChange}) => {
  
  //cargamos el tablero
  //declaramos que sera una variable que cambiara con el tiempo al usar useState
  //asignamos la tabla ala variable gameBoard
  const [playerBoard, setPlayerBoard] = useState(generateRandomBoard()); //setPlayerBoard sera la funcion que nos permite actualizar gameBoard cuando sea necesario
  const [aiBoard, setAiBoard] = useState(generateRandomBoard()); //Set AI board funcion para actualizar gameboard cuando sea necesario

  const handlePlayerAttack = (row, col) => {
    setAiBoard((prevBoard) => {
      const newBoard = fireTorpedo(prevBoard, row, col); //le pasamos los parametros ala funcion que declaramos en gameLogic.js
      return newBoard;
    });
    
    //se puede llamar como funcion porque en src/App.js esta declarado como prop
    onTurnChange();
  };

  return (
    <>
    <h2>Tablero de la IA</h2>
      <div className="board">
        {aiBoard.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cell ${
                cell === 1
                  ? "ship"
                  : cell === 2
                  ? "hit"
                  : cell === 3
                  ? "miss"
                  : "empty"
              }`}
              onClick={() => handlePlayerAttack(rowIndex, colIndex)}
            ></div>
          ))
        )}
      </div>
      {/* div contenedor del tablero */}
      <h2>Tablero del jugador</h2>
      <div className="board">
        {/* esta linea  asegura de recorrer primero fila por fila */}
        {playerBoard.map((row, rowIndex) =>
          /* En esta linea de codigo coieza a recorrer cada columna en la fila que se encuentre actualmente */
          row.map((cell, colIndex) => (
            <div
              /* asignamos la llave a cada div  */
              key={`${rowIndex}-${colIndex}`}
              /* actualmente en etapa de pruebas de desarrollo necesito ver los colores de donde se generan los barcos para ir guiandome visualmente */
              className={`cell ${
                cell === 1
                  ? "ship"
                  : cell === 2
                  ? "hit"
                  : cell === 3
                  ? "miss"
                  : "empty"
              }`}
            ></div>
          ))
        )}
      </div>

      
    </>
  );
};

export default GameBoard;
