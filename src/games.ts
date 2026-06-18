export type BadgeRule = {
  stars: number;
  name: string;
  emoji: string;
};

export function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

export function makeOptions<T>(list: T[], answer: T, pickValue: (item: T) => string): string[] {
  const correct = pickValue(answer);
  const wrong = shuffle(list.filter((item) => pickValue(item) !== correct)).slice(0, 3).map(pickValue);
  return shuffle([...wrong, correct]);
}

export const badgeRules: BadgeRule[] = [
  { stars: 25, name: 'Little Explorer', emoji: '🧭' },
  { stars: 75, name: 'Map Detective', emoji: '🔎' },
  { stars: 150, name: 'Geography Star', emoji: '⭐' },
  { stars: 250, name: 'World Champion', emoji: '🏆' }
];

export function earnedBadges(score: number): BadgeRule[] {
  return badgeRules.filter((badge) => score >= badge.stars);
}
