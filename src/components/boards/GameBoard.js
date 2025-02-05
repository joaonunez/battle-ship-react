import React, { useState } from "react";
import "../alerts/ShipDestroyedAlert"
import ShipDestroyedAlert from "../alerts/ShipDestroyedAlert";
//funcion para generar nuestro tablero con posiciones aleatorias
const generateRandomBoard = () => {
  const rows = 10; //declaramos numero de filas

  const cols = 10; //declaramos numero de columnas

  const board = Array(rows) //creamos un Array de 10 elementos undefined
    .fill(null) // para evitar problemas con map en el console log ala hora de testear convertimos a null para poder ver la matriz en la consola
    //console.log(board) = [null, null, null, null, null, null, null, null, null, null]

    .map(() => Array(cols).fill(0)); //esto recorera cara elemento del array que tenemos de 10 null, y los convertira a 10 arrays de 10 ceros, logrando que se convierta en una matriz

  // console.log(board)  obtenemos una matriz de 10x10 llena de ceros

  //generar barcos en posiciones aleatorias en el tablero:

  for (let i = 0; i < 5; i++) {
    //la batalla se establece en 5 barcos por tablero y establecemos un for que se repetira 10 veces de 0 a 9

    let placed = false; //esta variable es creada inicialmente para establecer que el estado colocado es falso inicialmente en cada iteracion del bucle flor,

    //mientras placed sea false o negado dentro de sus 10 iteraciones establecidas, seguira ejecutandose el while
    while (!placed) {
      //math floor redondea hacia abajo, elminando los decimales, math random da un numero aleatorio entre 0 y 1
      const row = Math.floor(Math.random() * rows); //generamos un numero aleatorio entre 0 y 1 y lo multiplicamos por el numero de filas existente

      const col = Math.floor(Math.random() * cols); //generamos un numero aleatorio entre 0 y 1 y lo multiplicacmos por el numero de columnas existente

      //verificamos si la posicion en la matriz es igual a 0 es decir si no tiene barcos en ese cuadrado del tablero
      if (board[row][col] === 0) {
        //si el lugar establecido aleatoriamente por math floor y mathrandom esta vacio o es igual a 0
        //entonces establecemos su valor a 1 es decir, el lugar se ocupara con un barco
        board[row][col] = 1;

        //finalizamos el bucle while cambiando el valor de placed, pasando asi al siguiente barco en el for
        placed = true;
      }
    }
  }
  console.log(board);
  return board;
};
const GameBoard = () => {
  //cargamos el tablero
  //declaramos que sera una variable que cambiara con el tiempo al usar useState
  //asignamos la tabla ala variable gameBoard
  const [gameBoard, setGameBoard] = useState(generateRandomBoard()); //setGameBoard sera la funcion que nos permite actualizar gameBoard cuando sea necesario


  //Declaramos la funcion para disparar un torpedo
  const fireTorpedo = (row, col) => { //en los parametros iran los indices de fila y columna para un disparo certero !
    //IMPORTANTE para matrices no podemos usar un simple spread operator para hacer una copia como por ejemplo newBoard = [...,gameBoard]
    //EL PROBLEMA esta en que el spread operator por si solo solo recorreria la primera fila, y no una matriz bidireccional
    //Para hacerlo correctamente y crear una copia exacta del tablero debe hacerse mapeo con spread
    //la siguiente forma es la correcta:

    //teniendo claro que nuestra matriz es un array de arrays(10 arrays en este caso) recorreremos cada elemento haciendo uso del map
    //https://stackoverflow.com/questions/76016483/how-to-create-an-empty-copy-of-a-2d-array-in-javascript#new-answer?newreg=3db855ec4bd64efd83c6e07559c2215e
    const newBoard = gameBoard.map((row) => [...row]);

    // si la casilla clickeada tiene un valor o el valor es 1(hay un barco en esta posicion):
    if (newBoard[row][col] === 1) {

      // si esta condicion se cumple establecemos el numero 2 en esa casilla de la matriz
      //el numero 2 en la celda de la matriz indica que le acertamos a un barco
      newBoard[row][col] = 2;
      ShipDestroyedAlert();


      // si la celda ala que hicimos clcik tiene el valor de 0(solo hay agua en esa posicion)
    } else if (newBoard[row][col] === 0) {

      //si esta condicion se cumple establecemos el numero 3 en esa casilla de la matriz
      //el numero 3 indica que ya bombardeamos un lugar y solo habia agua en esa posicion
      newBoard[row][col] = 3;
    }
    setGameBoard(newBoard);
    
  };
  return (
    <>
      {/* div contenedor del tablero */}
      <div className="board">
        {/* esta linea  asegura de recorrer primero fila por fila */}
        {gameBoard.map((row, rowIndex) =>
          /* En esta linea de codigo coieza a recorrer cada columna en la fila que se encuentre actualmente */
          row.map((cell, colIndex) => (
            <div
              /* asignamos la llave a cada div  */
              key={`${rowIndex}-${colIndex}`}

              /* actualmente en etapa de pruebas de desarrollo necesito ver los colores de donde se generan los barcos para ir guiandome visualmente */
              className={`cell ${cell === 1
                  ? "ship"
                  : cell === 2
                    ? "hit"
                    : cell === 3
                      ? "miss"
                      : "empty"
                }`}
              /* evento onclick que disparara ala casilla seleccionada */
              onClick={() => fireTorpedo(rowIndex, colIndex)}
            ></div>
          ))
        )}
      </div>
    </>
  );
};

export default GameBoard;
