import React, { useMemo, useState } from 'react';
import { MapPin, Star, Trophy, Volume2, Sparkles, RotateCcw, Compass } from 'lucide-react';
import './style.css';

const states = [
  { name: 'Andhra Pradesh', capital: 'Amaravati', language: 'Telugu', zone: 'South', emoji: '🌾', fact: 'Known for spicy food and Kuchipudi dance.', x: 320, y: 445 },
  { name: 'Arunachal Pradesh', capital: 'Itanagar', language: 'English', zone: 'North East', emoji: '🌄', fact: 'One of the first places in India to see sunrise.', x: 550, y: 155 },
  { name: 'Assam', capital: 'Dispur', language: 'Assamese', zone: 'North East', emoji: '🍵', fact: 'Famous for tea gardens and one-horned rhinos.', x: 500, y: 185 },
  { name: 'Bihar', capital: 'Patna', language: 'Hindi', zone: 'East', emoji: '📚', fact: 'Home to ancient learning centers like Nalanda.', x: 390, y: 245 },
  { name: 'Chhattisgarh', capital: 'Raipur', language: 'Hindi', zone: 'Central', emoji: '🌳', fact: 'Has beautiful forests and waterfalls.', x: 300, y: 320 },
  { name: 'Goa', capital: 'Panaji', language: 'Konkani', zone: 'West', emoji: '🏖️', fact: 'India’s smallest state by area.', x: 205, y: 430 },
  { name: 'Gujarat', capital: 'Gandhinagar', language: 'Gujarati', zone: 'West', emoji: '🦁', fact: 'Home of the Asiatic lion.', x: 150, y: 260 },
  { name: 'Haryana', capital: 'Chandigarh', language: 'Hindi', zone: 'North', emoji: '🥛', fact: 'Known for farming, sports, and milk production.', x: 235, y: 140 },
  { name: 'Himachal Pradesh', capital: 'Shimla', language: 'Hindi', zone: 'North', emoji: '🏔️', fact: 'Famous for mountains and apple orchards.', x: 255, y: 95 },
  { name: 'Jharkhand', capital: 'Ranchi', language: 'Hindi', zone: 'East', emoji: '⛏️', fact: 'Rich in minerals and forests.', x: 375, y: 285 },
  { name: 'Karnataka', capital: 'Bengaluru', language: 'Kannada', zone: 'South', emoji: '💻', fact: 'Bengaluru is called India’s Silicon Valley.', x: 245, y: 455 },
  { name: 'Kerala', capital: 'Thiruvananthapuram', language: 'Malayalam', zone: 'South', emoji: '🌴', fact: 'Known for backwaters and coconut trees.', x: 255, y: 540 },
  { name: 'Madhya Pradesh', capital: 'Bhopal', language: 'Hindi', zone: 'Central', emoji: '🐯', fact: 'Often called the heart of India.', x: 245, y: 270 },
  { name: 'Maharashtra', capital: 'Mumbai', language: 'Marathi', zone: 'West', emoji: '🎬', fact: 'Mumbai is home to Bollywood.', x: 225, y: 355 },
  { name: 'Manipur', capital: 'Imphal', language: 'Meitei', zone: 'North East', emoji: '🪷', fact: 'Famous for Loktak Lake and classical dance.', x: 545, y: 245 },
  { name: 'Meghalaya', capital: 'Shillong', language: 'English', zone: 'North East', emoji: '☔', fact: 'One of the rainiest regions in the world.', x: 490, y: 230 },
  { name: 'Mizoram', capital: 'Aizawl', language: 'Mizo', zone: 'North East', emoji: '🎶', fact: 'Known for hills, bamboo, and music.', x: 535, y: 285 },
  { name: 'Nagaland', capital: 'Kohima', language: 'English', zone: 'North East', emoji: '🥁', fact: 'Famous for the Hornbill Festival.', x: 565, y: 215 },
  { name: 'Odisha', capital: 'Bhubaneswar', language: 'Odia', zone: 'East', emoji: '🛕', fact: 'Known for temples and the Jagannath Rath Yatra.', x: 365, y: 345 },
  { name: 'Punjab', capital: 'Chandigarh', language: 'Punjabi', zone: 'North', emoji: '🌻', fact: 'Known for wheat fields, music, and bhangra.', x: 220, y: 115 },
  { name: 'Rajasthan', capital: 'Jaipur', language: 'Hindi', zone: 'West', emoji: '🐪', fact: 'Jaipur is called the Pink City.', x: 165, y: 190 },
  { name: 'Sikkim', capital: 'Gangtok', language: 'Nepali', zone: 'North East', emoji: '🏞️', fact: 'A small Himalayan state with beautiful views.', x: 430, y: 165 },
  { name: 'Tamil Nadu', capital: 'Chennai', language: 'Tamil', zone: 'South', emoji: '🎻', fact: 'Famous for temples, classical music, and Bharatanatyam.', x: 300, y: 520 },
  { name: 'Telangana', capital: 'Hyderabad', language: 'Telugu', zone: 'South', emoji: '💎', fact: 'Hyderabad is famous for Charminar and biryani.', x: 290, y: 395 },
  { name: 'Tripura', capital: 'Agartala', language: 'Bengali', zone: 'North East', emoji: '🏰', fact: 'Known for palaces and bamboo crafts.', x: 505, y: 265 },
  { name: 'Uttar Pradesh', capital: 'Lucknow', language: 'Hindi', zone: 'North', emoji: '🕌', fact: 'India’s most populous state.', x: 295, y: 205 },
  { name: 'Uttarakhand', capital: 'Dehradun', language: 'Hindi', zone: 'North', emoji: '⛰️', fact: 'Known for the Himalayas and holy rivers.', x: 290, y: 135 },
  { name: 'West Bengal', capital: 'Kolkata', language: 'Bengali', zone: 'East', emoji: '📖', fact: 'Famous for literature, sweets, and Durga Puja.', x: 425, y: 300 }
];

function makeQuestion(index) {
  const answer = states[index % states.length];
  const pool = states.filter((s) => s.name !== answer.name).sort(() => Math.random() - 0.5).slice(0, 3);
  const options = [...pool.map((s) => s.capital), answer.capital].sort(() => Math.random() - 0.5);
  return { answer, options };
}

function IndiaMap({ selected, visited, onPick }) {
  return (
    <div className="india-map-wrap">
      <svg className="india-map" viewBox="0 0 650 620" role="img" aria-label="Clickable illustrated map of India states">
        <defs>
          <filter id="shadow"><feDropShadow dx="0" dy="8" stdDeviation="8" floodOpacity="0.18" /></filter>
          <linearGradient id="indiaFill" x1="0" x2="1"><stop offset="0" stopColor="#fff7ad"/><stop offset=".5" stopColor="#b8f7d4"/><stop offset="1" stopColor="#a7d8ff"/></linearGradient>
        </defs>
        <path className="india-silhouette" filter="url(#shadow)" d="M210 45 L265 25 L325 55 L350 105 L405 120 L445 165 L510 165 L595 205 L560 250 L505 270 L470 310 L440 365 L395 395 L365 455 L338 560 L302 590 L267 540 L240 475 L190 435 L170 380 L115 350 L85 300 L125 255 L105 205 L145 165 L160 110 Z" />
        <path className="india-line" d="M180 130 L265 155 L340 125 M145 210 L250 260 L390 245 M150 315 L260 350 L420 320 M225 430 L320 445 L365 540 M430 175 L500 220 L565 210" />
        {states.map((state) => (
          <g key={state.name} className={`map-pin ${selected.name === state.name ? 'active' : ''}`} onClick={() => onPick(state)} onKeyDown={(e) => e.key === 'Enter' && onPick(state)} tabIndex="0" role="button" aria-label={`Open ${state.name}`}>
            <circle cx={state.x} cy={state.y} r={selected.name === state.name ? 20 : 16} />
            <text x={state.x} y={state.y + 6}>{state.emoji}</text>
            {visited.has(state.name) && <text className="visited-star" x={state.x + 12} y={state.y - 12}>★</text>}
            <title>{state.name}</title>
          </g>
        ))}
      </svg>
      <p className="map-caption">Tap a marker on the India map. The board below is also clickable for practice.</p>
    </div>
  );
}

export default function App() {
  const [selected, setSelected] = useState(states[13]);
  const [visited, setVisited] = useState(new Set(['Maharashtra']));
  const [mode, setMode] = useState('explore');
  const [query, setQuery] = useState('');
  const [quizIndex, setQuizIndex] = useState(0);
  const [huntIndex, setHuntIndex] = useState(5);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('Tap a state to begin your adventure!');

  const filteredStates = useMemo(() => states.filter((s) =>
    [s.name, s.capital, s.language, s.zone].join(' ').toLowerCase().includes(query.toLowerCase())
  ), [query]);

  const question = useMemo(() => makeQuestion(quizIndex), [quizIndex]);
  const treasure = states[huntIndex % states.length];

  function chooseState(state) {
    setSelected(state);
    setVisited((old) => new Set([...old, state.name]));
    if (mode === 'hunt') {
      if (state.name === treasure.name) {
        setScore((s) => s + 15);
        setMessage(`Treasure found! ${state.name} has capital ${state.capital}. +15 stars! 🪙`);
        setHuntIndex((i) => i + 7);
      } else {
        setMessage(`Almost! Look for the state with capital ${treasure.capital}.`);
      }
    } else {
      setMessage(`Great! ${state.name}'s capital is ${state.capital}.`);
    }
  }

  function speak(state) {
    if (!window.speechSynthesis) return;
    const text = `${state.name}. Capital ${state.capital}. Main language ${state.language}.`;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  }

  function answerQuiz(option) {
    if (option === question.answer.capital) {
      setScore((s) => s + 10);
      setMessage('Correct! You earned 10 stars! ⭐');
    } else {
      setMessage(`Good try! The answer is ${question.answer.capital}.`);
    }
    setSelected(question.answer);
    setVisited((old) => new Set([...old, question.answer.name]));
    setQuizIndex((i) => i + 1);
  }

  return (
    <main className="app">
      <section className="hero">
        <div>
          <p className="eyebrow">For curious explorers age 7+</p>
          <h1>🇮🇳 India States Adventure</h1>
          <p className="subtitle">Tap the India map, learn capitals and languages, then win quiz stars.</p>
        </div>
        <div className="mascot" aria-hidden="true">🐘</div>
        <div className="score-card"><Trophy /> <strong>{score}</strong><span>quiz stars</span></div>
      </section>

      <nav className="tabs">
        <button className={mode === 'explore' ? 'active' : ''} onClick={() => setMode('explore')}>🗺️ Explore</button>
        <button className={mode === 'quiz' ? 'active' : ''} onClick={() => setMode('quiz')}>⭐ Quiz</button>
        <button className={mode === 'hunt' ? 'active' : ''} onClick={() => setMode('hunt')}><Compass size={18}/> Treasure Hunt</button>
        <button onClick={() => { setScore(0); setQuizIndex(0); setVisited(new Set()); setMessage('Adventure reset!'); }}><RotateCcw size={18}/> Reset</button>
      </nav>

      {mode === 'hunt' && (
        <section className="hunt-card">
          <h2>🪙 Treasure Hunt</h2>
          <p>Find the state whose capital is <strong>{treasure.capital}</strong> and language is <strong>{treasure.language}</strong>.</p>
        </section>
      )}

      <div className="layout">
        <section className="map-card">
          <div className="map-title"><MapPin /> Clickable India Map</div>
          <IndiaMap selected={selected} visited={visited} onPick={chooseState} />
          <input className="search" placeholder="Search state, capital, language..." value={query} onChange={(e) => setQuery(e.target.value)} />
          <div className="state-grid compact">
            {filteredStates.map((state) => (
              <button key={state.name} className={`state-tile ${selected.name === state.name ? 'selected' : ''}`} onClick={() => chooseState(state)}>
                <span className="emoji">{state.emoji}</span>
                <span>{state.name}</span>
                {visited.has(state.name) && <Star className="mini-star" size={14} />}
              </button>
            ))}
          </div>
        </section>

        <aside className="info-card">
          <div className="big-emoji">{selected.emoji}</div>
          <h2>{selected.name}</h2>
          <div className="fact-row"><strong>🏛 Capital</strong><span>{selected.capital}</span></div>
          <div className="fact-row"><strong>🗣 Language</strong><span>{selected.language}</span></div>
          <div className="fact-row"><strong>🧭 Zone</strong><span>{selected.zone}</span></div>
          <p className="fun"><Sparkles size={18}/> {selected.fact}</p>
          <button className="speak" onClick={() => speak(selected)}><Volume2 size={18}/> Read aloud</button>
          <p className="message">{message}</p>
          <div className="progress">Visited {visited.size} / {states.length} states</div>
        </aside>
      </div>

      {mode === 'quiz' && (
        <section className="quiz-card">
          <h2>Quiz Quest</h2>
          <p>What is the capital of <strong>{question.answer.name}</strong>?</p>
          <div className="quiz-options">
            {question.options.map((option) => <button key={option} onClick={() => answerQuiz(option)}>{option}</button>)}
          </div>
        </section>
      )}
    </main>
  );
}
