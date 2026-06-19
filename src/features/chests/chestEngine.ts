import type { Chest, ChestRarity, ChestReward, Inventory, Sticker } from '../../types';
import { stickers } from '../stickers/stickerData';

const order: ChestRarity[] = ['common', 'rare', 'epic', 'legendary'];
const duplicateCoins: Record<ChestRarity, number> = { common: 5, rare: 15, epic: 35, legendary: 75 };

export function makeChest(rarity: ChestRarity = pickChestRarity()): Chest {
  const id = `${rarity}-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  return { id, rarity, opened: false };
}

export function pickChestRarity(): ChestRarity {
  const roll = Math.random();
  if (roll < 0.02) return 'legendary';
  if (roll < 0.10) return 'epic';
  if (roll < 0.30) return 'rare';
  return 'common';
}

function stickerPool(rarity: ChestRarity) {
  const ceiling = order.indexOf(rarity);
  return stickers.filter((sticker) => order.indexOf(sticker.rarity) <= ceiling);
}

export function revealChestReward(chest: Chest, inventory: Inventory): ChestReward {
  const pool = stickerPool(chest.rarity);
  const missing = pool.filter((sticker) => !inventory.stickerIds.includes(sticker.id));
  const selectedPool = missing.length ? missing : pool;
  const sticker: Sticker = selectedPool[Math.floor(Math.random() * selectedPool.length)];
  const duplicate = inventory.stickerIds.includes(sticker.id);

  return {
    chest: { ...chest, opened: true },
    sticker,
    duplicate,
    coins: duplicate ? duplicateCoins[chest.rarity] : 0
  };
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
