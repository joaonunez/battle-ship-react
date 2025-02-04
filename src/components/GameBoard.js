import React, { useState } from "react";

const generateRandomBoard = () =>{
    const rows = 10;
    const cols = 10;
    const board = Array(rows) //creamos un Array de 10 elementos undefined
    .fill(null) // para evitar problemas con map en el console log ala hora de testear convertimos a null para poder ver la matriz en la consola
    //console.log(board) = [null, null, null, null, null, null, null, null, null, null]
    .map(() => Array(cols).fill(0));
    // console.log(board)  obtenemos una matriz de 10x10 llena de ceros

}

const GameBoard = () => {


  
  return (
    <></>
  );
};

export default GameBoard;
