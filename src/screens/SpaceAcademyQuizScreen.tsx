import { useState } from 'react';
import { spaceMissions } from '../data/spaceAcademy';
import { getMissionQuiz } from '../data/isoMissionQuiz';

export function SpaceAcademyQuizScreen() {
  const [missionId, setMissionId] = useState(spaceMissions[0].id);
  const [fuel, setFuel] = useState(0);
  const [feedback, setFeedback] = useState('Pick a mission and answer a Boss Battle question.');
  const mission = spaceMissions.find((item) => item.id === missionId) ?? spaceMissions[0];
  const quiz = getMissionQuiz(mission.id);
  const check = (ok:boolean, note:string) => { setFeedback(ok ? `Correct. ${note}` : `Good try. ${note}`); if (ok) setFuel((x)=>x+5); };
  return <section className="home-adventure"><div className="home-hero-card"><p className="eyebrow">ISO Space Academy</p><h2>Mission Control Boss Battles</h2><p>Choose one textbook unit mission, play the learning cards, then answer a real quiz seed from that unit.</p><div className="quest-stats"><span>🚀 {fuel} rocket fuel</span><span>📚 {spaceMissions.length} missions</span></div></div><div className="mission-grid pro">{spaceMissions.map((item)=><button key={item.id} className="mission-card" onClick={()=>setMissionId(item.id)}><span style={{fontSize:38}}>{item.emoji}</span><strong>{item.title}</strong><span>{item.chapterRef}</span></button>)}</div><div className="quiz-card" style={{textAlign:'left'}}><p className="eyebrow">Selected Mission</p><h2>{mission.emoji} {mission.title}</h2><p>{mission.story}</p><div className="mission-grid pro"><article className="mission-card"><strong>Why First</strong><span>{mission.whyQuestion}</span></article><article className="mission-card"><strong>Discover</strong><span>{mission.discover}</span></article><article className="mission-card"><strong>Observe</strong><span>{mission.observe}</span></article><article className="mission-card"><strong>Play</strong><span>{mission.play}</span></article><article className="mission-card"><strong>STEM</strong><span>{mission.stem}</span></article><article className="mission-card"><strong>Parent Goal</strong><span>{mission.parent.objective}</span></article></div></div><div className="quiz-card arena"><h2>🏆 Boss Battle</h2><p className="message">{feedback}</p>{quiz.map((q)=><div key={q.prompt} className="quiz-card" style={{textAlign:'left'}}><p><strong>{q.prompt}</strong></p><div className="quiz-options">{q.options.map((option,index)=><button key={option} onClick={()=>check(index===q.correctIndex,q.note)}>{option}</button>)}</div></div>)}</div></section>;
}
