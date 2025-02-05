//funcion para generar nuestro tablero con posiciones aleatorias
export const generateRandomBoard = () => {
    const rows = 10; //declaramos numero de filas
  
    const cols = 10; //declaramos numero de columnas
  
    const board = Array(rows) //creamos un Array de 10 elementos undefined
      .fill(null) // para evitar problemas con map en el console log ala hora de testear convertimos a null para poder ver la matriz en la consola
      //console.log(board) = [null, null, null, null, null, null, null, null, null, null]
  
      .map(() => Array(cols).fill(0)); //esto recorera cara elemento del array que tenemos de 10 null, y los convertira a 10 arrays de 10 ceros, logrando que se convierta en una matriz
  
    // console.log(board)  obtenemos una matriz de 10x10 llena de ceros
  
    //generar barcos en posiciones aleatorias en el tablero:
  
    for (let i = 0; i < 5; i++) {
      //la batalla se establece en 5 barcos por tablero y establecemos un for que se repetira 5 veces de 0 a 5
  
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