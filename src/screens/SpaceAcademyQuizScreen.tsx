import { useState } from 'react';
import { spaceMissions } from '../data/spaceAcademy';
import { isoQuizAll } from '../data/isoQuizAll';
import { getStoryScene } from '../data/spaceStoryScenes';

type Phase = 'story' | 'game';

export function SpaceAcademyQuizScreen() {
  const [missionId, setMissionId] = useState(spaceMissions[0].id);
  const [phase, setPhase] = useState<Phase>('story');
  const [fuel, setFuel] = useState(0);
  const [feedback, setFeedback] = useState('Listen to the story first. Then unlock the game.');
  const mission = spaceMissions.find((item) => item.id === missionId) ?? spaceMissions[0];
  const story = getStoryScene(mission.id);
  const quiz = isoQuizAll.filter((q)=>q.unitId===mission.id);
  const chooseMission = (id:string) => { setMissionId(id); setPhase('story'); setFeedback('New mission selected. Start with the story.'); };
  const check = (ok:boolean, note:string) => { setFeedback(ok ? `Correct. ${note}` : `Good try. ${note}`); if (ok) setFuel((x)=>x+5); };

  return <section className="home-adventure">
    <div className="home-hero-card"><p className="eyebrow">ISO Space Academy</p><h2>Story First. Game Next.</h2><p>A guide tells the mission story first. After the child understands the mystery, the Boss Battle game checks the knowledge.</p><div className="quest-stats"><span>🚀 {fuel} rocket fuel</span><span>📚 {spaceMissions.length} story missions</span><span>🏆 {quiz.length} boss questions</span></div></div>
    <div className="mission-grid pro">{spaceMissions.map((item)=><button key={item.id} className="mission-card" onClick={()=>chooseMission(item.id)}><span style={{fontSize:38}}>{item.emoji}</span><strong>{item.title}</strong><span>{item.chapterRef}</span></button>)}</div>
    <div className="tabs"><button className={phase==='story'?'active':''} onClick={()=>setPhase('story')}>📖 Story Teller</button><button className={phase==='game'?'active':''} onClick={()=>setPhase('game')}>🎮 Knowledge Game</button></div>
    {phase==='story' && <div className="quiz-card" style={{textAlign:'left'}}><p className="eyebrow">Story Teller Mode</p><h2>{mission.emoji} {mission.title}</h2><div className="mission-grid pro"><article className="mission-card"><strong>Guide</strong><span>{story.guide}</span></article><article className="mission-card"><strong>Scene</strong><span>{story.setting}</span></article><article className="mission-card"><strong>Your Role</strong><span>{story.childRole}</span></article></div><div className="quiz-card" style={{textAlign:'left'}}><h2>📖 Story</h2><p>{story.opening}</p><p><strong>Problem:</strong> {story.conflict}</p><p><strong>Clue:</strong> {story.discoveryClue}</p><p><strong>Why first:</strong> {mission.whyQuestion}</p></div><div className="mission-grid pro"><article className="mission-card"><strong>Discover</strong><span>{mission.discover}</span></article><article className="mission-card"><strong>Observe</strong><span>{mission.observe}</span></article><article className="mission-card"><strong>Play</strong><span>{mission.play}</span></article><article className="mission-card"><strong>STEM</strong><span>{mission.stem}</span></article><article className="mission-card"><strong>Parent Goal</strong><span>{mission.parent.objective}</span></article></div><button className="primary-play" onClick={()=>{setPhase('game');setFeedback(story.gameIntro);}}>Start Knowledge Game</button></div>}
    {phase==='game' && <div className="quiz-card arena"><p className="eyebrow">Knowledge Game</p><h2>🎮 {mission.title} Boss Battle</h2><p>{story.gameIntro}</p><p className="message">{feedback}</p>{quiz.map((q)=><div key={q.prompt} className="quiz-card" style={{textAlign:'left'}}><p><strong>{q.prompt}</strong></p><div className="quiz-options">{q.options.map((option,index)=><button key={option} onClick={()=>check(index===q.correctIndex,q.note)}>{option}</button>)}</div></div>)}</div>}
  </section>;
}
