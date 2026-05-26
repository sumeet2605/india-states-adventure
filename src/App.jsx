import React, { useMemo, useState } from 'react';
import { MapPin, Star, Trophy, Volume2, Sparkles, RotateCcw } from 'lucide-react';
import './style.css';

const states = [
  { name: 'Andhra Pradesh', capital: 'Amaravati', language: 'Telugu', zone: 'South', emoji: '🌾', fact: 'Known for spicy food and Kuchipudi dance.' },
  { name: 'Arunachal Pradesh', capital: 'Itanagar', language: 'English', zone: 'North East', emoji: '🌄', fact: 'One of the first places in India to see sunrise.' },
  { name: 'Assam', capital: 'Dispur', language: 'Assamese', zone: 'North East', emoji: '🍵', fact: 'Famous for tea gardens and one-horned rhinos.' },
  { name: 'Bihar', capital: 'Patna', language: 'Hindi', zone: 'East', emoji: '📚', fact: 'Home to ancient learning centers like Nalanda.' },
  { name: 'Chhattisgarh', capital: 'Raipur', language: 'Hindi', zone: 'Central', emoji: '🌳', fact: 'Has beautiful forests and waterfalls.' },
  { name: 'Goa', capital: 'Panaji', language: 'Konkani', zone: 'West', emoji: '🏖️', fact: 'India’s smallest state by area.' },
  { name: 'Gujarat', capital: 'Gandhinagar', language: 'Gujarati', zone: 'West', emoji: '🦁', fact: 'Home of the Asiatic lion.' },
  { name: 'Haryana', capital: 'Chandigarh', language: 'Hindi', zone: 'North', emoji: '🥛', fact: 'Known for farming, sports, and milk production.' },
  { name: 'Himachal Pradesh', capital: 'Shimla', language: 'Hindi', zone: 'North', emoji: '🏔️', fact: 'Famous for mountains and apple orchards.' },
  { name: 'Jharkhand', capital: 'Ranchi', language: 'Hindi', zone: 'East', emoji: '⛏️', fact: 'Rich in minerals and forests.' },
  { name: 'Karnataka', capital: 'Bengaluru', language: 'Kannada', zone: 'South', emoji: '💻', fact: 'Bengaluru is called India’s Silicon Valley.' },
  { name: 'Kerala', capital: 'Thiruvananthapuram', language: 'Malayalam', zone: 'South', emoji: '🌴', fact: 'Known for backwaters and coconut trees.' },
  { name: 'Madhya Pradesh', capital: 'Bhopal', language: 'Hindi', zone: 'Central', emoji: '🐯', fact: 'Often called the heart of India.' },
  { name: 'Maharashtra', capital: 'Mumbai', language: 'Marathi', zone: 'West', emoji: '🎬', fact: 'Mumbai is home to Bollywood.' },
  { name: 'Manipur', capital: 'Imphal', language: 'Meitei', zone: 'North East', emoji: '🪷', fact: 'Famous for Loktak Lake and classical dance.' },
  { name: 'Meghalaya', capital: 'Shillong', language: 'English', zone: 'North East', emoji: '☔', fact: 'One of the rainiest regions in the world.' },
  { name: 'Mizoram', capital: 'Aizawl', language: 'Mizo', zone: 'North East', emoji: '🎶', fact: 'Known for hills, bamboo, and music.' },
  { name: 'Nagaland', capital: 'Kohima', language: 'English', zone: 'North East', emoji: '🥁', fact: 'Famous for the Hornbill Festival.' },
  { name: 'Odisha', capital: 'Bhubaneswar', language: 'Odia', zone: 'East', emoji: '🛕', fact: 'Known for temples and the Jagannath Rath Yatra.' },
  { name: 'Punjab', capital: 'Chandigarh', language: 'Punjabi', zone: 'North', emoji: '🌻', fact: 'Known for wheat fields, music, and bhangra.' },
  { name: 'Rajasthan', capital: 'Jaipur', language: 'Hindi', zone: 'West', emoji: '🐪', fact: 'Jaipur is called the Pink City.' },
  { name: 'Sikkim', capital: 'Gangtok', language: 'Nepali', zone: 'North East', emoji: '🏞️', fact: 'A small Himalayan state with beautiful views.' },
  { name: 'Tamil Nadu', capital: 'Chennai', language: 'Tamil', zone: 'South', emoji: '🎻', fact: 'Famous for temples, classical music, and Bharatanatyam.' },
  { name: 'Telangana', capital: 'Hyderabad', language: 'Telugu', zone: 'South', emoji: '💎', fact: 'Hyderabad is famous for Charminar and biryani.' },
  { name: 'Tripura', capital: 'Agartala', language: 'Bengali', zone: 'North East', emoji: '🏰', fact: 'Known for palaces and bamboo crafts.' },
  { name: 'Uttar Pradesh', capital: 'Lucknow', language: 'Hindi', zone: 'North', emoji: '🕌', fact: 'India’s most populous state.' },
  { name: 'Uttarakhand', capital: 'Dehradun', language: 'Hindi', zone: 'North', emoji: '⛰️', fact: 'Known for the Himalayas and holy rivers.' },
  { name: 'West Bengal', capital: 'Kolkata', language: 'Bengali', zone: 'East', emoji: '📖', fact: 'Famous for literature, sweets, and Durga Puja.' }
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
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('Tap a state to begin your adventure!');

  const filteredStates = useMemo(() => states.filter((s) =>
    [s.name, s.capital, s.language, s.zone].join(' ').toLowerCase().includes(query.toLowerCase())
  ), [query]);

  const question = useMemo(() => makeQuestion(quizIndex), [quizIndex]);

  function chooseState(state) {
    setSelected(state);
    setVisited((old) => new Set([...old, state.name]));
    setMessage(`Great! ${state.name}'s capital is ${state.capital}.`);
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
          <p className="subtitle">Tap states, learn capitals and languages, then win quiz stars.</p>
        </div>
        <div className="score-card"><Trophy /> <strong>{score}</strong><span>quiz stars</span></div>
      </section>

      <nav className="tabs">
        <button className={mode === 'explore' ? 'active' : ''} onClick={() => setMode('explore')}>🗺️ Explore</button>
        <button className={mode === 'quiz' ? 'active' : ''} onClick={() => setMode('quiz')}>⭐ Quiz</button>
        <button onClick={() => { setScore(0); setQuizIndex(0); setVisited(new Set()); setMessage('Adventure reset!'); }}><RotateCcw size={18}/> Reset</button>
      </nav>

      <div className="layout">
        <section className="map-card">
          <div className="map-title"><MapPin /> Clickable State Board</div>
          <input className="search" placeholder="Search state, capital, language..." value={query} onChange={(e) => setQuery(e.target.value)} />
          <div className="state-grid">
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
