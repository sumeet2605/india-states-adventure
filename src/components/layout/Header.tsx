import { Trophy } from 'lucide-react';

type Props = {
  score: number;
  level: number;
  progress: number;
};

export function Header({ score, level, progress }: Props) {
  return (
    <header className="topbar">
      <div><p className="eyebrow">For curious explorers age 7+</p><h1>Geography Adventure</h1></div>
      <div className="player-panel">
        <div className="avatar">🐘</div>
        <div><strong>Explorer</strong><span>Level {level}</span><div className="level-track"><i style={{ width: `${progress}%` }} /></div></div>
        <div className="score-pill"><Trophy size={20}/> {score}</div>
      </div>
    </header>
  );
}
