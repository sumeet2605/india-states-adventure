import { LearningCards } from '../components/LearningCards';
import { WorldInfo } from '../components/WorldInfo';
import type { WorldPlace } from '../types';

type Props = {
  mode: string;
  continents: WorldPlace[];
  oceans: WorldPlace[];
  countries: WorldPlace[];
  selectedContinent: WorldPlace;
  selectedOcean: WorldPlace;
  selectedCountry: WorldPlace;
  onMode: (mode: string) => void;
  onContinent: (item: WorldPlace) => void;
  onOcean: (item: WorldPlace) => void;
  onCountry: (item: WorldPlace) => void;
  speak: (item: WorldPlace) => void;
};

export function WorldScreen(props: Props) {
  const { mode, continents, oceans, countries, selectedContinent, selectedOcean, selectedCountry, onMode, onContinent, onOcean, onCountry, speak } = props;
  return <>
    <div className="tabs"><button onClick={() => onMode('continents')} className={mode === 'continents' || mode === 'explore' ? 'active' : ''}>🌍 Continents</button><button onClick={() => onMode('oceans')} className={mode === 'oceans' ? 'active' : ''}>🌊 Oceans</button><button onClick={() => onMode('countries')} className={mode === 'countries' ? 'active' : ''}>✈️ Countries</button></div>
    {(mode === 'explore' || mode === 'continents') && <div className="layout"><LearningCards title="Continents Explorer" subtitle="Tap a continent to learn landmarks, animals, and fun facts." items={continents} selected={selectedContinent} onPick={onContinent} type="continent"/><WorldInfo item={selectedContinent} type="continent" speak={speak}/></div>}
    {mode === 'oceans' && <div className="layout"><LearningCards title="Oceans Explorer" subtitle="Tap an ocean to learn where it is and what animals live there." items={oceans} selected={selectedOcean} onPick={onOcean} type="ocean"/><WorldInfo item={selectedOcean} type="ocean" speak={speak}/></div>}
    {mode === 'countries' && <div className="layout"><LearningCards title="Countries Explorer" subtitle="Tap a country to learn capital, currency, language, landmark, and fun fact." items={countries} selected={selectedCountry} onPick={onCountry} type="country"/><WorldInfo item={selectedCountry} type="country" speak={speak}/></div>}
  </>;
}
