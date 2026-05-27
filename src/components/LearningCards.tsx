import type { WorldPlace } from '../types';

type Props = {
  title: string;
  subtitle: string;
  items: WorldPlace[];
  selected: WorldPlace;
  type: 'country' | 'ocean' | 'continent';
  onPick: (item: WorldPlace) => void;
};

export function LearningCards({ title, subtitle, items, selected, type, onPick }: Props) {
  const icon = type === 'country' ? '✈️' : type === 'ocean' ? '🌊' : '🌍';
  return (
    <section className="map-card">
      <div className="map-title">{icon} {title}</div>
      <p className="subtitle mini-subtitle">{subtitle}</p>
      <div className="world-grid">
        {items.map((item) => (
          <button key={item.name} className={`world-card ${selected.name === item.name ? 'selected' : ''}`} onClick={() => onPick(item)}>
            <span className="world-emoji">{item.emoji}</span>
            <strong>{item.name}</strong>
            <small>{item.capital || item.size}</small>
          </button>
        ))}
      </div>
    </section>
  );
}
