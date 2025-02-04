
import GameBoard from './components/boards/GameBoard';
import TurnIndicator from './components/interactive-messages/TurnIndicator';

function App() {
  return (
    <>
      <div className='app'>
        <h1 className='text-center mt-3'>Batalla De Embarcaciones</h1>
        <TurnIndicator isPlayerTurn={true} />
        <GameBoard />
      </div>

    </>
  );
}

export default App;
