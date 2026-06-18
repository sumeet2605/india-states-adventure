import type { DailyMission } from './types';

export const XP_PER_LEVEL = 100;

export function getExplorerRank(level: number) {
  if (level >= 6) return 'Master Explorer';
  if (level >= 5) return 'Cartographer';
  if (level >= 4) return 'Adventurer';
  if (level >= 3) return 'Traveler';
  if (level >= 2) return 'Scout';
  return 'Explorer';
}

export function getLevelFromXp(xp: number) {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

export function getLevelProgress(xp: number) {
  return xp % XP_PER_LEVEL;
}

export function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function createDailyMissions(date = todayKey()): DailyMission[] {
  return [
    { id: `${date}-visit`, title: 'Visit 3 states or UTs', target: 3, progress: 0, rewardCoins: 30, rewardXp: 25, completed: false, claimed: false },
    { id: `${date}-quiz`, title: 'Answer 5 capital questions', target: 5, progress: 0, rewardCoins: 50, rewardXp: 35, completed: false, claimed: false },
    { id: `${date}-mission`, title: 'Complete 1 treasure mission', target: 1, progress: 0, rewardCoins: 40, rewardXp: 30, completed: false, claimed: false }
  ];
}

export function ensureTodayMissions(saved: DailyMission[]) {
  const key = todayKey();
  if (!saved.length || !saved.every((mission) => mission.id.startsWith(key))) {
    return createDailyMissions(key);
  }
  return saved;
}

export function advanceMission(missions: DailyMission[], kind: 'visit' | 'quiz' | 'mission') {
  return missions.map((mission) => {
    if (!mission.id.includes(`-${kind}`) || mission.claimed) return mission;
    const progress = Math.min(mission.target, mission.progress + 1);
    return { ...mission, progress, completed: progress >= mission.target };
  });
}
