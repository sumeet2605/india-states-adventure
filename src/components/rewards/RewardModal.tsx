import { Coins, Sparkles, X } from 'lucide-react';
import type { RewardNotice } from '../../types';

type Props = {
  reward: RewardNotice | null;
  onDismiss: () => void;
};

export function RewardModal({ reward, onDismiss }: Props) {
  if (!reward) return null;

  return (
    <div className="reward-modal" role="dialog" aria-label="Reward earned">
      <div className="reward-panel">
        <button className="reward-close" type="button" aria-label="Close reward" onClick={onDismiss}><X size={18}/></button>
        <div className="reward-burst">🎉</div>
        <p className="achievement-label">Reward Unlocked</p>
        <h2>{reward.title}</h2>
        <p>{reward.detail}</p>
        <div className="reward-row">
          {!!reward.coins && <span><Coins size={18}/> +{reward.coins} coins</span>}
          {!!reward.xp && <span><Sparkles size={18}/> +{reward.xp} XP</span>}
        </div>
      </div>
    </div>
  );
}
