import type { LucideIcon } from 'lucide-react';

export type PlaceKind = 'state' | 'continent' | 'ocean' | 'country';

export type IndiaPlace = {
  name: string;
  capital: string;
  language: string;
  zone: string;
  emoji: string;
  fact: string;
  x?: number;
  y?: number;
};

export type WorldPlace = {
  name: string;
  emoji: string;
  fact: string;
  capital?: string;
  currency?: string;
  language?: string;
  landmark?: string;
  size?: string;
  countries?: string;
  animals?: string;
  touches?: string;
};

export type QuizPlace = {
  name: string;
  capital?: string;
  landmark?: string;
  size?: string;
};

export type ScreenId = 'home' | 'india' | 'quiz' | 'memory' | 'world' | 'space' | 'passport' | 'collection' | 'backpack' | 'settings';

export type ScreenConfig = { id: ScreenId; label: string; desc: string; icon: LucideIcon; };
export type Question<T> = { answer: T; options: string[]; };
export type PlayerProfile = { xp: number; coins: number; };
export type DailyMission = { id: string; title: string; target: number; progress: number; rewardCoins: number; rewardXp: number; completed: boolean; claimed: boolean; };
export type ChestRarity = 'common' | 'rare' | 'epic' | 'legendary';
export type Chest = { id: string; rarity: ChestRarity; opened: boolean; };
export type Sticker = { id: string; name: string; category: string; rarity: ChestRarity; emoji: string; description: string; };
export type Inventory = { chests: Chest[]; stickerIds: string[]; };
export type ChestReward = { chest: Chest; sticker: Sticker; duplicate: boolean; coins: number; };
export type RewardNotice = { title: string; detail: string; coins?: number; xp?: number; };
