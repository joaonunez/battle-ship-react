import React, { useState } from "react";

//funcion para generar nuestro tablero con posiciones aleatorias 
const generateRandomBoard = () =>{
    const rows = 10; //declaramos numero de filas

    const cols = 10; //declaramos numero de columnas

    const board = Array(rows) //creamos un Array de 10 elementos undefined

    .fill(null) // para evitar problemas con map en el console log ala hora de testear convertimos a null para poder ver la matriz en la consola
    //console.log(board) = [null, null, null, null, null, null, null, null, null, null]

    .map(() => Array(cols).fill(0)); //esto recorera cara elemento del array que tenemos de 10 null, y los convertira a 10 arrays de 10 ceros, logrando que se convierta en una matriz

    // console.log(board)  obtenemos una matriz de 10x10 llena de ceros

}

const GameBoard = () => {


  
  return (
    <></>
  );
};

export default GameBoard;
