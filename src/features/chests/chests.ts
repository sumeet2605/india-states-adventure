import type { Chest, ChestRarity, ChestReward, Sticker } from '../../types';
import { stickers } from '../stickers/stickers';

const rarityOrder: ChestRarity[] = ['common', 'rare', 'epic', 'legendary'];

export function createChest(rarity: ChestRarity = rollChestRarity()): Chest {
  return { id: `${rarity}-${Date.now()}-${Math.random().toString(16).slice(2)}`, rarity, opened: false };
}

export function rollChestRarity(): ChestRarity {
  const roll = Math.random();
  if (roll < 0.02) return 'legendary';
  if (roll < 0.10) return 'epic';
  if (roll < 0.30) return 'rare';
  return 'common';
}

function rarityValue(rarity: ChestRarity) {
  return rarityOrder.indexOf(rarity);
}

function coinBonus(rarity: ChestRarity) {
  if (rarity === 'legendary') return 100;
  if (rarity === 'epic') return 60;
  if (rarity === 'rare') return 35;
  return 15;
}

function eligibleStickers(rarity: ChestRarity) {
  return stickers.filter((sticker) => rarityValue(sticker.rarity) <= rarityValue(rarity));
}

export function openChest(chest: Chest, ownedStickerIds: string[]): ChestReward {
  const pool = eligibleStickers(chest.rarity);
  const newPool = pool.filter((sticker) => !ownedStickerIds.includes(sticker.id));
  const sourcePool = newPool.length ? newPool : pool;
  const sticker: Sticker = sourcePool[Math.floor(Math.random() * sourcePool.length)];
  const duplicate = ownedStickerIds.includes(sticker.id);
  return { chest: { ...chest, opened: true }, sticker, duplicate, coins: duplicate ? coinBonus(chest.rarity) : 0 };
}

export function chestLabel(rarity: ChestRarity) {
  if (rarity === 'legendary') return 'Legendary Chest';
  if (rarity === 'epic') return 'Epic Chest';
  if (rarity === 'rare') return 'Rare Chest';
  return 'Common Chest';
}

export function chestEmoji(rarity: ChestRarity) {
  if (rarity === 'legendary') return '👑';
  if (rarity === 'epic') return '💎';
  if (rarity === 'rare') return '🎁';
  return '📦';
}
