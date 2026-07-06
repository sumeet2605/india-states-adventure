import { Coins, Sparkles } from 'lucide-react';

type Props = {
  level: number;
  progress: number;
  xp: number;
  coins: number;
  rank: string;
  title?: string;
  eyebrow?: string;
  avatar?: string;
};

export function Header({ level, progress, xp, coins, rank, title = 'Geography Adventure', eyebrow = 'For curious explorers age 7+', avatar = '🐘' }: Props) {
  return (
    <header className="topbar">
      <div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div>
      <div className="player-panel">
        <div className="avatar">{avatar}</div>
        <div><strong>{rank}</strong><span>Level {level} · {xp} XP</span><div className="level-track"><i style={{ width: `${progress}%` }} /></div></div>
        <div className="score-pill"><Coins size={20}/> {coins}</div>
        <div className="score-pill"><Sparkles size={20}/> XP</div>
      </div>
    </header>
  );
}
