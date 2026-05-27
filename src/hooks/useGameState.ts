import { useState } from 'react';

export function useGameState() {
  const [score, setScore] = useState(0);
  const [soundOn, setSoundOn] = useState(true);

  const addStars = (amount:number) => {
    setScore((s)=>s+amount);
  };

  const resetGame = ()=>{
    setScore(0);
  };

  return {
    score,
    soundOn,
    setSoundOn,
    addStars,
    resetGame,
    level: Math.floor(score/50)+1,
    progress: score%50
  };
}
