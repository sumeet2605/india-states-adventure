import { X } from 'lucide-react';
import type { ChestReward } from '../../types';

type Props = {
  result: ChestReward | null;
  onClose: () => void;
};

export function PackResult({ result, onClose }: Props) {
  if (!result) return null;

  return (
    <div className="pack-result-wrap">
      <div className={`pack-result-card rarity-${result.chest.rarity}`}>
        <button className="pack-close" type="button" aria-label="Close" onClick={onClose}><X size={18}/></button>
        <div className="pack-emoji">{result.sticker.emoji}</div>
        <p className="achievement-label">Sticker Found</p>
        <h2>{result.sticker.name}</h2>
        <p>{result.sticker.description}</p>
        <strong>{result.sticker.category}</strong>
        {result.duplicate && <small>Duplicate converted to +{result.coins} coins</small>}
      </div>
    </div>
  );
}
