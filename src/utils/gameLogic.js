import ShipDestroyedAlert from "../components/alerts/ShipDestroyedAlert";
 //Declaramos la funcion para disparar un torpedo
export const fireTorpedo = (board, row, col, isPlayerTurn) => { 

  //verifiacmos que sea turno del jugador
  if(!isPlayerTurn){
    console.log("No es tu turno"); //pruebas para ver en consola el resultado
    return board;
  }
  
  //en los parametros iran los indices de fila y columna para un disparo certero ! ademas del tablero que le estamos pasando
    //IMPORTANTE para matrices no podemos usar un simple spread operator para hacer una copia como por ejemplo newBoard = [...,gameBoard]
    //EL PROBLEMA esta en que el spread operator por si solo solo recorreria la primera fila, y no una matriz bidireccional
    //Para hacerlo correctamente y crear una copia exacta del tablero debe hacerse mapeo con spread
    //la siguiente forma es la correcta:

    //teniendo claro que nuestra matriz es un array de arrays(10 arrays en este caso) recorreremos cada elemento haciendo uso del map
    //https://stackoverflow.com/questions/76016483/how-to-create-an-empty-copy-of-a-2d-array-in-javascript#new-answer?newreg=3db855ec4bd64efd83c6e07559c2215e
    const newBoard = board.map((row) => [...row]);

    // si la casilla clickeada tiene un valor de 1(hay un barco en esta posicion):
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
    return newBoard;
    
  };


  //para cambiar de turno
  //verificamos que es actualmente el turno del jugador es falso o verdadero
  //sea cual sea el valor en ese momento
  //si es verdadero, cambiara al turno de la IA
  //si es falso es decir si es turno de la IA cambiara al turno del jugador
export const setTurn = (isPlayerTurn) =>{
    return !isPlayerTurn;
};

export const aiAttack = (board, row, col, isAITurn) =>{
  //para asegurarnos de que la ia solo atacara cuando sea su turno ponemos una condicional
  if(!isAITurn){
    return board;
  }
  const newBoard = board.map((row) => [...row]);
  if(newBoard[row][col]===1){
    newBoard[row][col] = 2
  } else if (newBoard[row][col] === 0){
    newBoard[row][col] = 3;
  }
  return newBoard;
};