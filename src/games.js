export function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

export function makeOptions(list, answer, pickValue) {
  const correct = pickValue(answer);
  const wrong = shuffle(list.filter((item) => pickValue(item) !== correct)).slice(0, 3).map(pickValue);
  return shuffle([...wrong, correct]);
}

export const badgeRules = [
  { stars: 25, name: 'Little Explorer', emoji: '🧭' },
  { stars: 75, name: 'Map Detective', emoji: '🔎' },
  { stars: 150, name: 'Geography Star', emoji: '⭐' },
  { stars: 250, name: 'World Champion', emoji: '🏆' }
];

export function earnedBadges(score) {
  return badgeRules.filter((badge) => score >= badge.stars);
}
