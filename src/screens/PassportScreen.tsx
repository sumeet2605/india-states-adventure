import { ShieldCheck } from 'lucide-react';
import { Passport } from '../components/Passport';

type Props = { score: number; visitedCount: number };

export function PassportScreen({ score, visitedCount }: Props) {
  return (
    <section className="map-card">
      <div className="map-title"><ShieldCheck/> Explorer Progress</div>
      <Passport score={score} visitedCount={visitedCount}/>
      <div className="section-helper">Collect stars by tapping places, answering quizzes, and matching cards. New badges unlock as your score grows.</div>
    </section>
  );
}
