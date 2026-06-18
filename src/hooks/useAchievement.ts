import { useEffect, useState } from 'react';
import { getEarnedBadges, type Badge } from './useRewards';
import { useLocalStorage } from './useLocalStorage';

export function useAchievement(score: number) {
  const [seenBadges, setSeenBadges] = useLocalStorage<string[]>('geoquest.seenBadges', []);
  const [activeBadge, setActiveBadge] = useState<Badge | null>(null);

  useEffect(() => {
    const earned = getEarnedBadges(score);
    const next = earned.find((badge) => !seenBadges.includes(badge.name));
    if (!next) return;
    setActiveBadge(next);
    setSeenBadges((current) => Array.from(new Set([...current, next.name])));
  }, [score, seenBadges, setSeenBadges]);

  useEffect(() => {
    if (!activeBadge) return;
    const timer = window.setTimeout(() => setActiveBadge(null), 4000);
    return () => window.clearTimeout(timer);
  }, [activeBadge]);

  return { activeBadge, dismissAchievement: () => setActiveBadge(null) };
}
