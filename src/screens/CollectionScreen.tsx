import { BookOpenCheck, LockKeyhole, Star } from 'lucide-react';
import type { IndiaPlace } from '../types';

type Props = {
  states: IndiaPlace[];
  visited: Set<string>;
  mastery: Record<string, number>;
  collectedCards: number;
  masteredCards: number;
  onPick: (state: IndiaPlace) => void;
};

export function CollectionScreen({ states, visited, mastery, collectedCards, masteredCards, onPick }: Props) {
  return (
    <section className="map-card collection-screen">
      <div className="map-title"><BookOpenCheck/> State Card Collection</div>
      <div className="collection-summary">
        <span>📚 Collected {collectedCards}/{states.length}</span>
        <span>🏆 Mastered {masteredCards}/{states.length}</span>
      </div>
      <div className="collection-grid">
        {states.map((state) => {
          const unlocked = visited.has(state.name);
          const mastered = (mastery[state.name] ?? 0) >= 3;
          return (
            <button key={state.name} className={`collection-card ${unlocked ? 'unlocked' : 'locked'} ${mastered ? 'mastered' : ''}`} onClick={() => unlocked && onPick(state)} disabled={!unlocked}>
              <span className="collection-emoji">{unlocked ? state.emoji : '❔'}</span>
              <strong>{unlocked ? state.name : 'Locked State'}</strong>
              {unlocked ? <small>{state.capital} · {state.language}</small> : <small>Explore map to unlock</small>}
              <p>{unlocked ? state.fact : 'Collect this card by visiting the state or union territory.'}</p>
              <em>{mastered ? <><Star size={14}/> Mastered</> : unlocked ? 'Discovered' : <><LockKeyhole size={14}/> Locked</>}</em>
            </button>
          );
        })}
      </div>
    </section>
  );
}
