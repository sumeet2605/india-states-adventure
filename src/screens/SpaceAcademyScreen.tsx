import { Brain, CheckCircle2, FlaskConical, Gamepad2, GraduationCap, Rocket, Sparkles, Trophy } from 'lucide-react';
import { getSpaceRank, spaceMissions } from '../data/spaceAcademy';
import { useLocalStorage } from '../hooks/useLocalStorage';

type Props = { onEarnReward: (title: string, detail: string) => void };
type SpaceMode = 'story' | 'mission' | 'quiz' | 'game' | 'revision' | 'challenge' | 'parent' | 'exam';

const modes: { id: SpaceMode; label: string; icon: typeof Rocket }[] = [
  { id: 'story', label: 'Story Mode', icon: Sparkles },
  { id: 'mission', label: 'Mission Mode', icon: Rocket },
  { id: 'quiz', label: 'Quiz Mode', icon: Brain },
  { id: 'game', label: 'Game Mode', icon: Gamepad2 },
  { id: 'revision', label: 'Revision Mode', icon: CheckCircle2 },
  { id: 'challenge', label: 'Challenge Mode', icon: Trophy },
  { id: 'parent', label: 'Parent Mode', icon: GraduationCap },
  { id: 'exam', label: 'Exam Mode', icon: Sparkles }
];

export function SpaceAcademyScreen({ onEarnReward }: Props) {
  const [activeMissionId, setActiveMissionId] = useLocalStorage('spaceAcademy.activeMission', spaceMissions[0].id);
  const [completedMissionIds, setCompletedMissionIds] = useLocalStorage<string[]>('spaceAcademy.completedMissions', []);
  const [rocketFuel, setRocketFuel] = useLocalStorage<number>('spaceAcademy.rocketFuel', 0);
  const [streak, setStreak] = useLocalStorage<number>('spaceAcademy.streak', 0);
  const [mode, setMode] = useLocalStorage<SpaceMode>('spaceAcademy.mode', 'story');
  const [revisionTopics, setRevisionTopics] = useLocalStorage<string[]>('spaceAcademy.revisionTopics', []);

  const activeMission = spaceMissions.find((mission) => mission.id === activeMissionId) ?? spaceMissions[0];
  const completedCount = completedMissionIds.length;
  const rank = getSpaceRank(completedCount);
  const progressPercent = Math.round((completedCount / spaceMissions.length) * 100);
  const isCompleted = completedMissionIds.includes(activeMission.id);

  const completeMission = () => {
    if (!isCompleted) {
      setCompletedMissionIds((current) => [...current, activeMission.id]);
      setRocketFuel((current) => current + 25);
      setStreak((current) => current + 1);
      setRevisionTopics((current) => current.filter((topic) => topic !== activeMission.title));
      onEarnReward('Space Mission Complete!', `${activeMission.reward} unlocked.`);
      return;
    }
    onEarnReward('Revision Complete!', `${activeMission.title} strengthened again.`);
  };

  const markForRevision = () => {
    setRevisionTopics((current) => current.includes(activeMission.title) ? current : [...current, activeMission.title]);
    onEarnReward('Revision Path Updated', `${activeMission.title} will repeat gently.`);
  };

  return (
    <section className="home-adventure">
      <div className="home-hero-card">
        <div className="floating-stars">🚀 🌙 ✨</div>
        <p className="eyebrow">ISO Space Academy · Grade 2</p>
        <h2>Become a Young Space Explorer</h2>
        <p>Story-led missions, games, observation tasks, STEM experiments, boss battles, and parent guidance for ISO Foundation preparation.</p>
        <div className="quest-stats">
          <span>🚀 {rocketFuel} rocket fuel</span>
          <span>🔥 {streak} day streak</span>
          <span>🏅 {rank}</span>
          <span>✅ {completedCount}/{spaceMissions.length} missions</span>
        </div>
        <div className="progress-island" style={{ marginTop: 16 }}>
          <strong>Space Passport Progress</strong>
          <div className="big-progress"><i style={{ width: `${progressPercent}%` }} /></div>
          <span>{progressPercent}% academy progress</span>
        </div>
      </div>

      <div className="tabs">
        {modes.map(({ id, label, icon: Icon }) => <button key={id} className={mode === id ? 'active' : ''} onClick={() => setMode(id)}><Icon size={18}/>{label}</button>)}
      </div>

      <div className="layout wide-map-layout">
        <div className="map-card">
          <div className="map-title"><Rocket/> Mission Map</div>
          <div className="mission-grid pro">
            {spaceMissions.map((mission, index) => {
              const unlocked = index === 0 || completedMissionIds.includes(spaceMissions[index - 1].id) || completedMissionIds.includes(mission.id);
              return (
                <button key={mission.id} className="mission-card" disabled={!unlocked} onClick={() => unlocked && setActiveMissionId(mission.id)} style={{ opacity: unlocked ? 1 : 0.5 }}>
                  <span style={{ fontSize: 38 }}>{mission.emoji}</span>
                  <strong>{mission.title}</strong>
                  <span>{completedMissionIds.includes(mission.id) ? 'Completed · ready for revision' : unlocked ? mission.rankUnlock : 'Locked until previous mission'}</span>
                </button>
              );
            })}
          </div>
        </div>
        <aside className="info-card">
          <div className="big-emoji">{activeMission.emoji}</div>
          <h2>{activeMission.title}</h2>
          <p className="message">{activeMission.missionBrief}</p>
          <button className="speak" onClick={completeMission}><Trophy size={18}/>{isCompleted ? 'Revise Mission' : 'Complete Mission'}</button>
          <button className="speak" style={{ marginLeft: 8 }} onClick={markForRevision}><Brain size={18}/> Needs Practice</button>
        </aside>
      </div>

      <div className="quiz-card" style={{ textAlign: 'left' }}>
        <p className="eyebrow">{mode}</p>
        <h2 style={{ marginTop: 0 }}>{activeMission.story}</h2>
        <div className="mission-grid pro">
          <article className="mission-card"><strong>1. Mission Brief</strong><span>{activeMission.missionBrief}</span></article>
          <article className="mission-card"><strong>2. Why First</strong><span>{activeMission.whyQuestion}</span></article>
          <article className="mission-card"><strong>3. Discover</strong><span>{activeMission.discover}</span></article>
          <article className="mission-card"><strong>4. Observe</strong><span>{activeMission.observe}</span></article>
          <article className="mission-card"><strong>5. Play</strong><span>{activeMission.play}</span></article>
          <article className="mission-card"><strong>6. STEM</strong><span>{activeMission.stem}</span></article>
          <article className="mission-card"><strong>7. Mission Challenge</strong><span>{activeMission.challenge}</span></article>
          <article className="mission-card"><strong>8. Boss Battle</strong><span>{activeMission.bossBattle}</span></article>
          <article className="mission-card"><strong>9. Reward</strong><span>{activeMission.reward}</span></article>
        </div>
      </div>

      <div className="quiz-card" style={{ textAlign: 'left' }}>
        <p className="eyebrow">Parent Dashboard</p>
        <h2 style={{ marginTop: 0 }}>Facilitator guide for this mission</h2>
        <div className="fact-row"><strong>Textbook mapping</strong><span>{activeMission.chapterRef}</span></div>
        <div className="fact-row"><strong>Teaching objective</strong><span>{activeMission.parent.objective}</span></div>
        <div className="fact-row"><strong>Duration</strong><span>{activeMission.parent.duration}</span></div>
        <div className="fact-row"><strong>Preparation</strong><span>{activeMission.parent.prepTime}</span></div>
        <div className="fact-row"><strong>Materials</strong><span>{activeMission.parent.materials.join(', ')}</span></div>
        <div className="fact-row"><strong>Vocabulary</strong><span>{activeMission.parent.vocabulary.join(', ')}</span></div>
        <div className="fact-row"><strong>Learning outcome</strong><span>{activeMission.parent.outcome}</span></div>
        <div className="fact-row"><strong>Misconception to watch</strong><span>{activeMission.parent.misconception}</span></div>
        <div className="fact-row"><strong>Follow-up questions</strong><span>{activeMission.parent.followUp.join(' · ')}</span></div>
        <div className="fact-row"><strong>Home activity</strong><span>{activeMission.parent.homeActivity}</span></div>
      </div>

      <div className="quiz-card" style={{ textAlign: 'left' }}>
        <p className="eyebrow">AI Tutor Memory</p>
        <h2 style={{ marginTop: 0 }}>Persistent progress</h2>
        <p className="coach-focus">Completed missions are stored in this browser. Revision topics repeat gently with immediate explanation.</p>
        <div className="badge-row">
          {completedMissionIds.length ? completedMissionIds.map((id) => <span key={id} className="badge">✅ {spaceMissions.find((mission) => mission.id === id)?.title}</span>) : <span className="badge locked">No completed space missions yet</span>}
          {revisionTopics.map((topic) => <span key={topic} className="badge locked">🔁 Revise: {topic}</span>)}
        </div>
        <p className="fun"><FlaskConical size={20}/> Add textbook-specific questions from the official ISO book and sample papers so the app stays syllabus-aligned.</p>
      </div>
    </section>
  );
}
