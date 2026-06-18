import { CheckCircle2, Gift, Target } from 'lucide-react';
import type { DailyMission } from '../../types';

type Props = {
  missions: DailyMission[];
  onClaim: (id: string) => void;
};

export function DailyMissions({ missions, onClaim }: Props) {
  return (
    <section className="missions-panel">
      <div className="coach-title"><Target size={22}/> Daily Missions</div>
      <div className="daily-mission-list">
        {missions.map((mission) => {
          const pct = Math.round((mission.progress / mission.target) * 100);
          return (
            <article key={mission.id} className={`daily-mission ${mission.completed ? 'complete' : ''}`}>
              <div>
                <strong>{mission.title}</strong>
                <small>{mission.progress}/{mission.target} · +{mission.rewardCoins} coins · +{mission.rewardXp} XP</small>
                <div className="mission-track"><i style={{ width: `${pct}%` }} /></div>
              </div>
              {mission.claimed ? <CheckCircle2 className="mastered-icon"/> : <button type="button" disabled={!mission.completed} onClick={() => onClaim(mission.id)}><Gift size={16}/> Claim</button>}
            </article>
          );
        })}
      </div>
    </section>
  );
}
