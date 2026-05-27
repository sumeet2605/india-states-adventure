import { earnedBadges } from '../games';

type PassportProps = {
  score: number;
  visitedCount: number;
};

export function Passport({ score, visitedCount }: PassportProps) {
  const badges = earnedBadges(score);

  return (
    <section className="passport-card">
      <h2>🛂 Explorer Passport</h2>
      <p>Visited {visitedCount} places. Stars: {score}</p>
      <div className="badge-row">
        {badges.length ? (
          badges.map((badge) => <span key={badge.name} className="badge">{badge.emoji} {badge.name}</span>)
        ) : (
          <span className="badge locked">🔒 Earn 25 stars for first badge</span>
        )}
      </div>
    </section>
  );
}
