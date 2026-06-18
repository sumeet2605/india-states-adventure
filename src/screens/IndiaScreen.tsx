import { Compass, MapPin, RotateCcw, Sparkles, Star, Volume2 } from 'lucide-react';
import VectorIndiaMap from '../VectorIndiaMap';
import type { IndiaPlace } from '../types';

type Props = {
  states: IndiaPlace[];
  selected: IndiaPlace;
  visited: Set<string>;
  mode: string;
  query: string;
  message: string;
  treasure: IndiaPlace;
  question: { answer: IndiaPlace; options: string[] };
  onMode: (mode: string) => void;
  onQuery: (query: string) => void;
  onPick: (state: IndiaPlace) => void;
  onSpeak: (item: IndiaPlace) => void;
  onAnswer: (option: string) => void;
  onReset: () => void;
};

export function IndiaScreen(props: Props) {
  const { states, selected, visited, mode, query, message, treasure, question, onMode, onQuery, onPick, onSpeak, onAnswer, onReset } = props;
  const filtered = states.filter((s) => [s.name, s.capital, s.language, s.zone].join(' ').toLowerCase().includes(query.toLowerCase()));
  return <>
    <nav className="tabs"><button className={mode === 'explore' ? 'active' : ''} onClick={() => onMode('explore')}>🗺️ Explore</button><button className={mode === 'quiz' ? 'active' : ''} onClick={() => onMode('quiz')}>⭐ Quiz</button><button className={mode === 'hunt' ? 'active' : ''} onClick={() => onMode('hunt')}><Compass size={18}/> Treasure Hunt</button><button onClick={onReset}><RotateCcw size={18}/> Reset</button></nav>
    {mode === 'hunt' && <section className="hunt-card"><h2>🪙 Treasure Hunt</h2><p>Find the state or UT whose capital is <strong>{treasure.capital}</strong> and language is <strong>{treasure.language}</strong>.</p></section>}
    <div className="layout wide-map-layout">
      <section className="map-card"><div className="map-title"><MapPin /> Clickable India Map</div><VectorIndiaMap states={states} selected={selected} visited={visited} onPick={onPick}/><input className="search" placeholder="Search state, UT, capital, language..." value={query} onChange={(e) => onQuery(e.target.value)}/><div className="state-grid compact">{filtered.map((state) => <button key={state.name} className={`state-tile ${selected.name === state.name ? 'selected' : ''}`} onClick={() => onPick(state)}><span className="emoji">{state.emoji}</span><span>{state.name}</span>{visited.has(state.name) && <Star className="mini-star" size={14}/>}</button>)}</div></section>
      <aside className="info-card"><div className="big-emoji">{selected.emoji}</div><h2>{selected.name}</h2><div className="fact-row"><strong>🏛 Capital</strong><span>{selected.capital}</span></div><div className="fact-row"><strong>🗣 Language</strong><span>{selected.language}</span></div><div className="fact-row"><strong>🧭 Zone</strong><span>{selected.zone}</span></div><p className="fun"><Sparkles size={18}/> {selected.fact}</p><button className="speak" onClick={() => onSpeak(selected)}><Volume2 size={18}/> Read aloud</button><p className="message">{message}</p><div className="progress">Visited {visited.size} / {states.length} places</div></aside>
    </div>
    {mode === 'quiz' && <section className="quiz-card"><h2>Quiz Quest</h2><p>What is the capital of <strong>{question.answer.name}</strong>?</p><div className="quiz-options">{question.options.map((option) => <button key={option} onClick={() => onAnswer(option)}>{option}</button>)}</div></section>}
  </>;
}
