import { Play, Trophy, Zap } from 'lucide-react';
import type { ScreenConfig, ScreenId } from '../types';

type Props = {
  screens: ScreenConfig[];
  score: number;
  level: number;
  visitedCount: number;
  totalPlaces: number;
  onNavigate: (screen: ScreenId) => void;
};

export function HomeScreen({ screens, score, level, visitedCount, totalPlaces, onNavigate }: Props) {
  const completedPercent = Math.round((visitedCount / totalPlaces) * 100);
  return (
    <section className="home-adventure">
      <div className="home-hero-card">
        <div className="floating-stars">⭐ ✨ 🏆</div><p className="eyebrow">GeoQuest Junior</p>
        <h2>Ready for today's geography mission?</h2>
        <p>Explore India, collect state stamps, solve capital quizzes, and unlock explorer badges.</p>
        <div className="hero-actions">
          <button className="primary-play" onClick={() => onNavigate('india')}><Play size={22}/> Start Adventure</button>
          <button className="secondary-play" onClick={() => onNavigate('quiz')}><Zap size={20}/> Daily Challenge</button>
        </div>
        <div className="quest-stats"><span>🧭 {visitedCount}/{totalPlaces} places</span><span>⭐ {score} stars</span><span>🏅 Level {level}</span></div>
      </div>
      <div className="mascot-stage">
        <div className="mascot-bubble">Tap a state and I will tell you its capital!</div><div className="mascot-character">🐘</div>
        <div className="progress-island"><strong>India Explorer Progress</strong><div className="big-progress"><i style={{ width: `${completedPercent}%` }} /></div><span>{completedPercent}% completed</span></div>
      </div>
      <div className="mission-grid pro">
        {screens.filter((s) => s.id !== 'home').map(({ id, label, desc, icon: Icon }) => <button key={id} className="mission-card" onClick={() => onNavigate(id)}><Icon size={34}/><strong>{label}</strong><span>{desc}</span></button>)}
      </div>
    </section>
  );
}
