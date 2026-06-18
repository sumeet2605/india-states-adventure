import { useMemo, useState } from 'react';
import { continents, countries, oceans } from '../data';
import { makeOptions } from '../games';
import { advanceMission, ensureTodayMissions, getExplorerRank, getLevelFromXp, getLevelProgress } from '../growth';
import { indiaPlaces as states } from '../data/india';
import type { DailyMission, IndiaPlace, PlayerProfile, Question, QuizPlace, RewardNotice, ScreenId, WorldPlace } from '../types';
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
  const [mastery, setMastery] = useLocalStorage<Record<string, number>>('geoquest.mastery', { [DEFAULT_STATE]: 1 });
  const [profile, setProfile] = useLocalStorage<PlayerProfile>('geoquest.profile', { xp: 0, coins: 0 });
  const [missions, setMissions] = useLocalStorage<DailyMission[]>('geoquest.dailyMissions', []);
  const [streak, setStreak] = useLocalStorage<number>('geoquest.streak', 0);
  const [mode, setMode] = useLocalStorage('geoquest.mode', 'explore');
  const [query, setQuery] = useState('');
  const [quizIndex, setQuizIndex] = useState(0);
  const [huntIndex, setHuntIndex] = useState(5);
  const [score, setScore] = useLocalStorage<number>('geoquest.score', 0);
  const [message, setMessage] = useState('Tap a colored state or union territory shape to begin!');
  const [reward, setReward] = useState<RewardNotice | null>(null);
  const [worldQuizIndex, setWorldQuizIndex] = useState(0);
  const [soundOn, setSoundOn] = useLocalStorage<boolean>('geoquest.soundOn', true);

  const dailyMissions = useMemo(() => ensureTodayMissions(missions), [missions]);
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
  const level = getLevelFromXp(profile.xp);
  const progress = getLevelProgress(profile.xp);
  const rank = getExplorerRank(level);
  const collectedCards = visitedNames.length;
  const masteredCards = Object.values(mastery).filter((value) => value >= 3).length;

  const grant = (xp: number, coins: number, title: string, detail: string) => {
    setProfile((current) => ({ xp: current.xp + xp, coins: current.coins + coins }));
    setScore((current) => current + xp);
    setReward({ title, detail, xp, coins });
  };
  const addStars = (amount: number, note?: string) => { setScore((current) => current + amount); setMessage(note ?? `You earned ${amount} stars! ⭐`); };
  const advanceDailyMission = (kind: 'visit' | 'quiz' | 'mission') => setMissions((old) => advanceMission(ensureTodayMissions(old), kind));
  const claimMission = (id: string) => {
    const mission = dailyMissions.find((item) => item.id === id);
    if (!mission || !mission.completed || mission.claimed) return;
    setMissions((old) => ensureTodayMissions(old).map((item) => item.id === id ? { ...item, claimed: true } : item));
    grant(mission.rewardXp, mission.rewardCoins, 'Mission Complete!', `${mission.title} reward unlocked.`);
  };
  const markVisited = (name: string) => setVisitedNames((old) => {
    if (old.includes(name)) return old;
    advanceDailyMission('visit');
    grant(5, 5, 'State Card Collected!', `${name} added to your collection.`);
    return [...old, name];
  });
  const increaseMastery = (name: string, amount = 1) => setMastery((old) => ({ ...old, [name]: Math.min(3, (old[name] ?? 0) + amount) }));
  const startRecallPractice = () => { setMode('quiz'); setSection('india'); setMessage(`Recall mission: what is the capital of ${question.answer.name}? Guess before tapping.`); };
  const startMission = () => { setMode('hunt'); setSection('india'); setMessage(`Mission started: find the place with capital ${treasure.capital}.`); };
  const chooseState = (state: IndiaPlace) => {
    setSelectedName(state.name); markVisited(state.name); increaseMastery(state.name, 1);
    if (mode === 'hunt' && state.name === treasure.name) {
      grant(25, 20, 'Treasure Mission Complete!', `${state.name} mission cleared.`);
      advanceDailyMission('mission');
      increaseMastery(state.name, 1);
      setStreak((current) => current + 1);
      setHuntIndex((current) => current + 7);
      setMessage('Treasure found! Mission reward unlocked. 🪙');
      return;
    }
    addStars(0, mode === 'hunt' ? `Almost! Look for ${treasure.capital}.` : `Great! ${state.name}'s capital is ${state.capital}. Now try recalling it without looking.`);
  };
  const visitContinent = (item: WorldPlace) => { setContinentName(item.name); grant(2, 2, 'Passport Stamp!', `${item.name} added to your travel log.`); };
  const visitOcean = (item: WorldPlace) => { setOceanName(item.name); grant(2, 2, 'Ocean Stamp!', `${item.name} added to your travel log.`); };
  const visitCountry = (item: WorldPlace) => { setCountryName(item.name); grant(2, 2, 'Country Stamp!', `${item.name} added to your travel log.`); };
  const speak = (item: IndiaPlace | WorldPlace) => {
    if (!soundOn || !window.speechSynthesis) return;
    const text = item.capital ? `${item.name}. Capital ${item.capital}. Language ${item.language}.` : `${item.name}. ${item.fact}`;
    window.speechSynthesis.cancel(); window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  };
  const answerQuiz = (option: string) => {
    const correct = option === question.answer.capital;
    correct ? grant(10, 10, 'Correct Recall!', `${question.answer.name} mastered a little more.`) : setMessage(`Good try! The answer is ${question.answer.capital}. Say it aloud once.`);
    if (correct) advanceDailyMission('quiz');
    setStreak((current) => correct ? current + 1 : 0);
    if (correct) increaseMastery(question.answer.name, 2);
    setSelectedName(question.answer.name); markVisited(question.answer.name); setQuizIndex((current) => current + 1);
  };
  const answerWorld = (option: string) => {
    const correct = quizValue(worldQuestion);
    option === correct ? grant(10, 10, 'World Quiz Correct!', `${worldQuestion.name} recall improved.`) : setMessage(`Good try! The answer is ${correct}.`);
    setWorldQuizIndex((current) => current + 1);
  };
  const resetGame = () => {
    setScore(0); setProfile({ xp: 0, coins: 0 }); setMissions([]); setQuizIndex(0); setWorldQuizIndex(0); setHuntIndex(5); setSelectedName(DEFAULT_STATE);
    setContinentName(DEFAULT_CONTINENT); setOceanName(DEFAULT_OCEAN); setCountryName(DEFAULT_COUNTRY);
    setVisitedNames([DEFAULT_STATE]); setMastery({ [DEFAULT_STATE]: 1 }); setStreak(0); setMode('explore'); setMessage('Adventure reset!'); setReward(null);
  };

  return { states, continents, oceans, countries, section, setSection, selected, selectedContinent, selectedOcean, selectedCountry, visited, mastery, streak, profile, missions: dailyMissions, rank, collectedCards, masteredCards, mode, setMode, query, setQuery, score, message, reward, setReward, soundOn, setSoundOn, question, worldQuestion, worldOptions, treasure, level, progress, addStars, chooseState, visitContinent, visitOcean, visitCountry, speak, answerQuiz, answerWorld, startRecallPractice, startMission, claimMission, resetGame };
}
