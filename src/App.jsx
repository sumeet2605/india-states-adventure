import React, { useMemo, useState } from 'react';
import { MapPin, Star, Trophy, Volume2, Sparkles, RotateCcw, Compass } from 'lucide-react';
import VectorIndiaMap from './VectorIndiaMap';
import { continents, oceans, countries } from './data';
import { earnedBadges, makeOptions } from './games';
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
  { name: 'West Bengal', capital: 'Kolkata', language: 'Bengali', zone: 'East', emoji: '📖', fact: 'Famous for literature, sweets, and Durga Puja.', x: 64, y: 45 },
  { name: 'Andaman and Nicobar Islands', capital: 'Port Blair', language: 'Hindi, English, Bengali, Tamil, Telugu', zone: 'Union Territory', emoji: '🏝️', fact: 'A group of islands in the Bay of Bengal.', x: 91, y: 82 },
  { name: 'Chandigarh', capital: 'Chandigarh', language: 'Hindi, Punjabi, English', zone: 'Union Territory', emoji: '🏙️', fact: 'A planned city and capital shared by Punjab and Haryana.', x: 31, y: 24 },
  { name: 'Dadra and Nagar Haveli and Daman and Diu', capital: 'Daman', language: 'Gujarati, Hindi, Marathi', zone: 'Union Territory', emoji: '🌊', fact: 'A coastal union territory with small enclaves in western India.', x: 20, y: 48 },
  { name: 'Delhi', capital: 'New Delhi', language: 'Hindi, English, Punjabi, Urdu', zone: 'Union Territory', emoji: '🏛️', fact: 'India’s national capital territory.', x: 36, y: 29 },
  { name: 'Jammu and Kashmir', capital: 'Srinagar / Jammu', language: 'Kashmiri, Dogri, Hindi, Urdu, English', zone: 'Union Territory', emoji: '🏔️', fact: 'Has summer and winter capitals.', x: 30, y: 16 },
  { name: 'Ladakh', capital: 'Leh', language: 'Ladakhi, Hindi, English', zone: 'Union Territory', emoji: '❄️', fact: 'Known for high mountains, monasteries, and cold desert landscapes.', x: 39, y: 12 },
  { name: 'Lakshadweep', capital: 'Kavaratti', language: 'Malayalam, English', zone: 'Union Territory', emoji: '🐠', fact: 'India’s smallest union territory, made of coral islands.', x: 24, y: 78 },
  { name: 'Puducherry', capital: 'Puducherry', language: 'Tamil, English, Telugu, Malayalam', zone: 'Union Territory', emoji: '🌅', fact: 'A coastal union territory with French heritage.', x: 38, y: 72 }
];

function LearningCards({ title, subtitle, items, selected, onPick, type }) {
  return <section className="map-card"><div className="map-title">{type === 'country' ? '✈️' : type === 'ocean' ? '🌊' : '🌍'} {title}</div><p className="subtitle mini-subtitle">{subtitle}</p><div className="world-grid">{items.map((item) => <button key={item.name} className={`world-card ${selected.name === item.name ? 'selected' : ''}`} onClick={() => onPick(item)}><span className="world-emoji">{item.emoji}</span><strong>{item.name}</strong><small>{item.capital || item.size}</small></button>)}</div></section>;
}

function WorldInfo({ item, type, speak }) {
  return <aside className="info-card"><div className="big-emoji">{item.emoji}</div><h2>{item.name}</h2>{type === 'country' ? <><div className="fact-row"><strong>🏛 Capital</strong><span>{item.capital}</span></div><div className="fact-row"><strong>💰 Currency</strong><span>{item.currency}</span></div><div className="fact-row"><strong>🗣 Language</strong><span>{item.language}</span></div><div className="fact-row"><strong>📍 Landmark</strong><span>{item.landmark}</span></div></> : <><div className="fact-row"><strong>📏 Size</strong><span>{item.size}</span></div>{type === 'continent' ? <><div className="fact-row"><strong>🌐 Countries</strong><span>{item.countries}</span></div><div className="fact-row"><strong>🦁 Animals</strong><span>{item.animals}</span></div><div className="fact-row"><strong>📍 Landmark</strong><span>{item.landmark}</span></div></> : <><div className="fact-row"><strong>🗺 Touches</strong><span>{item.touches}</span></div><div className="fact-row"><strong>🐬 Animals</strong><span>{item.animals}</span></div></>}</>}<p className="fun"><Sparkles size={18}/> {item.fact}</p><button className="speak" onClick={() => speak(item)}><Volume2 size={18}/> Read aloud</button></aside>;
}

function MemoryGame({ items, leftKey, rightKey, title, onWin }) {
  const pairs = useMemo(() => items.slice(0, 6).flatMap((item) => [{ id: item.name + '-a', pair: item.name, text: item[leftKey], open: false }, { id: item.name + '-b', pair: item.name, text: item[rightKey], open: false }]).sort(() => Math.random() - 0.5), [items, leftKey, rightKey]);
  const [cards, setCards] = useState(pairs);
  const [picked, setPicked] = useState([]);
  function pick(card) { if (card.open || picked.length === 2) return; const next = cards.map((c) => c.id === card.id ? { ...c, open: true } : c); const newPicked = [...picked, card]; setCards(next); setPicked(newPicked); if (newPicked.length === 2) setTimeout(() => { const match = newPicked[0].pair === newPicked[1].pair; setCards((old) => old.map((c) => newPicked.some((p) => p.id === c.id) ? { ...c, open: match } : c)); setPicked([]); if (match) onWin(5); }, 550); }
  return <section className="quiz-card"><h2>🧠 {title}</h2><p>Match the pairs to earn stars.</p><div className="memory-grid">{cards.map((card) => <button key={card.id} className={`memory-card ${card.open ? 'open' : ''}`} onClick={() => pick(card)}>{card.open ? card.text : '❓'}</button>)}</div></section>;
}

function Passport({ score, visitedCount }) { const badges = earnedBadges(score); return <section className="passport-card"><h2>🛂 Explorer Passport</h2><p>Visited {visitedCount} places. Stars: {score}</p><div className="badge-row">{badges.length ? badges.map((b) => <span key={b.name} className="badge">{b.emoji} {b.name}</span>) : <span className="badge locked">🔒 Earn 25 stars for first badge</span>}</div></section>; }
function makeQuestion(index, list) { const answer = list[index % list.length]; const pool = list.filter((s) => s.name !== answer.name).sort(() => Math.random() - 0.5).slice(0, 3); const options = [...pool.map((s) => s.capital || s.landmark || s.size), answer.capital || answer.landmark || answer.size].sort(() => Math.random() - 0.5); return { answer, options }; }

export default function App() {
  const [section, setSection] = useState('india');
  const [selected, setSelected] = useState(states[13]);
  const [selectedContinent, setSelectedContinent] = useState(continents[0]);
  const [selectedOcean, setSelectedOcean] = useState(oceans[0]);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [visited, setVisited] = useState(new Set(['Maharashtra']));
  const [mode, setMode] = useState('explore');
  const [query, setQuery] = useState('');
  const [quizIndex, setQuizIndex] = useState(0);
  const [huntIndex, setHuntIndex] = useState(5);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('Tap a colored state or union territory shape to begin!');
  const [worldQuizIndex, setWorldQuizIndex] = useState(0);
  const [countryQuizIndex, setCountryQuizIndex] = useState(0);

  const filteredStates = useMemo(() => states.filter((s) => [s.name, s.capital, s.language, s.zone].join(' ').toLowerCase().includes(query.toLowerCase())), [query]);
  const question = useMemo(() => makeQuestion(quizIndex, states), [quizIndex]);
  const treasure = states[huntIndex % states.length];
  const worldItems = [...continents, ...oceans, ...countries];
  const worldQuestion = worldItems[worldQuizIndex % worldItems.length];
  const worldOptions = useMemo(() => makeOptions(worldItems, worldQuestion, (i) => i.landmark || i.capital || i.size), [worldQuizIndex]);
  const countryQuestion = countries[countryQuizIndex % countries.length];
  const countryCapitalOptions = useMemo(() => makeOptions(countries, countryQuestion, (i) => i.capital), [countryQuizIndex]);
  const currencyOptions = useMemo(() => makeOptions(countries, countryQuestion, (i) => i.currency), [countryQuizIndex]);

  function addStars(amount, note) { setScore((s) => s + amount); setMessage(note || `You earned ${amount} stars! ⭐`); }
  function chooseState(state) { setSelected(state); setVisited((old) => new Set([...old, state.name])); if (mode === 'hunt') { if (state.name === treasure.name) { addStars(15, `Treasure found! ${state.name} has capital ${state.capital}. +15 stars! 🪙`); setHuntIndex((i) => i + 7); } else setMessage(`Almost! Look for the state or UT with capital ${treasure.capital}.`); } else setMessage(`Great! ${state.name}'s capital is ${state.capital}.`); }
  function speak(item) { if (!window.speechSynthesis) return; const text = item.currency ? `${item.name}. Capital ${item.capital}. Currency ${item.currency}. Language ${item.language}.` : item.capital ? `${item.name}. Capital ${item.capital}. Main language ${item.language}.` : `${item.name}. ${item.size}. ${item.fact}`; window.speechSynthesis.cancel(); window.speechSynthesis.speak(new SpeechSynthesisUtterance(text)); }
  function answerQuiz(option) { if (option === question.answer.capital) addStars(10, 'Correct! You earned 10 stars! ⭐'); else setMessage(`Good try! The answer is ${question.answer.capital}.`); setSelected(question.answer); setVisited((old) => new Set([...old, question.answer.name])); setQuizIndex((i) => i + 1); }
  function answerWorld(option) { const correct = worldQuestion.landmark || worldQuestion.capital || worldQuestion.size; if (option === correct) addStars(10, 'World quiz correct! +10 stars 🌎'); else setMessage(`Good try! The answer is ${correct}.`); setWorldQuizIndex((i) => i + 1); }
  function answerCountry(option, field) { const correct = countryQuestion[field]; if (option === correct) addStars(10, `Correct! ${countryQuestion.name} uses ${correct}. +10 stars ✈️`); else setMessage(`Good try! ${countryQuestion.name}: ${correct}.`); setSelectedCountry(countryQuestion); setCountryQuizIndex((i) => i + 1); }

  return <main className="app"><section className="hero"><div><p className="eyebrow">For curious explorers age 7+</p><h1>🌎 Geography Adventure</h1><p className="subtitle">Explore India, continents, oceans, and countries with games, stars, badges, and read-aloud learning.</p></div><div className="mascot" aria-hidden="true">🐘</div><div className="score-card"><Trophy /> <strong>{score}</strong><span>stars</span></div></section><Passport score={score} visitedCount={visited.size} />
    <nav className="tabs"><button className={section === 'india' ? 'active' : ''} onClick={() => setSection('india')}>🇮🇳 India</button><button className={section === 'continents' ? 'active' : ''} onClick={() => setSection('continents')}>🌍 Continents</button><button className={section === 'oceans' ? 'active' : ''} onClick={() => setSection('oceans')}>🌊 Oceans</button><button className={section === 'countries' ? 'active' : ''} onClick={() => setSection('countries')}>✈️ Countries</button><button className={section === 'worldquiz' ? 'active' : ''} onClick={() => setSection('worldquiz')}>🎯 World Quiz</button><button className={section === 'memory' ? 'active' : ''} onClick={() => setSection('memory')}>🧠 Memory</button></nav>
    {section === 'india' && <><nav className="tabs"><button className={mode === 'explore' ? 'active' : ''} onClick={() => setMode('explore')}>🗺️ Explore</button><button className={mode === 'quiz' ? 'active' : ''} onClick={() => setMode('quiz')}>⭐ Quiz</button><button className={mode === 'hunt' ? 'active' : ''} onClick={() => setMode('hunt')}><Compass size={18}/> Treasure Hunt</button><button onClick={() => { setScore(0); setQuizIndex(0); setVisited(new Set()); setMessage('Adventure reset!'); }}><RotateCcw size={18}/> Reset</button></nav>{mode === 'hunt' && <section className="hunt-card"><h2>🪙 Treasure Hunt</h2><p>Find the state or UT whose capital is <strong>{treasure.capital}</strong> and language is <strong>{treasure.language}</strong>.</p></section>}<div className="layout wide-map-layout"><section className="map-card"><div className="map-title"><MapPin /> Clickable India Map</div><VectorIndiaMap states={states} selected={selected} visited={visited} onPick={chooseState} /><input className="search" placeholder="Search state, UT, capital, language..." value={query} onChange={(e) => setQuery(e.target.value)} /><div className="state-grid compact">{filteredStates.map((state) => <button key={state.name} className={`state-tile ${selected.name === state.name ? 'selected' : ''}`} onClick={() => chooseState(state)}><span className="emoji">{state.emoji}</span><span>{state.name}</span>{visited.has(state.name) && <Star className="mini-star" size={14} />}</button>)}</div></section><aside className="info-card"><div className="big-emoji">{selected.emoji}</div><h2>{selected.name}</h2><div className="fact-row"><strong>🏛 Capital</strong><span>{selected.capital}</span></div><div className="fact-row"><strong>🗣 Language</strong><span>{selected.language}</span></div><div className="fact-row"><strong>🧭 Zone</strong><span>{selected.zone}</span></div><p className="fun"><Sparkles size={18}/> {selected.fact}</p><button className="speak" onClick={() => speak(selected)}><Volume2 size={18}/> Read aloud</button><p className="message">{message}</p><div className="progress">Visited {visited.size} / {states.length} places</div></aside></div>{mode === 'quiz' && <section className="quiz-card"><h2>Quiz Quest</h2><p>What is the capital of <strong>{question.answer.name}</strong>?</p><div className="quiz-options">{question.options.map((option) => <button key={option} onClick={() => answerQuiz(option)}>{option}</button>)}</div></section>}</>}
    {section === 'continents' && <div className="layout"><LearningCards title="Continents Explorer" subtitle="Tap a continent to learn landmarks, animals, and fun facts." items={continents} selected={selectedContinent} onPick={(item) => { setSelectedContinent(item); addStars(2, `Passport stamp for ${item.name}! +2 stars ✨`); }} type="continent" /><WorldInfo item={selectedContinent} type="continent" speak={speak} /></div>}
    {section === 'oceans' && <div className="layout"><LearningCards title="Oceans Explorer" subtitle="Tap an ocean to learn where it is and what animals live there." items={oceans} selected={selectedOcean} onPick={(item) => { setSelectedOcean(item); addStars(2, `Ocean stamp for ${item.name}! +2 stars 🌊`); }} type="ocean" /><WorldInfo item={selectedOcean} type="ocean" speak={speak} /></div>}
    {section === 'countries' && <><div className="layout"><LearningCards title="Countries Explorer" subtitle="Tap a country to learn its capital, currency, language, landmark, and fun fact." items={countries} selected={selectedCountry} onPick={(item) => { setSelectedCountry(item); addStars(2, `Country stamp for ${item.name}! +2 stars ✈️`); }} type="country" /><WorldInfo item={selectedCountry} type="country" speak={speak} /></div><section className="quiz-card"><h2>✈️ Country Challenges</h2><p>What is the capital of <strong>{countryQuestion.name}</strong>?</p><div className="quiz-options">{countryCapitalOptions.map((option) => <button key={option} onClick={() => answerCountry(option, 'capital')}>{option}</button>)}</div><p>What currency does <strong>{countryQuestion.name}</strong> use?</p><div className="quiz-options">{currencyOptions.map((option) => <button key={option} onClick={() => answerCountry(option, 'currency')}>{option}</button>)}</div></section></>}
    {section === 'worldquiz' && <section className="quiz-card"><h2>🎯 World Quiz</h2><p>Which answer matches <strong>{worldQuestion.name}</strong>?</p><div className="quiz-options">{worldOptions.map((option) => <button key={option} onClick={() => answerWorld(option)}>{option}</button>)}</div></section>}
    {section === 'memory' && <><MemoryGame items={states} leftKey="name" rightKey="capital" title="State ↔ Capital Match" onWin={(n) => addStars(n, `Match found! +${n} stars 🧠`)} /><MemoryGame items={countries} leftKey="name" rightKey="capital" title="Country ↔ Capital Match" onWin={(n) => addStars(n, `Country match found! +${n} stars ✈️`)} /></>}
  </main>;
}
