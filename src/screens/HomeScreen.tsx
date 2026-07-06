import { Map, Play, Rocket, Trophy, Zap } from 'lucide-react';
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
        <div className="floating-stars">⭐ ✨ 🏆 🚀</div><p className="eyebrow">Explorer Academy</p>
        <h2>Choose today&apos;s learning adventure</h2>
        <p>Keep the current Geography game, and unlock ISO Space Academy as a second adventure track for Grade 2 learning.</p>
        <div className="hero-actions">
          <button className="primary-play" onClick={() => onNavigate('india')}><Map size={22}/> Geography</button>
          <button className="secondary-play" onClick={() => onNavigate('space')}><Rocket size={20}/> Space Academy</button>
        </div>
        <div className="quest-stats"><span>🧭 {visitedCount}/{totalPlaces} places</span><span>⭐ {score} stars</span><span>🏅 Level {level}</span></div>
      </div>
      <div className="mission-grid pro">
        <button className="mission-card" onClick={() => onNavigate('india')}><Map size={34}/><strong>Geography Adventure</strong><span>India map, states, capitals, world explorer, memory games, and quiz arena.</span></button>
        <button className="mission-card" onClick={() => onNavigate('space')}><Rocket size={34}/><strong>ISO Space Academy</strong><span>Story missions, STEM experiments, boss battles, parent dashboard, and space passport.</span></button>
      </div>
      <div className="mascot-stage">
        <div className="mascot-bubble">Pick Geography for maps or Space for ISO missions!</div><div className="mascot-character">🧭</div>
        <div className="progress-island"><strong>Geography Progress</strong><div className="big-progress"><i style={{ width: `${completedPercent}%` }} /></div><span>{completedPercent}% completed</span></div>
      </div>
      <div className="mission-grid pro">
        {screens.filter((s) => s.id !== 'home' && s.id !== 'space').map(({ id, label, desc, icon: Icon }) => <button key={id} className="mission-card" onClick={() => onNavigate(id)}><Icon size={34}/><strong>{label}</strong><span>{desc}</span></button>)}
      </div>
      <div className="quiz-card" style={{ textAlign: 'left' }}>
        <p className="eyebrow">Parent note</p>
        <h2 style={{ marginTop: 0 }}>Two-track learning system</h2>
        <p className="coach-focus">Geography stays as the existing playable map game. Space Academy is added as a mission-based ISO preparation layer using the same gamified framework.</p>
        <div className="hero-actions">
          <button className="primary-play" onClick={() => onNavigate('quiz')}><Zap size={20}/> Geography Daily Challenge</button>
          <button className="secondary-play" onClick={() => onNavigate('space')}><Trophy size={20}/> ISO Mission Control</button>
        </div>
      </div>
    </section>
  );
}
