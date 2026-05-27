import { useMemo, useState } from 'react';

type Card = { id: string; pair: string; text: string; open: boolean };

type Props<T extends { name: string }> = {
  items: T[];
  leftKey: keyof T;
  rightKey: keyof T;
  title: string;
  onWin: (stars: number) => void;
};

export function MemoryGame<T extends { name: string }>({ items, leftKey, rightKey, title, onWin }: Props<T>) {
  const pairs = useMemo<Card[]>(() => {
    return items.slice(0, 6).flatMap((item) => [
      { id: `${item.name}-a`, pair: item.name, text: String(item[leftKey] ?? ''), open: false },
      { id: `${item.name}-b`, pair: item.name, text: String(item[rightKey] ?? ''), open: false }
    ]).sort(() => Math.random() - 0.5);
  }, [items, leftKey, rightKey]);

  const [cards, setCards] = useState<Card[]>(pairs);
  const [picked, setPicked] = useState<Card[]>([]);

  function pick(card: Card) {
    if (card.open || picked.length === 2) return;
    const next = cards.map((c) => c.id === card.id ? { ...c, open: true } : c);
    const chosen = [...picked, card];
    setCards(next);
    setPicked(chosen);
    if (chosen.length === 2) {
      window.setTimeout(() => {
        const match = chosen[0].pair === chosen[1].pair;
        setCards((old) => old.map((c) => chosen.some((p) => p.id === c.id) ? { ...c, open: match } : c));
        setPicked([]);
        if (match) onWin(5);
      }, 550);
    }
  }

  return (
    <section className="quiz-card">
      <h2>🧠 {title}</h2>
      <p>Match the pairs to earn stars.</p>
      <div className="memory-grid">
        {cards.map((card) => (
          <button key={card.id} className={`memory-card ${card.open ? 'open' : ''}`} onClick={() => pick(card)}>
            {card.open ? card.text : '❓'}
          </button>
        ))}
      </div>
    </section>
  );
}
