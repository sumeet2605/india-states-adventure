import { useMemo, useState } from 'react';
import { continents, countries, oceans } from '../data';
import { makeOptions } from '../games';
import { indiaPlaces as states } from '../data/india';
import type { IndiaPlace, Question, QuizPlace, ScreenId, WorldPlace } from '../types';
import { useLocalStorage } from './useLocalStorage';

const DEFAULT_STATE = 'Maharashtra';
const DEFAULT_CONTINENT = 'Asia';
const DEFAULT_OCEAN = 'Pacific Ocean';
const DEFAULT_COUNTRY = 'India';

function quizValue(place: QuizPlace): string {
  return place.capital ?? place.landmark ?? place.size ?? place.name;
}

function makeQuestion<T extends QuizPlace>(index: number, list: T[]): Question<T> {
  const answer = list[index % list.length];
  const pool = list.filter((place) => place.name !== answer.name).sort(() => Math.random() - 0.5).slice(0, 3);
  return { answer, options: [...pool.map(quizValue), quizValue(answer)].sort(() => Math.random() - 0.5) };
}

function findByName<T extends { name: string }>(items: T[], name: string, fallback: T): T {
  return items.find((item) => item.name === name) ?? fallback;
}

export function useGameState() {
  const [section, setSection] = useState<ScreenId>('home');
  const [selectedName, setSelectedName] = useLocalStorage('geoquest.selectedState', DEFAULT_STATE);
  const [continentName, setContinentName] = useLocalStorage('geoquest.selectedContinent', DEFAULT_CONTINENT);
  const [oceanName, setOceanName] = useLocalStorage('geoquest.selectedOcean', DEFAULT_OCEAN);
  const [countryName, setCountryName] = useLocalStorage('geoquest.selectedCountry', DEFAULT_COUNTRY);
  const [visitedNames, setVisitedNames] = useLocalStorage<string[]>('geoquest.visited', [DEFAULT_STATE]);
  const [mode, setMode] = useLocalStorage('geoquest.mode', 'explore');
  const [query, setQuery] = useState('');
  const [quizIndex, setQuizIndex] = useState(0);
  const [huntIndex, setHuntIndex] = useState(5);
  const [score, setScore] = useLocalStorage<number>('geoquest.score', 0);
  const [message, setMessage] = useState('Tap a colored state or union territory shape to begin!');
  const [worldQuizIndex, setWorldQuizIndex] = useState(0);
  const [soundOn, setSoundOn] = useLocalStorage<boolean>('geoquest.soundOn', true);

  const selected = useMemo(() => findByName(states, selectedName, states[13]), [selectedName]);
  const selectedContinent = useMemo(() => findByName(continents, continentName, continents[0]), [continentName]);
  const selectedOcean = useMemo(() => findByName(oceans, oceanName, oceans[0]), [oceanName]);
  const selectedCountry = useMemo(() => findByName(countries, countryName, countries[0]), [countryName]);
  const visited = useMemo(() => new Set(visitedNames), [visitedNames]);
  const question = useMemo(() => makeQuestion(quizIndex, states), [quizIndex]);
  const worldItems: WorldPlace[] = useMemo(() => [...continents, ...oceans, ...countries], []);
  const worldQuestion = worldItems[worldQuizIndex % worldItems.length];
  const worldOptions = useMemo(() => makeOptions(worldItems, worldQuestion, quizValue), [worldItems, worldQuestion]);
  const treasure = states[huntIndex % states.length];
  const level = Math.floor(score / 50) + 1;
  const progress = (score % 50) * 2;

  const addStars = (amount: number, note?: string) => { setScore((current) => current + amount); setMessage(note ?? `You earned ${amount} stars! ⭐`); };
  const markVisited = (name: string) => setVisitedNames((old) => Array.from(new Set([...old, name])));
  const chooseState = (state: IndiaPlace) => {
    setSelectedName(state.name); markVisited(state.name);
    if (mode === 'hunt' && state.name === treasure.name) { addStars(15, 'Treasure found! +15 stars! 🪙'); setHuntIndex((current) => current + 7); return; }
    addStars(0, mode === 'hunt' ? `Almost! Look for ${treasure.capital}.` : `Great! ${state.name}'s capital is ${state.capital}.`);
  };
  const visitContinent = (item: WorldPlace) => { setContinentName(item.name); addStars(2, `Passport stamp for ${item.name}! ✨`); };
  const visitOcean = (item: WorldPlace) => { setOceanName(item.name); addStars(2, `Ocean stamp for ${item.name}! 🌊`); };
  const visitCountry = (item: WorldPlace) => { setCountryName(item.name); addStars(2, `Country stamp for ${item.name}! ✈️`); };
  const speak = (item: IndiaPlace | WorldPlace) => {
    if (!soundOn || !window.speechSynthesis) return;
    const text = item.capital ? `${item.name}. Capital ${item.capital}. Language ${item.language}.` : `${item.name}. ${item.fact}`;
    window.speechSynthesis.cancel(); window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  };
  const answerQuiz = (option: string) => {
    option === question.answer.capital ? addStars(10, 'Correct! +10 stars ⭐') : setMessage(`Good try! The answer is ${question.answer.capital}.`);
    setSelectedName(question.answer.name); markVisited(question.answer.name); setQuizIndex((current) => current + 1);
  };
  const answerWorld = (option: string) => {
    const correct = quizValue(worldQuestion);
    option === correct ? addStars(10, 'World quiz correct! +10 stars 🌎') : setMessage(`Good try! The answer is ${correct}.`);
    setWorldQuizIndex((current) => current + 1);
  };
  const resetGame = () => {
    setScore(0); setQuizIndex(0); setWorldQuizIndex(0); setHuntIndex(5); setSelectedName(DEFAULT_STATE);
    setContinentName(DEFAULT_CONTINENT); setOceanName(DEFAULT_OCEAN); setCountryName(DEFAULT_COUNTRY);
    setVisitedNames([DEFAULT_STATE]); setMode('explore'); setMessage('Adventure reset!');
  };

  return { states, continents, oceans, countries, section, setSection, selected, selectedContinent, selectedOcean, selectedCountry, visited, mode, setMode, query, setQuery, score, message, soundOn, setSoundOn, question, worldQuestion, worldOptions, treasure, level, progress, addStars, chooseState, visitContinent, visitOcean, visitCountry, speak, answerQuiz, answerWorld, resetGame };
}
