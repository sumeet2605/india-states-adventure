import { Brain, CheckCircle2, Compass, Target, Trophy } from 'lucide-react';
import type { IndiaPlace } from '../../types';

type LearningCoachProps = {
  selected: IndiaPlace;
  visitedCount: number;
  totalPlaces: number;
  score: number;
  mastery: Record<string, number>;
  streak: number;
  onStartQuiz: () => void;
  onStartHunt: () => void;
};

function masteryLabel(level: number) {
  if (level >= 3) return 'Mastered';
  if (level === 2) return 'Strong recall';
  if (level === 1) return 'Discovered';
  return 'New';
}

export function LearningCoach({ selected, visitedCount, totalPlaces, score, mastery, streak, onStartQuiz, onStartHunt }: LearningCoachProps) {
  const selectedMastery = mastery[selected.name] ?? 0;
  const masteredCount = Object.values(mastery).filter((level) => level >= 3).length;
  const coverage = Math.round((visitedCount / totalPlaces) * 100);
  const masteryPercent = Math.round((masteredCount / totalPlaces) * 100);
  const nextAction = selectedMastery === 0
    ? `Explore ${selected.name}, then say its capital aloud.`
    : selectedMastery < 3
      ? `Answer a quiz on ${selected.name} to move from memory to mastery.`
      : `Teach someone one fact about ${selected.name}. Teaching locks memory.`;

  return (
    <section className="coach-card" aria-label="Learning coach">
      <div className="coach-title"><Brain size={22}/> Learning Coach</div>
      <p className="coach-focus">Today&apos;s focus: <strong>{nextAction}</strong></p>
      <div className="coach-metrics">
        <span><Compass size={16}/> Map {coverage}%</span>
        <span><Trophy size={16}/> Mastery {masteryPercent}%</span>
        <span><Target size={16}/> Streak {streak}</span>
      </div>
      <div className="mastery-strip">
        <span>{selected.emoji}</span>
        <div>
          <strong>{selected.name}</strong>
          <small>{masteryLabel(selectedMastery)} · {selected.capital} · {selected.language}</small>
        </div>
        {selectedMastery >= 3 && <CheckCircle2 className="mastered-icon" size={24}/>} 
      </div>
      <div className="coach-actions">
        <button onClick={onStartQuiz}>Practice Recall</button>
        <button onClick={onStartHunt}>Start Mission</button>
      </div>
      <p className="coach-rule">Rule: the child should recall before reading. Guess first, then reveal.</p>
    </section>
  );
}
