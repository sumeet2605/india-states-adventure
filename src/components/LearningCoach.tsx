import { BookOpenCheck, Brain, Compass, Target } from 'lucide-react';
import type { IndiaPlace } from '../types';

type Props = {
  selected: IndiaPlace;
  visited: Set<string>;
  states: IndiaPlace[];
  score: number;
};

function getZoneProgress(states: IndiaPlace[], visited: Set<string>) {
  const zones = Array.from(new Set(states.map((state) => state.zone)));

  return zones.map((zone) => {
    const total = states.filter((state) => state.zone === zone).length;
    const done = states.filter((state) => state.zone === zone && visited.has(state.name)).length;

    return { zone, total, done, complete: done === total };
  });
}

function nextUnvisited(states: IndiaPlace[], visited: Set<string>) {
  return states.find((state) => !visited.has(state.name));
}

export function LearningCoach({ selected, visited, states, score }: Props) {
  const zoneProgress = getZoneProgress(states, visited);
  const next = nextUnvisited(states, visited);
  const strongestZone = zoneProgress.slice().sort((a, b) => b.done / b.total - a.done / a.total)[0];
  const completion = Math.round((visited.size / states.length) * 100);

  return (
    <section className="learning-coach" aria-label="Learning coach">
      <div className="coach-header">
        <Brain size={22} />
        <strong>Learning Coach</strong>
        <span>{completion}% India mastery</span>
      </div>

      <div className="coach-goal">
        <Target size={18} />
        <span>
          Remember: <b>{selected.name}</b> → capital <b>{selected.capital}</b> → language <b>{selected.language}</b>.
        </span>
      </div>

      <div className="coach-missions">
        <div>
          <Compass size={18} />
          <b>Next map mission</b>
          <span>{next ? `Find ${next.name} and say its capital aloud.` : 'All places visited. Move to Quiz Arena.'}</span>
        </div>
        <div>
          <BookOpenCheck size={18} />
          <b>Memory mission</b>
          <span>Close your eyes and recall 3 capitals before tapping another state.</span>
        </div>
        <div>
          <Brain size={18} />
          <b>Zone mission</b>
          <span>{strongestZone ? `${strongestZone.zone}: ${strongestZone.done}/${strongestZone.total} completed.` : `${score} stars collected.`}</span>
        </div>
      </div>
    </section>
  );
}
