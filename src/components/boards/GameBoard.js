import React, { useState, useEffect } from "react";
import "../alerts/ShipDestroyedAlert";
import { generateRandomBoard } from "../../utils/boardUtils";
import { fireTorpedo } from "../../utils/gameLogic";
import { aiAttack } from "../../utils/gameLogic";

//para pasar props de manera correcta debemos agregarlas dentro de ({})
const GameBoard = ({ isPlayerTurn, onTurnChange, isAITurn }) => {
  //cargamos el tablero
  //declaramos que sera una variable que cambiara con el tiempo al usar useState
  //asignamos la tabla ala variable gameBoard
  const [playerBoard, setPlayerBoard] = useState(generateRandomBoard()); //setPlayerBoard sera la funcion que nos permite actualizar gameBoard cuando sea necesario
  const [aiBoard, setAiBoard] = useState(generateRandomBoard()); //Set AI board funcion para actualizar gameboard cuando sea necesario

  /*Para hacerlo mas interactivo decidi contabilizar tambien los barcos restantes de cada */
  const [playerRemainingShips, setPlayerRemainingShips] = useState(5);
  const [aiRemainingShips, setAiRemainingShips] = useState(5);

  //es requerido implementar useeffect para que se ejecute cuando se detecte un cambio en los estados
  //useEffect sirve para ejectuar codigo automaticamente cuando un estado cambia(UN ESTADO DE LOS USESTATE)
  useEffect(() => {
    if (isAITurn) {
      const randomNumberRow = Math.floor(Math.random() * 10);
      const randomNumberCol = Math.floor(Math.random() * 10);
      //Se ejecutara solo cuando se detecte un cambio en el estado de isAITurn
      handleAIAttack(randomNumberRow, randomNumberCol);
    }
  }, [isAITurn]);

  
  useEffect(() => {
    //si llega a 0 el contador declaramos victoria
    if (aiRemainingShips === 0) {
      alert("Victoria del jugador");
    }
    //se declara  que se hara un seguimiendo al state de aiRemainingShips para que esto se ejecute cuando se
  }, [aiRemainingShips]);

  useEffect(() => {
    if(playerRemainingShips === 0){
      alert("Victoria de la IA");
    }
  },[playerRemainingShips])

  const handleAIAttack = (row, col) => {
    if (!isAITurn) return;
  
    setPlayerBoard((prevBoard) => {
      const newBoard = aiAttack(prevBoard, row, col, isAITurn); // Realiza el ataque de la IA
  
      // Verifica si antes de actualizar había un barco
      if (prevBoard[row][col] === 1) {  // Si la casilla tenía un barco
        setPlayerRemainingShips((prev) => prev - 1); // Restamos un barco
      }
  
      return newBoard; // Retorna el nuevo tablero con el ataque de la IA
    });
  
    setTimeout(() => {
      if (playerRemainingShips > 0) {
        onTurnChange();
      }
    }, 1000);
  };
  

  const handlePlayerAttack = (row, col) => {
    if (!isPlayerTurn) {
      console.log("No es tu turno");
      return;
    }
    setAiBoard((prevBoard) => {
      const newBoard = fireTorpedo(prevBoard, row, col, isPlayerTurn); //le pasamos los parametros ala funcion que declaramos en gameLogic.js
      //verificamos de inmediato si el lugar impactado genero un valor de 2(Es decir se acerto a un barco)
      if (newBoard[row][col] === 2) {
        //seteamos en prev el valor del use state y si se cumple la condicion le restamos uno
        setAiRemainingShips((prev) => prev -1 );
      }

      return newBoard;
    });

    setTimeout(() => {
      //solo hacemos el cambio de turno y ataque de la IA si le quedan mas de 0 barcos
      if (aiRemainingShips > 0) {
        onTurnChange(); //se puede llamar como funcion porque en src/App.js esta declarado como prop
        handleAIAttack();
      }
    }, 1000);
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
                  ? "ship-here"
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
                  ? "ship-here"
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
