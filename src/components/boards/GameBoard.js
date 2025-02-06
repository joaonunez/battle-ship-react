import React, { useState, useEffect } from "react";
import "../alerts/ShipDestroyedAlert";
import { generateRandomBoard } from "../../utils/boardUtils";
import { fireTorpedo } from "../../utils/gameLogic";
import { aiAttack } from "../../utils/gameLogic";


//para pasar props de manera correcta debemos agregarlas dentro de ({})
const GameBoard = ({isPlayerTurn, onTurnChange, isAITurn}) => {

  //es requerido implementar useeffect para que se ejecute cuando se detecte un cambio en los estados
//useEffect sirve para ejectuar codigo automaticamente cuando un estado cambia(UN ESTADO DE LOS USESTATE)
useEffect(() =>{
  if(isAITurn){
    const randomNumberRow = Math.floor(Math.random() * 10 );
    const randomNumberCol = Math.floor(Math.random() * 10 );
    //Se ejecutara solo cuando se detecte un cambio en el estado de isAITurn
    handleAIAttack(randomNumberRow, randomNumberCol)
  }
},[isAITurn]);
  
  //cargamos el tablero
  //declaramos que sera una variable que cambiara con el tiempo al usar useState
  //asignamos la tabla ala variable gameBoard
  const [playerBoard, setPlayerBoard] = useState(generateRandomBoard()); //setPlayerBoard sera la funcion que nos permite actualizar gameBoard cuando sea necesario
  const [aiBoard, setAiBoard] = useState(generateRandomBoard()); //Set AI board funcion para actualizar gameboard cuando sea necesario


  const handleAIAttack = (row, col) => {
    //si no es turno de la ia aseguramos que no se ejecute la funcion deteniendola antes con return
    if(!isAITurn) return;
    
    setPlayerBoard((prevBoard) => aiAttack(prevBoard, row, col, isAITurn));
    setTimeout(()=>{
      onTurnChange();
    }, 1000)
  };

  const handlePlayerAttack = (row, col) => {
    if(!isPlayerTurn){
      console.log("No es tu turno");
      return;
    }
    setAiBoard((prevBoard) => {
      const newBoard = fireTorpedo(prevBoard, row, col, isPlayerTurn); //le pasamos los parametros ala funcion que declaramos en gameLogic.js
      return newBoard;
    });
    
    //se puede llamar como funcion porque en src/App.js esta declarado como prop
    onTurnChange();
    handleAIAttack();
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
