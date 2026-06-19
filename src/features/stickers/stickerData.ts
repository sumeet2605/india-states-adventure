import type { Sticker } from '../../types';

export const stickers: Sticker[] = [
  { id: 'taj-mahal', name: 'Taj Mahal', category: 'India Monuments', rarity: 'legendary', emoji: '🕌', description: 'A world-famous marble monument in Agra.' },
  { id: 'mysore-palace', name: 'Mysore Palace', category: 'India Monuments', rarity: 'epic', emoji: '🏰', description: 'A royal palace known for its grand lights and design.' },
  { id: 'gateway-india', name: 'Gateway of India', category: 'India Monuments', rarity: 'rare', emoji: '🚪', description: 'A famous sea-facing monument in Mumbai.' },
  { id: 'qutub-minar', name: 'Qutub Minar', category: 'India Monuments', rarity: 'rare', emoji: '🗼', description: 'A tall historic tower in Delhi.' },
  { id: 'bengal-tiger', name: 'Bengal Tiger', category: 'India Wildlife', rarity: 'epic', emoji: '🐅', description: 'India’s powerful national animal.' },
  { id: 'peacock', name: 'Peacock', category: 'India Wildlife', rarity: 'rare', emoji: '🦚', description: 'India’s colorful national bird.' },
  { id: 'elephant', name: 'Indian Elephant', category: 'India Wildlife', rarity: 'rare', emoji: '🐘', description: 'A gentle giant found in Indian forests.' },
  { id: 'snow-leopard', name: 'Snow Leopard', category: 'India Wildlife', rarity: 'legendary', emoji: '🐆', description: 'A rare mountain cat from the Himalayas.' },
  { id: 'dosa', name: 'Dosa', category: 'India Foods', rarity: 'common', emoji: '🥞', description: 'A crispy South Indian favorite.' },
  { id: 'mango', name: 'Mango', category: 'India Foods', rarity: 'common', emoji: '🥭', description: 'India’s beloved summer fruit.' },
  { id: 'litti-chokha', name: 'Litti Chokha', category: 'India Foods', rarity: 'rare', emoji: '🍘', description: 'A traditional dish from Bihar.' },
  { id: 'biryani', name: 'Biryani', category: 'India Foods', rarity: 'rare', emoji: '🍛', description: 'A fragrant rice dish loved across India.' },
  { id: 'diwali', name: 'Diwali Lamp', category: 'India Festivals', rarity: 'common', emoji: '🪔', description: 'A lamp for the festival of lights.' },
  { id: 'holi', name: 'Holi Colors', category: 'India Festivals', rarity: 'common', emoji: '🎨', description: 'Bright colors from the spring festival Holi.' },
  { id: 'onam', name: 'Onam Boat', category: 'India Festivals', rarity: 'rare', emoji: '🚣', description: 'A boat race symbol from Kerala’s Onam celebrations.' },
  { id: 'durga-puja', name: 'Durga Puja', category: 'India Festivals', rarity: 'epic', emoji: '🙏', description: 'A grand festival celebrated especially in eastern India.' },
  { id: 'darjeeling-train', name: 'Darjeeling Train', category: 'India Wonders', rarity: 'epic', emoji: '🚂', description: 'A mountain railway loved by explorers.' },
  { id: 'himalayas', name: 'Himalayas', category: 'India Wonders', rarity: 'legendary', emoji: '🏔️', description: 'The mighty mountain range in northern India.' },
  { id: 'backwaters', name: 'Kerala Backwaters', category: 'India Wonders', rarity: 'rare', emoji: '🛶', description: 'Peaceful waterways in Kerala.' },
  { id: 'thar-desert', name: 'Thar Desert', category: 'India Wonders', rarity: 'rare', emoji: '🏜️', description: 'A vast desert in western India.' }
];

export function getStickerById(id: string) {
  return stickers.find((sticker) => sticker.id === id);
}

export function stickersByCategory() {
  return Array.from(new Set(stickers.map((sticker) => sticker.category))).map((category) => ({
    category,
    stickers: stickers.filter((sticker) => sticker.category === category)
  }));
}
