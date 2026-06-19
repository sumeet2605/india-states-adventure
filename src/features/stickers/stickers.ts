import type { Sticker } from '../../types';

export const stickers: Sticker[] = [
  { id: 'taj-mahal', name: 'Taj Mahal', category: 'India Monuments', rarity: 'legendary', emoji: '🕌', description: 'A world-famous marble monument in Agra.' },
  { id: 'mysore-palace', name: 'Mysore Palace', category: 'India Monuments', rarity: 'epic', emoji: '🏰', description: 'A royal palace known for its grand lights and design.' },
  { id: 'charminar', name: 'Charminar', category: 'India Monuments', rarity: 'rare', emoji: '🕍', description: 'A famous monument and landmark of Hyderabad.' },
  { id: 'gateway-india', name: 'Gateway of India', category: 'India Monuments', rarity: 'rare', emoji: '⛩️', description: 'A sea-facing monument in Mumbai.' },
  { id: 'bengal-tiger', name: 'Bengal Tiger', category: 'India Wildlife', rarity: 'epic', emoji: '🐅', description: 'India’s powerful national animal.' },
  { id: 'peacock', name: 'Peacock', category: 'India Wildlife', rarity: 'rare', emoji: '🦚', description: 'India’s colourful national bird.' },
  { id: 'elephant', name: 'Indian Elephant', category: 'India Wildlife', rarity: 'rare', emoji: '🐘', description: 'A gentle giant found in Indian forests.' },
  { id: 'snow-leopard', name: 'Snow Leopard', category: 'India Wildlife', rarity: 'legendary', emoji: '🐆', description: 'A rare mountain cat from the Himalayas.' },
  { id: 'dosa', name: 'Dosa', category: 'India Foods', rarity: 'common', emoji: '🥞', description: 'A crispy South Indian favourite.' },
  { id: 'mango', name: 'Mango', category: 'India Foods', rarity: 'common', emoji: '🥭', description: 'India’s beloved summer fruit.' },
  { id: 'biryani', name: 'Biryani', category: 'India Foods', rarity: 'rare', emoji: '🍚', description: 'A fragrant rice dish loved across India.' },
  { id: 'laddoo', name: 'Laddoo', category: 'India Foods', rarity: 'common', emoji: '🟠', description: 'A sweet treat often eaten during festivals.' },
  { id: 'diwali-lamp', name: 'Diwali Lamp', category: 'India Festivals', rarity: 'rare', emoji: '🪔', description: 'A glowing symbol of the festival of lights.' },
  { id: 'holi-colors', name: 'Holi Colours', category: 'India Festivals', rarity: 'rare', emoji: '🎨', description: 'Bright colours used during Holi celebrations.' },
  { id: 'kite', name: 'Festival Kite', category: 'India Festivals', rarity: 'common', emoji: '🪁', description: 'Kites fill the sky during many Indian festivals.' },
  { id: 'train', name: 'Indian Railways', category: 'India Wonders', rarity: 'common', emoji: '🚂', description: 'One of the world’s largest railway networks.' },
  { id: 'himalayas', name: 'Himalayas', category: 'India Wonders', rarity: 'epic', emoji: '🏔️', description: 'The mighty mountain range in North India.' },
  { id: 'kerala-backwaters', name: 'Kerala Backwaters', category: 'India Wonders', rarity: 'epic', emoji: '🚣', description: 'Beautiful waterways and houseboats in Kerala.' }
];

export function getStickerById(id: string) {
  return stickers.find((sticker) => sticker.id === id);
}

export function stickerCategories() {
  return Array.from(new Set(stickers.map((sticker) => sticker.category)));
}
