import { useMemo, useState } from 'react';
import { continents, countries, oceans } from '../data';
import { makeOptions } from '../games';
import { indiaPlaces as states } from '../data/india';
import type { IndiaPlace, Question, QuizPlace, ScreenId, WorldPlace } from '../types';

function quizValue(place: QuizPlace): string {
  return place.capital ?? place.landmark ?? place.size ?? place.name;
}

function makeQuestion<T extends QuizPlace>(index: number, list: T[]): Question<T> {
  const answer = list[index % list.length];
  const pool = list.filter((place) => place.name !== answer.name).sort(() => Math.random() - 0.5).slice(0, 3);
  return { answer, options: [...pool.map(quizValue), quizValue(answer)].sort(() => Math.random() - 0.5) };
}

export function useGameState() {
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
  const worldItems: WorldPlace[] = useMemo(() => [...continents, ...oceans, ...countries], []);
  const worldQuestion = worldItems[worldQuizIndex % worldItems.length];
  const worldOptions = useMemo(() => makeOptions(worldItems, worldQuestion, quizValue), [worldItems, worldQuestion]);
  const treasure = states[huntIndex % states.length];
  const level = Math.floor(score / 50) + 1;
  const progress = (score % 50) * 2;

  const addStars = (amount: number, note?: string) => {
    setScore((current) => current + amount);
    setMessage(note ?? `You earned ${amount} stars! ⭐`);
  };

  const chooseState = (state: IndiaPlace) => {
    setSelected(state);
    setVisited((old) => new Set([...old, state.name]));
    if (mode === 'hunt' && state.name === treasure.name) {
      addStars(15, 'Treasure found! +15 stars! 🪙');
      setHuntIndex((current) => current + 7);
      return;
    }
    const note = mode === 'hunt' ? `Almost! Look for ${treasure.capital}.` : `Great! ${state.name}'s capital is ${state.capital}.`;
    addStars(0, note);
  };

  const visitContinent = (item: WorldPlace) => {
    setSelectedContinent(item);
    addStars(2, `Passport stamp for ${item.name}! ✨`);
  };

  const visitOcean = (item: WorldPlace) => {
    setSelectedOcean(item);
    addStars(2, `Ocean stamp for ${item.name}! 🌊`);
  };

  const visitCountry = (item: WorldPlace) => {
    setSelectedCountry(item);
    addStars(2, `Country stamp for ${item.name}! ✈️`);
  };

  const speak = (item: IndiaPlace | WorldPlace) => {
    if (!soundOn || !window.speechSynthesis) return;
    const text = item.capital ? `${item.name}. Capital ${item.capital}. Language ${item.language}.` : `${item.name}. ${item.fact}`;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  };

  const answerQuiz = (option: string) => {
    option === question.answer.capital ? addStars(10, 'Correct! +10 stars ⭐') : setMessage(`Good try! The answer is ${question.answer.capital}.`);
    setSelected(question.answer);
    setVisited((old) => new Set([...old, question.answer.name]));
    setQuizIndex((current) => current + 1);
  };

  const answerWorld = (option: string) => {
    const correct = quizValue(worldQuestion);
    option === correct ? addStars(10, 'World quiz correct! +10 stars 🌎') : setMessage(`Good try! The answer is ${correct}.`);
    setWorldQuizIndex((current) => current + 1);
  };

  const resetGame = () => { setScore(0); setQuizIndex(0); setWorldQuizIndex(0); setVisited(new Set()); setMessage('Adventure reset!'); };

  return { states, continents, oceans, countries, section, setSection, selected, selectedContinent, selectedOcean, selectedCountry, visited, mode, setMode, query, setQuery, score, message, soundOn, setSoundOn, question, worldQuestion, worldOptions, treasure, level, progress, addStars, chooseState, visitContinent, visitOcean, visitCountry, speak, answerQuiz, answerWorld, resetGame };
}
