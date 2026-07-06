import { useEffect, useMemo, useState } from 'react';
import type { SpaceMission } from '../data/spaceAcademy';
import type { StoryScene } from '../data/spaceStoryScenes';

type Props = { mission: SpaceMission; story: StoryScene; onFinish: () => void };

export function SpaceComicPlayer({ mission, story, onFinish }: Props) {
  const [panel, setPanel] = useState(0);
  const [playing, setPlaying] = useState(false);
  const panels = useMemo(() => [
    { title: 'Scene Opens', art: mission.emoji, caption: story.setting, bubble: story.opening },
    { title: 'Your Role', art: '🧑‍🚀', caption: `You are the ${story.childRole}.`, bubble: `Guide ${story.guide} needs your help.` },
    { title: 'Mission Problem', art: '⚠️', caption: story.conflict, bubble: 'Something is confusing Mission Control.' },
    { title: 'Discovery Clue', art: '🔎', caption: story.discoveryClue, bubble: mission.whyQuestion },
    { title: 'Power Up', art: '🎮', caption: story.gameIntro, bubble: 'Ready for the knowledge game?' }
  ], [mission, story]);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setPanel((current) => Math.min(current + 1, panels.length - 1)), 2200);
    return () => window.clearTimeout(timer);
  }, [playing, panel, panels.length]);

  const current = panels[panel];
  return <div className="quiz-card" style={{ textAlign: 'left' }}><p className="eyebrow">Comic Story Video</p><h2>{mission.emoji} {mission.title}</h2><div className="map-card" style={{ background: 'linear-gradient(135deg,#fff,#e0f2fe)', minHeight: 280 }}><div style={{ display:'grid', gridTemplateColumns:'120px 1fr', gap:20, alignItems:'center' }}><div style={{ fontSize:86, textAlign:'center' }}>{current.art}</div><div><p className="eyebrow">Panel {panel + 1}/{panels.length}</p><h2>{current.title}</h2><p style={{ fontSize:20, fontWeight:900 }}>{current.caption}</p><div className="fun"><strong>{story.guide} says:</strong>&nbsp;{current.bubble}</div></div></div></div><div className="hero-actions"><button className="secondary-play" onClick={()=>setPanel((x)=>Math.max(0,x-1))}>◀ Previous</button><button className="primary-play" onClick={()=>setPlaying((x)=>!x)}>{playing ? 'Pause Comic' : 'Auto Play Comic'}</button><button className="secondary-play" onClick={()=>setPanel((x)=>Math.min(panels.length-1,x+1))}>Next ▶</button><button className="primary-play" onClick={onFinish}>Start Game</button></div></div>;
}
