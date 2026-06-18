import { useMemo, useState } from 'react';
import { MapPin, Trophy, ShieldCheck, Globe2, Brain, Home, Settings } from 'lucide-react';
import { continents, oceans, countries } from './data';
import { makeOptions } from './games';
import { indiaPlaces as states } from './data/india';
import { Passport } from './components/Passport';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { HomeScreen } from './screens/HomeScreen';
import { IndiaScreen } from './screens/IndiaScreen';
import { QuizScreen } from './screens/QuizScreen';
import { MemoryScreen } from './screens/MemoryScreen';
import { WorldScreen } from './screens/WorldScreen';
import { PassportScreen } from './screens/PassportScreen';
import { SettingsScreen } from './screens/SettingsScreen';
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

function makeQuestion<T extends { name: string }>(index: number, list: T[]) {
  const answer = list[index % list.length];
  const pool = list.filter((s) => s.name !== answer.name).sort(() => Math.random() - 0.5).slice(0, 3);
  const get = (s: any) => s.capital || s.landmark || s.size;
  return { answer, options: [...pool.map(get), get(answer)].sort(() => Math.random() - 0.5) };
}

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
  const [soundOn, setSoundOn] = useState(true);
  const question = useMemo(() => makeQuestion(quizIndex, states), [quizIndex]);
  const worldItems: WorldPlace[] = [...continents, ...oceans, ...countries];
  const worldQuestion = worldItems[worldQuizIndex % worldItems.length];
  const worldOptions = useMemo(() => makeOptions(worldItems, worldQuestion, (i: any) => i.landmark || i.capital || i.size), [worldQuizIndex]);
  const level = Math.floor(score / 50) + 1;

  const addStars = (amount: number, note?: string) => { setScore((s) => s + amount); setMessage(note || `You earned ${amount} stars! ⭐`); };
  const chooseState = (state: IndiaPlace) => { setSelected(state); setVisited((old) => new Set([...old, state.name])); addStars(0, mode === 'hunt' && state.name !== states[huntIndex % states.length].name ? `Almost! Look for ${states[huntIndex % states.length].capital}.` : `Great! ${state.name}'s capital is ${state.capital}.`); if (mode === 'hunt' && state.name === states[huntIndex % states.length].name) { addStars(15, `Treasure found! +15 stars! 🪙`); setHuntIndex((i) => i + 7); } };
  const speak = (item: IndiaPlace | WorldPlace) => { if (!soundOn || !window.speechSynthesis) return; const text = 'capital' in item && item.capital ? `${item.name}. Capital ${item.capital}. Language ${item.language}.` : `${item.name}. ${item.fact}`; window.speechSynthesis.cancel(); window.speechSynthesis.speak(new SpeechSynthesisUtterance(text)); };
  const answerQuiz = (option: string) => { option === question.answer.capital ? addStars(10, 'Correct! +10 stars ⭐') : setMessage(`Good try! The answer is ${question.answer.capital}.`); setSelected(question.answer); setVisited((old) => new Set([...old, question.answer.name])); setQuizIndex((i) => i + 1); };
  const answerWorld = (option: string) => { const correct = worldQuestion.landmark || worldQuestion.capital || worldQuestion.size; option === correct ? addStars(10, 'World quiz correct! +10 stars 🌎') : setMessage(`Good try! The answer is ${correct}.`); setWorldQuizIndex((i) => i + 1); };
  const resetGame = () => { setScore(0); setQuizIndex(0); setWorldQuizIndex(0); setVisited(new Set()); setMessage('Adventure reset!'); };

  return <main className="game-shell"><Sidebar screens={screens} active={section} onNavigate={setSection}/><section className="app game-stage"><Header score={score} level={level} progress={(score % 50) * 2}/><Passport score={score} visitedCount={visited.size}/>
    {section === 'home' && <HomeScreen screens={screens} score={score} level={level} visitedCount={visited.size} totalPlaces={states.length} onNavigate={setSection}/>} 
    {section === 'india' && <IndiaScreen states={states} selected={selected} visited={visited} mode={mode} query={query} message={message} treasure={states[huntIndex % states.length]} question={question} onMode={setMode} onQuery={setQuery} onPick={chooseState} onSpeak={speak} onAnswer={answerQuiz} onReset={resetGame}/>} 
    {section === 'quiz' && <QuizScreen indiaQuestion={question} worldQuestion={worldQuestion} worldOptions={worldOptions} onIndiaAnswer={answerQuiz} onWorldAnswer={answerWorld}/>} 
    {section === 'memory' && <MemoryScreen states={states} countries={countries} onWin={addStars}/>} 
    {section === 'world' && <WorldScreen mode={mode} continents={continents} oceans={oceans} countries={countries} selectedContinent={selectedContinent} selectedOcean={selectedOcean} selectedCountry={selectedCountry} onMode={setMode} onContinent={(i) => { setSelectedContinent(i); addStars(2, `Passport stamp for ${i.name}! ✨`); }} onOcean={(i) => { setSelectedOcean(i); addStars(2, `Ocean stamp for ${i.name}! 🌊`); }} onCountry={(i) => { setSelectedCountry(i); addStars(2, `Country stamp for ${i.name}! ✈️`); }} speak={speak}/>} 
    {section === 'passport' && <PassportScreen score={score} visitedCount={visited.size}/>} 
    {section === 'settings' && <SettingsScreen soundOn={soundOn} onToggleSound={() => setSoundOn((v) => !v)} onReset={resetGame}/>} 
  </section></main>;
}
