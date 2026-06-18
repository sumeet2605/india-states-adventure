import type { Badge } from '../../hooks/useRewards';

type Props = {
  badge: Badge | null;
  onDismiss: () => void;
};

export function AchievementToast({ badge, onDismiss }: Props) {
  if (!badge) return null;

  return (
    <aside className="achievement-toast" role="status" aria-live="polite">
      <button className="achievement-close" onClick={onDismiss} aria-label="Close achievement">×</button>
      <div className="achievement-emoji">{badge.emoji}</div>
      <div>
        <p className="achievement-label">Badge unlocked!</p>
        <h3>{badge.name}</h3>
        <span>{badge.description}</span>
      </div>
    </aside>
  );
}
