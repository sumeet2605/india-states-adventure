import { Backpack, Gift, LockKeyhole } from 'lucide-react';
import { chestEmoji, chestLabel } from '../features/chests/chests';
import { stickerCategories } from '../features/stickers/stickers';
import type { Chest, Sticker } from '../types';

type Props = {
  chests: Chest[];
  ownedStickers: Sticker[];
  allStickers: Sticker[];
  onOpenChest: (chestId: string) => void;
};

export function BackpackScreen({ chests, ownedStickers, allStickers, onOpenChest }: Props) {
  const ownedIds = new Set(ownedStickers.map((sticker) => sticker.id));
  const unopened = chests.filter((chest) => !chest.opened);
  const categories = stickerCategories();

  return (
    <section className="map-card backpack-screen">
      <div className="map-title"><Backpack/> Backpack</div>
      <div className="collection-summary">
        <span>🎒 Chests {unopened.length}</span>
        <span>🌟 Stickers {ownedStickers.length}/{allStickers.length}</span>
      </div>

      <section className="backpack-section">
        <h2>Treasure Chests</h2>
        {unopened.length ? (
          <div className="chest-grid">
            {unopened.map((chest) => (
              <button key={chest.id} className={`chest-card rarity-${chest.rarity}`} onClick={() => onOpenChest(chest.id)}>
                <span>{chestEmoji(chest.rarity)}</span>
                <strong>{chestLabel(chest.rarity)}</strong>
                <small>Tap to open</small>
              </button>
            ))}
          </div>
        ) : (
          <div className="section-helper">Complete daily missions or treasure hunts to earn chests.</div>
        )}
      </section>

      <section className="backpack-section">
        <h2>Sticker Album</h2>
        {categories.map((category) => {
          const categoryStickers = allStickers.filter((sticker) => sticker.category === category);
          const ownedInCategory = categoryStickers.filter((sticker) => ownedIds.has(sticker.id)).length;
          return (
            <article key={category} className="sticker-category">
              <h3>{category} <span>{ownedInCategory}/{categoryStickers.length}</span></h3>
              <div className="sticker-grid">
                {categoryStickers.map((sticker) => {
                  const owned = ownedIds.has(sticker.id);
                  return (
                    <div key={sticker.id} className={`sticker-card ${owned ? 'owned' : 'locked'} rarity-${sticker.rarity}`}>
                      <span>{owned ? sticker.emoji : <LockKeyhole size={30}/>}</span>
                      <strong>{owned ? sticker.name : 'Locked'}</strong>
                      <small>{owned ? sticker.rarity : 'Find in chests'}</small>
                    </div>
                  );
                })}
              </div>
            </article>
          );
        })}
      </section>
    </section>
  );
}
