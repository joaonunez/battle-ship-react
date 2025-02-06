import { useState } from "react";
import { setTurn } from "./utils/gameLogic";
import GameBoard from "./components/boards/GameBoard";
import TurnIndicator from "./components/interactive-messages/TurnIndicator";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  //declaramos que el turno del jugador sera un estado cambiante
  const [isPlayerTurn, setPlayerTurn] = useState(true);

  //funcionalidad para cambiar el estado del turno
  const handleTurnChange = () => {
    //decidi agregar el intervalo de tiempo para que se vea dinamico y no tan computarizado
    setTimeout(() => {
      setPlayerTurn(setTurn(isPlayerTurn));
    }, 1);
  };

  //animaciones de renderizado para la aplicacion
  const pageVariants = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  };

  const pageTransition = {
    duration: 0.5,
    ease: "easeInOut",
  };

  return (
    <>
    <div className="app">
        <AnimatePresence>
        <motion.div variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}>
          
        <h1 className="text-center mt-3">Batalla De Embarcaciones</h1>
        <h6>-Cada Tablero tiene 5 barcos ocultos</h6>
        <h6>-Un barco ocupa un cuadrado</h6>
        <h6>-ganas cuando destruyes los 5 barcos del rival</h6>
        </motion.div>

        </AnimatePresence>
        
        

        <AnimatePresence mode="wait">
          {/* Animación de entrada/salida para el indicador de turno */}
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <TurnIndicator isPlayerTurn={isPlayerTurn} />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {/* Animación para el tablero de juego, dependiendo de si es turno del jugador o la IA */}
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <GameBoard
              isPlayerTurn={isPlayerTurn}
              onTurnChange={handleTurnChange}
              isAITurn={!isPlayerTurn}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
