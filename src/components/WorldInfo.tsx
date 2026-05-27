import { Sparkles, Volume2 } from 'lucide-react';
import type { WorldPlace } from '../types';

type Props = {
  item: WorldPlace;
  type: 'country' | 'ocean' | 'continent';
  speak: (item: WorldPlace) => void;
};

export function WorldInfo({ item, type, speak }: Props) {
  return (
    <aside className="info-card">
      <div className="big-emoji">{item.emoji}</div>
      <h2>{item.name}</h2>
      {type === 'country' ? (
        <>
          <div className="fact-row"><strong>🏛 Capital</strong><span>{item.capital}</span></div>
          <div className="fact-row"><strong>💰 Currency</strong><span>{item.currency}</span></div>
          <div className="fact-row"><strong>🗣 Language</strong><span>{item.language}</span></div>
          <div className="fact-row"><strong>📍 Landmark</strong><span>{item.landmark}</span></div>
        </>
      ) : (
        <>
          <div className="fact-row"><strong>📏 Size</strong><span>{item.size}</span></div>
          <div className="fact-row"><strong>🐾 Animals</strong><span>{item.animals}</span></div>
        </>
      )}
      <p className="fun"><Sparkles size={18}/> {item.fact}</p>
      <button className="speak" onClick={() => speak(item)}><Volume2 size={18}/> Read aloud</button>
    </aside>
  );
}
