import { useMemo } from 'react';

export type Badge = {
  stars: number;
  name: string;
  emoji: string;
  description: string;
};

export const badgeRules: Badge[] = [
  { stars: 25, name: 'Little Explorer', emoji: '🧭', description: 'Earn 25 stars' },
  { stars: 75, name: 'Map Detective', emoji: '🔎', description: 'Earn 75 stars' },
  { stars: 150, name: 'Geography Star', emoji: '⭐', description: 'Earn 150 stars' },
  { stars: 250, name: 'World Champion', emoji: '🏆', description: 'Earn 250 stars' },
  { stars: 500, name: 'India Legend', emoji: '🇮🇳', description: 'Earn 500 stars' }
];

export function getEarnedBadges(score: number): Badge[] {
  return badgeRules.filter((badge) => score >= badge.stars);
}

export function getNextBadge(score: number): Badge | undefined {
  return badgeRules.find((badge) => score < badge.stars);
}

export function useRewards(score: number) {
  return useMemo(() => {
    const badges = getEarnedBadges(score);
    const nextBadge = getNextBadge(score);
    const nextBadgeProgress = nextBadge ? Math.min(100, Math.round((score / nextBadge.stars) * 100)) : 100;
    return { badges, nextBadge, nextBadgeProgress, totalBadges: badgeRules.length };
  }, [score]);
}
