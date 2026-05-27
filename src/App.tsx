import { useMemo, useState } from 'react';
import { MapPin, Star, Trophy, Volume2, Sparkles, RotateCcw, Compass, Play, ShieldCheck, Globe2, Brain, Home, Settings } from 'lucide-react';
import VectorIndiaMap from './VectorIndiaMap';
import { continents, oceans, countries } from './data';
import { earnedBadges, makeOptions } from './games';
import { indiaPlaces as states } from './data/india';
import type { IndiaPlace, ScreenConfig, ScreenId, WorldPlace } from './types';
import './style.css';

const screens: ScreenConfig[] = [
  { id: 'home', label: 'Home', icon: Home, desc: 'Choose your adventure' },
  { id: 'india', label: 'India Map', icon: MapPin, desc: 'States, capitals, languages' },
  { id: 'quiz', label: 'Quiz Arena', icon: Trophy, desc: 'Fast capital challenges' },
  { id: 'memory', label: 'Memory Match', icon: Brain, desc: 'Match pairs for stars' },
  { id: 'world', label: 'World Explorer', icon: Globe2, desc: 'Continents, oceans, countries' },
  { id: 'passport', label: 'Passport', icon: ShieldCheck, desc: 'Badges and progress' },
  { id: 'settings', label: 'Settings', icon: Settings, desc: 'Reset and controls' }
];

function Passport({ score, visitedCount }: { score: number; visitedCount: number }) { const badges = earnedBadges(score); return <section className="passport-card"><h2>🛂 Explorer Passport</h2><p>Visited {visitedCount} places. Stars: {score}</p><div className="badge-row">{badges.length ? badges.map((b) => <span key={b.name} className="badge">{b.emoji} {b.name}</span>) : <span className="badge locked">🔒 Earn 25 stars for first badge</span>}</div></section>; }
function makeQuestion<T extends { name: string }>(index: number, list: T[]) { const answer = list[index % list.length]; const pool = list.filter((s) => s.name !== answer.name).sort(() => Math.random() - 0.5).slice(0, 3); const get = (s: any) => s.capital || s.landmark || s.size; const options = [...pool.map(get), get(answer)].sort(() => Math.random() - 0.5); return { answer, options }; }

export default function App() {
  const [section, setSection] = useState<ScreenId>('home');
  const [selected, setSelected] = useState<IndiaPlace>(states[13]);
  const [selectedContinent, setSelectedContinent] = useState<WorldPlace>(continents[0]);
  const [selectedOcean, setSelectedOcean] = useState<WorldPlace>(oceans[0]);
  const [selectedCountry, setSelectedCountry] = useState<WorldPlace>(countries[0]);
  const [visited, setVisited] = useState(new Set<string>(['Maharashtra']));
  const [mode, setMode] = useState('explore');
  const [query, setQuery] = useState('');
  const [quizIndex, setQuizIndex] = useState(0);
  const [huntIndex, setHuntIndex] = useState(5);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('Tap a colored state or union territory shape to begin!');
  const [worldQuizIndex, setWorldQuizIndex] = useState(0);
  const [countryQuizIndex, setCountryQuizIndex] = useState(0);
  const [soundOn, setSoundOn] = useState(true);

  const filteredStates = useMemo(() => states.filter((s) => [s.name, s.capital, s.language, s.zone].join(' ').toLowerCase().includes(query.toLowerCase())), [query]);
  const question = useMemo(() => makeQuestion(quizIndex, states), [quizIndex]);
  const treasure = states[huntIndex % states.length];
  const worldItems: WorldPlace[] = [...continents, ...oceans, ...countries];
  const worldQuestion = worldItems[worldQuizIndex % worldItems.length];
  const worldOptions = useMemo(() => makeOptions(worldItems, worldQuestion, (i: any) => i.landmark || i.capital || i.size), [worldQuizIndex]);
  const countryQuestion = countries[countryQuizIndex % countries.length];
  const countryCapitalOptions = useMemo(() => makeOptions(countries, countryQuestion, (i: any) => i.capital), [countryQuizIndex]);
  const currencyOptions = useMemo(() => makeOptions(countries, countryQuestion, (i: any) => i.currency), [countryQuizIndex]);
  const level = Math.floor(score / 50) + 1;
  const nextLevelProgress = score % 50;

  function addStars(amount: number, note?: string) { setScore((s) => s + amount); setMessage(note || `You earned ${amount} stars! ⭐`); }
  function chooseState(state: IndiaPlace) { setSelected(state); setVisited((old) => new Set([...old, state.name])); if (mode === 'hunt') { if (state.name === treasure.name) { addStars(15, `Treasure found! ${state.name} has capital ${state.capital}. +15 stars! 🪙`); setHuntIndex((i) => i + 7); } else setMessage(`Almost! Look for the state or UT with capital ${treasure.capital}.`); } else setMessage(`Great! ${state.name}'s capital is ${state.capital}.`); }
  function speak(item: IndiaPlace | WorldPlace) { if (!soundOn || !window.speechSynthesis) return; const text = 'currency' in item && item.currency ? `${item.name}. Capital ${item.capital}. Currency ${item.currency}. Language ${item.language}.` : 'capital' in item && item.capital ? `${item.name}. Capital ${item.capital}. Main language ${item.language}.` : `${item.name}. ${item.fact}`; window.speechSynthesis.cancel(); window.speechSynthesis.speak(new SpeechSynthesisUtterance(text)); }
  function answerQuiz(option: string) { if (option === question.answer.capital) addStars(10, 'Correct! You earned 10 stars! ⭐'); else setMessage(`Good try! The answer is ${question.answer.capital}.`); setSelected(question.answer); setVisited((old) => new Set([...old, question.answer.name])); setQuizIndex((i) => i + 1); }
  function answerWorld(option: string) { const correct = worldQuestion.landmark || worldQuestion.capital || worldQuestion.size; if (option === correct) addStars(10, 'World quiz correct! +10 stars 🌎'); else setMessage(`Good try! The answer is ${correct}.`); setWorldQuizIndex((i) => i + 1); }
  function answerCountry(option: string, field: 'capital' | 'currency') { const correct = countryQuestion[field]; if (option === correct) addStars(10, `Correct! ${countryQuestion.name} uses ${correct}. +10 stars ✈️`); else setMessage(`Good try! ${countryQuestion.name}: ${correct}.`); setSelectedCountry(countryQuestion); setCountryQuizIndex((i) => i + 1); }
  function resetGame() { setScore(0); setQuizIndex(0); setWorldQuizIndex(0); setCountryQuizIndex(0); setVisited(new Set()); setMessage('Adventure reset!'); }

  const HomeScreen = <section className="game-home"><div className="home-copy"><p className="eyebrow">Professional learning game</p><h2>Choose your mission, explorer!</h2><p>Play map quests, quizzes, memory challenges, and collect passport badges while learning geography.</p><button className="primary-play" onClick={() => setSection('india')}><Play size={22}/> Start India Adventure</button></div><div className="mission-grid">{screens.filter((s) => s.id !== 'home').map(({ id, label, desc, icon: Icon }) => <button key={id} className="mission-card" onClick={() => setSection(id)}><Icon size={32}/><strong>{label}</strong><span>{desc}</span></button>)}</div></section>;

  return <main className="game-shell"><aside className="side-nav"><div className="brand"><span>🌎</span><strong>GeoQuest</strong><small>Junior</small></div>{screens.map(({ id, label, icon: Icon }) => <button key={id} className={section === id ? 'active' : ''} onClick={() => setSection(id)}><Icon size={19}/><span>{label}</span></button>)}</aside><section className="app game-stage"><header className="topbar"><div><p className="eyebrow">For curious explorers age 7+</p><h1>Geography Adventure</h1></div><div className="player-panel"><div className="avatar">🐘</div><div><strong>Explorer</strong><span>Level {level}</span><div className="level-track"><i style={{ width: `${(nextLevelProgress / 50) * 100}%` }} /></div></div><div className="score-pill"><Trophy size={20}/> {score}</div></div></header><Passport score={score} visitedCount={visited.size} />
    {section === 'home' && HomeScreen}
    {section === 'india' && <><nav className="tabs"><button className={mode === 'explore' ? 'active' : ''} onClick={() => setMode('explore')}>🗺️ Explore</button><button className={mode === 'quiz' ? 'active' : ''} onClick={() => setMode('quiz')}>⭐ Quiz</button><button className={mode === 'hunt' ? 'active' : ''} onClick={() => setMode('hunt')}><Compass size={18}/> Treasure Hunt</button><button onClick={resetGame}><RotateCcw size={18}/> Reset</button></nav>{mode === 'hunt' && <section className="hunt-card"><h2>🪙 Treasure Hunt</h2><p>Find the state or UT whose capital is <strong>{treasure.capital}</strong> and language is <strong>{treasure.language}</strong>.</p></section>}<div className="layout wide-map-layout"><section className="map-card"><div className="map-title"><MapPin /> Clickable India Map</div><VectorIndiaMap states={states} selected={selected} visited={visited} onPick={chooseState} /><input className="search" placeholder="Search state, UT, capital, language..." value={query} onChange={(e) => setQuery(e.target.value)} /><div className="state-grid compact">{filteredStates.map((state) => <button key={state.name} className={`state-tile ${selected.name === state.name ? 'selected' : ''}`} onClick={() => chooseState(state)}><span className="emoji">{state.emoji}</span><span>{state.name}</span>{visited.has(state.name) && <Star className="mini-star" size={14} />}</button>)}</div></section><aside className="info-card"><div className="big-emoji">{selected.emoji}</div><h2>{selected.name}</h2><div className="fact-row"><strong>🏛 Capital</strong><span>{selected.capital}</span></div><div className="fact-row"><strong>🗣 Language</strong><span>{selected.language}</span></div><div className="fact-row"><strong>🧭 Zone</strong><span>{selected.zone}</span></div><p className="fun"><Sparkles size={18}/> {selected.fact}</p><button className="speak" onClick={() => speak(selected)}><Volume2 size={18}/> Read aloud</button><p className="message">{message}</p><div className="progress">Visited {visited.size} / {states.length} places</div></aside></div>{mode === 'quiz' && <section className="quiz-card"><h2>Quiz Quest</h2><p>What is the capital of <strong>{question.answer.name}</strong>?</p><div className="quiz-options">{question.options.map((option) => <button key={option} onClick={() => answerQuiz(option)}>{option}</button>)}</div></section>}</>}
    {section === 'quiz' && <section className="quiz-card arena"><h2>🏆 Quiz Arena</h2><p>What is the capital of <strong>{question.answer.name}</strong>?</p><div className="quiz-options">{question.options.map((option) => <button key={option} onClick={() => answerQuiz(option)}>{option}</button>)}</div><p>World bonus: Which answer matches <strong>{worldQuestion.name}</strong>?</p><div className="quiz-options">{worldOptions.map((option) => <button key={option} onClick={() => answerWorld(option)}>{option}</button>)}</div></section>}
    {section === 'memory' && <section className="quiz-card"><h2>🧠 Memory Match</h2><p>Use the memory game components in the next build step.</p></section>}
    {section === 'world' && <section className="quiz-card"><h2>🌍 World Explorer</h2><p>World modules are now TypeScript-ready and will be split into screens.</p></section>}
    {section === 'passport' && <section className="map-card"><div className="map-title"><ShieldCheck/> Explorer Progress</div><Passport score={score} visitedCount={visited.size}/><div className="section-helper">Collect stars by tapping places, answering quizzes, and matching cards. New badges unlock as your score grows.</div></section>}
    {section === 'settings' && <section className="map-card settings-card"><div className="map-title"><Settings/> Game Settings</div><button className="primary-play" onClick={() => setSoundOn((v) => !v)}>{soundOn ? '🔊 Sound On' : '🔇 Sound Off'}</button><button className="primary-play danger" onClick={resetGame}><RotateCcw/> Reset Progress</button><p className="section-helper">Progress is kept during this play session. A future version can save progress permanently in the browser.</p></section>}
  </section></main>;
}
