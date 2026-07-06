import { useState } from 'react';
import App from './App';
import { SpaceAcademyScreen } from './screens/SpaceAcademyScreen';
import './style.css';
import './responsive.css';
import './sprint-a.css';

export default function TrackLauncher() {
  const [track, setTrack] = useState<'home' | 'geography' | 'space'>('home');
  if (track === 'geography') return <App />;
  if (track === 'space') return <main className="app game-stage"><button className="secondary-play" onClick={() => setTrack('home')}>Back</button><SpaceAcademyScreen onEarnReward={() => undefined} /></main>;
  return <main className="app game-stage"><section className="home-adventure"><div className="home-hero-card"><p className="eyebrow">Explorer Academy</p><h2>Choose today&apos;s adventure</h2><p>Pick Geography or Space Academy.</p></div><div className="mission-grid pro"><button className="mission-card" onClick={() => setTrack('geography')}><strong>Geography</strong><span>Current map game</span></button><button className="mission-card" onClick={() => setTrack('space')}><strong>Space Academy</strong><span>ISO mission game</span></button></div></section></main>;
}
