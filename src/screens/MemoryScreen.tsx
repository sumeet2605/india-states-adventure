import { MemoryGame } from '../components/MemoryGame';
import type { IndiaPlace, WorldPlace } from '../types';

type Props = {
  states: IndiaPlace[];
  countries: WorldPlace[];
  onWin: (stars: number, note?: string) => void;
};

export function MemoryScreen({ states, countries, onWin }: Props) {
  return (
    <>
      <MemoryGame items={states} leftKey="name" rightKey="capital" title="State ↔ Capital Match" onWin={(n) => onWin(n, `Match found! +${n} stars 🧠`)} />
      <MemoryGame items={countries} leftKey="name" rightKey="capital" title="Country ↔ Capital Match" onWin={(n) => onWin(n, `Country match found! +${n} stars ✈️`)} />
    </>
  );
}
