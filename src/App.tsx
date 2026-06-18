import { MapPin, Trophy, ShieldCheck, Globe2, Brain, Home, Settings } from 'lucide-react';
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
import { useGameState } from './hooks/useGameState';
import type { ScreenConfig } from './types';
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

export default function App() {
  const game = useGameState();

  return <main className="game-shell"><Sidebar screens={screens} active={game.section} onNavigate={game.setSection}/><section className="app game-stage"><Header score={game.score} level={game.level} progress={game.progress}/><Passport score={game.score} visitedCount={game.visited.size}/>
    {game.section === 'home' && <HomeScreen screens={screens} score={game.score} level={game.level} visitedCount={game.visited.size} totalPlaces={game.states.length} onNavigate={game.setSection}/>} 
    {game.section === 'india' && <IndiaScreen states={game.states} selected={game.selected} visited={game.visited} mode={game.mode} query={game.query} message={game.message} treasure={game.treasure} question={game.question} onMode={game.setMode} onQuery={game.setQuery} onPick={game.chooseState} onSpeak={game.speak} onAnswer={game.answerQuiz} onReset={game.resetGame}/>} 
    {game.section === 'quiz' && <QuizScreen indiaQuestion={game.question} worldQuestion={game.worldQuestion} worldOptions={game.worldOptions} onIndiaAnswer={game.answerQuiz} onWorldAnswer={game.answerWorld}/>} 
    {game.section === 'memory' && <MemoryScreen states={game.states} countries={game.countries} onWin={game.addStars}/>} 
    {game.section === 'world' && <WorldScreen mode={game.mode} continents={game.continents} oceans={game.oceans} countries={game.countries} selectedContinent={game.selectedContinent} selectedOcean={game.selectedOcean} selectedCountry={game.selectedCountry} onMode={game.setMode} onContinent={(item) => { game.setSelectedContinent(item); game.addStars(2, `Passport stamp for ${item.name}! ✨`); }} onOcean={(item) => { game.setSelectedOcean(item); game.addStars(2, `Ocean stamp for ${item.name}! 🌊`); }} onCountry={(item) => { game.setSelectedCountry(item); game.addStars(2, `Country stamp for ${item.name}! ✈️`); }} speak={game.speak}/>} 
    {game.section === 'passport' && <PassportScreen score={game.score} visitedCount={game.visited.size}/>} 
    {game.section === 'settings' && <SettingsScreen soundOn={game.soundOn} onToggleSound={() => game.setSoundOn((value) => !value)} onReset={game.resetGame}/>} 
  </section></main>;
}
