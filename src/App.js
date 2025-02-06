import { useState } from 'react';
import { setTurn } from './utils/gameLogic';
import GameBoard from './components/boards/GameBoard';
import TurnIndicator from './components/interactive-messages/TurnIndicator';

function App() {
  //declaramos que el turno del jugador sera un estado cambiante
  const[isPlayerTurn,setPlayerTurn] = useState(true);

  //funcionalidad para cambiar el estado del turno
  const handleTurnChange = () => {
    setTimeout(()=>{
      setPlayerTurn(setTurn(isPlayerTurn));
    },1000)
  };

  return (
    <>
      <div className='app'>
        <h1 className='text-center mt-3'>Batalla De Embarcaciones</h1>
        
        
        {/* cambie true a isPlayerTurn COMO ARGUMENTO, para que lea el estado del turno */}
        <TurnIndicator isPlayerTurn={isPlayerTurn}  /> 

        {/* //al tener onTurnChange como prop es posible llamarlo como funcion en el componente GameBoard */}
        <GameBoard isPlayerTurn={isPlayerTurn} onTurnChange={handleTurnChange}  isAITurn={!isPlayerTurn} />
      </div>

    </>
  );
}

export default App;
