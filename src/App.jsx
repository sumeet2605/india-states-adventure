import React, { useMemo, useState } from 'react';
import { MapPin, Star, Trophy, Volume2, Sparkles, RotateCcw, Compass } from 'lucide-react';
import VectorIndiaMap from './VectorIndiaMap';
import './style.css';

const states = [
  { name: 'Andhra Pradesh', capital: 'Amaravati', language: 'Telugu', zone: 'South', emoji: '🌾', fact: 'Known for spicy food and Kuchipudi dance.', x: 33, y: 57 },
  { name: 'Arunachal Pradesh', capital: 'Itanagar', language: 'English', zone: 'North East', emoji: '🌄', fact: 'One of the first places in India to see sunrise.', x: 88, y: 30 },
  { name: 'Assam', capital: 'Dispur', language: 'Assamese', zone: 'North East', emoji: '🍵', fact: 'Famous for tea gardens and one-horned rhinos.', x: 78, y: 36 },
  { name: 'Bihar', capital: 'Patna', language: 'Hindi', zone: 'East', emoji: '📚', fact: 'Home to ancient learning centers like Nalanda.', x: 61, y: 36 },
  { name: 'Chhattisgarh', capital: 'Raipur', language: 'Hindi', zone: 'Central', emoji: '🌳', fact: 'Has beautiful forests and waterfalls.', x: 46, y: 49 },
  { name: 'Goa', capital: 'Panaji', language: 'Konkani', zone: 'West', emoji: '🏖️', fact: 'India’s smallest state by area.', x: 21, y: 57 },
  { name: 'Gujarat', capital: 'Gandhinagar', language: 'Gujarati', zone: 'West', emoji: '🦁', fact: 'Home of the Asiatic lion.', x: 16, y: 39 },
  { name: 'Haryana', capital: 'Chandigarh', language: 'Hindi', zone: 'North', emoji: '🥛', fact: 'Known for farming, sports, and milk production.', x: 31, y: 25 },
  { name: 'Himachal Pradesh', capital: 'Shimla', language: 'Hindi', zone: 'North', emoji: '🏔️', fact: 'Famous for mountains and apple orchards.', x: 35, y: 20 },
  { name: 'Jharkhand', capital: 'Ranchi', language: 'Hindi', zone: 'East', emoji: '⛏️', fact: 'Rich in minerals and forests.', x: 56, y: 42 },
  { name: 'Karnataka', capital: 'Bengaluru', language: 'Kannada', zone: 'South', emoji: '💻', fact: 'Bengaluru is called India’s Silicon Valley.', x: 27, y: 62 },
  { name: 'Kerala', capital: 'Thiruvananthapuram', language: 'Malayalam', zone: 'South', emoji: '🌴', fact: 'Known for backwaters and coconut trees.', x: 30, y: 72 },
  { name: 'Madhya Pradesh', capital: 'Bhopal', language: 'Hindi', zone: 'Central', emoji: '🐯', fact: 'Often called the heart of India.', x: 36, y: 42 },
  { name: 'Maharashtra', capital: 'Mumbai', language: 'Marathi', zone: 'West', emoji: '🎬', fact: 'Mumbai is home to Bollywood.', x: 29, y: 52 },
  { name: 'Manipur', capital: 'Imphal', language: 'Meitei', zone: 'North East', emoji: '🪷', fact: 'Famous for Loktak Lake and classical dance.', x: 89, y: 38 },
  { name: 'Meghalaya', capital: 'Shillong', language: 'English', zone: 'North East', emoji: '☔', fact: 'One of the rainiest regions in the world.', x: 78, y: 41 },
  { name: 'Mizoram', capital: 'Aizawl', language: 'Mizo', zone: 'North East', emoji: '🎶', fact: 'Known for hills, bamboo, and music.', x: 86, y: 48 },
  { name: 'Nagaland', capital: 'Kohima', language: 'English', zone: 'North East', emoji: '🥁', fact: 'Famous for the Hornbill Festival.', x: 88, y: 34 },
  { name: 'Odisha', capital: 'Bhubaneswar', language: 'Odia', zone: 'East', emoji: '🛕', fact: 'Known for temples and the Jagannath Rath Yatra.', x: 52, y: 51 },
  { name: 'Punjab', capital: 'Chandigarh', language: 'Punjabi', zone: 'North', emoji: '🌻', fact: 'Known for wheat fields, music, and bhangra.', x: 30, y: 23 },
  { name: 'Rajasthan', capital: 'Jaipur', language: 'Hindi', zone: 'West', emoji: '🐪', fact: 'Jaipur is called the Pink City.', x: 25, y: 34 },
  { name: 'Sikkim', capital: 'Gangtok', language: 'Nepali', zone: 'North East', emoji: '🏞️', fact: 'A small Himalayan state with beautiful views.', x: 70, y: 28 },
  { name: 'Tamil Nadu', capital: 'Chennai', language: 'Tamil', zone: 'South', emoji: '🎻', fact: 'Famous for temples, classical music, and Bharatanatyam.', x: 36, y: 68 },
  { name: 'Telangana', capital: 'Hyderabad', language: 'Telugu', zone: 'South', emoji: '💎', fact: 'Hyderabad is famous for Charminar and biryani.', x: 39, y: 54 },
  { name: 'Tripura', capital: 'Agartala', language: 'Bengali', zone: 'North East', emoji: '🏰', fact: 'Known for palaces and bamboo crafts.', x: 81, y: 46 },
  { name: 'Uttar Pradesh', capital: 'Lucknow', language: 'Hindi', zone: 'North', emoji: '🕌', fact: 'India’s most populous state.', x: 44, y: 34 },
  { name: 'Uttarakhand', capital: 'Dehradun', language: 'Hindi', zone: 'North', emoji: '⛰️', fact: 'Known for the Himalayas and holy rivers.', x: 41, y: 25 },
  { name: 'West Bengal', capital: 'Kolkata', language: 'Bengali', zone: 'East', emoji: '📖', fact: 'Famous for literature, sweets, and Durga Puja.', x: 64, y: 45 }
];

function makeQuestion(index) {
  const answer = states[index % states.length];
  const pool = states.filter((s) => s.name !== answer.name).sort(() => Math.random() - 0.5).slice(0, 3);
  const options = [...pool.map((s) => s.capital), answer.capital].sort(() => Math.random() - 0.5);
  return { answer, options };
}

export default function App() {
  const [selected, setSelected] = useState(states[13]);
  const [visited, setVisited] = useState(new Set(['Maharashtra']));
  const [mode, setMode] = useState('explore');
  const [query, setQuery] = useState('');
  const [quizIndex, setQuizIndex] = useState(0);
  const [huntIndex, setHuntIndex] = useState(5);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('Tap a colored state shape to begin!');

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
          <p className="subtitle">Tap real clickable state shapes, learn capitals and languages, then win quiz stars.</p>
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

      <div className="layout wide-map-layout">
        <section className="map-card">
          <div className="map-title"><MapPin /> Clickable India Vector Map</div>
          <VectorIndiaMap states={states} selected={selected} visited={visited} onPick={chooseState} />
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
