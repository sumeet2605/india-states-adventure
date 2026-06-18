import { ShieldCheck } from 'lucide-react';
import { Passport } from '../components/Passport';

const ladder = [
  { title: 'Explorer', detail: 'Tap places and discover facts', icon: '🧭' },
  { title: 'Recall Rookie', detail: 'Answer capitals without looking', icon: '🧠' },
  { title: 'Map Master', detail: 'Master every state and union territory', icon: '🏆' }
];

type Props = { score: number; visitedCount: number };

export function PassportScreen({ score, visitedCount }: Props) {
  return (
    <section className="map-card">
      <div className="map-title"><ShieldCheck/> Explorer Progress</div>
      <Passport score={score} visitedCount={visitedCount}/>
      <div className="mastery-ladder">
        {ladder.map((step, index) => (
          <article key={step.title} className={score >= index * 50 ? 'ladder-step unlocked' : 'ladder-step'}>
            <span>{step.icon}</span>
            <strong>{step.title}</strong>
            <small>{step.detail}</small>
          </article>
        ))}
      </div>
      <div className="section-helper">Collect stars by tapping places, answering quizzes, and matching cards. The real goal is recall: capitals should come from memory, not from reading.</div>
    </section>
  );
}
