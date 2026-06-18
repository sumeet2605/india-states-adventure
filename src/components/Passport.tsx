import { useRewards } from '../hooks/useRewards';

type PassportProps = {
  score: number;
  visitedCount: number;
};

export function Passport({ score, visitedCount }: PassportProps) {
  const { badges, nextBadge, nextBadgeProgress, totalBadges } = useRewards(score);

  return (
    <section className="passport-card">
      <h2>🛂 Explorer Passport</h2>
      <p>Visited {visitedCount} places. Stars: {score}. Badges: {badges.length}/{totalBadges}</p>
      {nextBadge && <p className="section-helper">Next: {nextBadge.emoji} {nextBadge.name} — {nextBadgeProgress}%</p>}
      <div className="badge-row">
        {badges.length ? (
          badges.map((badge) => <span key={badge.name} className="badge" title={badge.description}>{badge.emoji} {badge.name}</span>)
        ) : (
          <span className="badge locked">🔒 Earn 25 stars for first badge</span>
        )}
      </div>
    </section>
  );
}
