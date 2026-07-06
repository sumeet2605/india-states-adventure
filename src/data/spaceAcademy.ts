export type SpaceRank = 'Cadet' | 'Sky Explorer' | 'Junior Astronomer' | 'Planet Scientist' | 'Rocket Engineer' | 'Mission Commander' | 'Young Space Explorer';

export type SpaceMission = {
  id: string;
  chapterRef: string;
  title: string;
  emoji: string;
  rankUnlock: SpaceRank;
  missionBrief: string;
  story: string;
  whyQuestion: string;
  discover: string;
  observe: string;
  play: string;
  stem: string;
  challenge: string;
  bossBattle: string;
  reward: string;
  parent: {
    objective: string;
    duration: string;
    materials: string[];
    prepTime: string;
    vocabulary: string[];
    outcome: string;
    misconception: string;
    followUp: string[];
    homeActivity: string;
  };
};

export const spaceRanks: SpaceRank[] = [
  'Cadet',
  'Sky Explorer',
  'Junior Astronomer',
  'Planet Scientist',
  'Rocket Engineer',
  'Mission Commander',
  'Young Space Explorer'
];

export const spaceMissions: SpaceMission[] = [
  {
    id: 'sky-watch',
    chapterRef: 'Map this mission to the ISO Foundation textbook sky-observation chapter.',
    title: 'Sky Watch Mission',
    emoji: '🌌',
    rankUnlock: 'Cadet',
    missionBrief: 'Mission Control has detected something interesting in tonight\'s sky.',
    story: 'You join India\'s Junior Space Academy and receive your first telescope badge. Your job is to notice what changes in the sky.',
    whyQuestion: 'Why does the sky look different in the morning, evening, and night?',
    discover: 'Look for one idea only: the sky changes with time. We can observe, compare, and record those changes like young scientists.',
    observe: 'Draw the sky once in the evening and once at night. Circle what changed.',
    play: 'Sky Treasure Hunt: find Sun, Moon, star, cloud, and dark sky cards.',
    stem: 'Use a torch and a wall to make light and shadow. Move the torch closer and farther.',
    challenge: 'Mission Control asks: choose which picture shows day and which shows night.',
    bossBattle: '10 quick picture questions about sky objects and observation.',
    reward: 'Rocket Fuel + Sky Watcher Badge',
    parent: {
      objective: 'Build observation habits before formal astronomy vocabulary.',
      duration: '12-15 minutes',
      materials: ['Paper', 'Crayons', 'Torch'],
      prepTime: '2 minutes',
      vocabulary: ['observe', 'sky', 'day', 'night', 'shadow'],
      outcome: 'Child can describe simple visible changes in the sky.',
      misconception: 'Children may think the sky is always the same if they do not compare times.',
      followUp: ['What did you notice first?', 'What changed?', 'What stayed the same?'],
      homeActivity: 'Keep a two-day sky drawing journal.'
    }
  },
  {
    id: 'sun-earth-moon',
    chapterRef: 'Map this mission to the ISO Foundation textbook Sun-Earth-Moon chapter.',
    title: 'Sun, Earth & Moon Mission',
    emoji: '🌞',
    rankUnlock: 'Sky Explorer',
    missionBrief: 'The Academy needs a junior scientist to explain our space family.',
    story: 'A friendly satellite sends three clues: one gives light, one is our home, and one shines at night by reflected light.',
    whyQuestion: 'Why do we need the Sun, and why do we see the Moon?',
    discover: 'One concept at a time: the Sun is a star, Earth is our planet, and the Moon is Earth\'s natural companion.',
    observe: 'Look for the Moon on different evenings and record its shape with drawings.',
    play: 'Orbit Circle Game: child stands as Earth, parent holds torch as Sun, ball becomes Moon.',
    stem: 'Use torch, ball, and a smaller ball to model light falling on objects.',
    challenge: 'Sort picture cards into Sun, Earth, and Moon.',
    bossBattle: '10 adaptive questions with immediate explanation after every answer.',
    reward: 'Moon Badge + Satellite Coins',
    parent: {
      objective: 'Introduce the core relationship between Sun, Earth, and Moon using models.',
      duration: '15-18 minutes',
      materials: ['Torch', 'Ball', 'Small ball or lemon'],
      prepTime: '3 minutes',
      vocabulary: ['Sun', 'Earth', 'Moon', 'star', 'planet'],
      outcome: 'Child can identify Sun, Earth, and Moon and say one role of each.',
      misconception: 'Children may think the Moon makes its own light.',
      followUp: ['Which one is our home?', 'Which one gives light?', 'What did the torch show?'],
      homeActivity: 'Moon shape observation for one week.'
    }
  },
  {
    id: 'planet-parade',
    chapterRef: 'Map this mission to the ISO Foundation textbook solar-system chapter.',
    title: 'Planet Parade Mission',
    emoji: '🪐',
    rankUnlock: 'Junior Astronomer',
    missionBrief: 'The planets are lining up for the Junior Space Academy parade.',
    story: 'Your rocket map has missing planet badges. Restore them by learning how planets belong to the Solar System.',
    whyQuestion: 'Why do planets move around the Sun?',
    discover: 'The Solar System has the Sun and objects that move around it. Learn names through stories, order, and visuals.',
    observe: 'Compare balls or circles of different sizes and arrange them from near to far in a pretend space map.',
    play: 'Planet Race: jump from planet card to planet card while saying one clue.',
    stem: 'Make a paper plate Solar System using circles and crayons.',
    challenge: 'Match each planet picture or clue to its name.',
    bossBattle: '10 ISO-style planet questions with easier hints after wrong attempts.',
    reward: 'Planet Scientist Badge + Stars',
    parent: {
      objective: 'Create early familiarity with Solar System structure without overloading facts.',
      duration: '18-20 minutes',
      materials: ['Paper plates', 'Crayons', 'Cut paper circles'],
      prepTime: '5 minutes',
      vocabulary: ['Solar System', 'planet', 'orbit', 'near', 'far'],
      outcome: 'Child can explain that planets are part of the Solar System.',
      misconception: 'Children may treat planets as random stars unless grouped around the Sun.',
      followUp: ['What is at the center of our model?', 'Which planet is our home?', 'How did you arrange the cards?'],
      homeActivity: 'Make planet flashcards and revise for five minutes.'
    }
  },
  {
    id: 'rocket-lab',
    chapterRef: 'Map this mission to the ISO Foundation textbook rockets/satellites/space-exploration chapter.',
    title: 'Rocket Lab Mission',
    emoji: '🚀',
    rankUnlock: 'Rocket Engineer',
    missionBrief: 'ISRO needs a young rocket engineer to test a safe classroom launch.',
    story: 'Your paper rocket must carry a tiny satellite coin into orbit on the Academy launch board.',
    whyQuestion: 'Why do rockets need force to move upward?',
    discover: 'Rockets move because a push sends them in a direction. Keep it simple: push, direction, launch, mission.',
    observe: 'Blow through a straw and notice which way paper moves.',
    play: 'Rocket Launch Countdown: answer questions to move from 10 to liftoff.',
    stem: 'Make a straw rocket using paper, tape, and straw. Test distance safely.',
    challenge: 'Sequence the launch steps: prepare, countdown, launch, observe, record.',
    bossBattle: '10 mixed questions about rockets, satellites, and safe experiment observations.',
    reward: 'Rocket Engineer Badge + Weekly Trophy',
    parent: {
      objective: 'Connect motion and space exploration through a safe hands-on model.',
      duration: '20 minutes',
      materials: ['Paper', 'Straw', 'Tape', 'Crayons'],
      prepTime: '5 minutes',
      vocabulary: ['rocket', 'launch', 'force', 'satellite', 'mission'],
      outcome: 'Child can connect push/force with simple rocket movement.',
      misconception: 'Children may focus only on decoration and miss the cause-effect experiment.',
      followUp: ['What made it move?', 'How can we make it go farther?', 'What should we record?'],
      homeActivity: 'Run three launches and mark the farthest distance.'
    }
  },
  {
    id: 'olympiad-command',
    chapterRef: 'Map this mission to official ISO sample papers and textbook exercise questions.',
    title: 'Olympiad Command Mission',
    emoji: '🏆',
    rankUnlock: 'Mission Commander',
    missionBrief: 'Final training begins. The Academy will mix all completed missions.',
    story: 'You enter Mission Control. Every correct answer powers the rocket closer to Young Space Explorer rank.',
    whyQuestion: 'Why do we revise mixed questions before an Olympiad?',
    discover: 'Revision helps the brain find answers faster. Wrong answers become clues for the next mission.',
    observe: 'Mark each question as Easy, Medium, or Needs Help.',
    play: 'Boss Battle Board: move one square for every correct answer and collect hints for mistakes.',
    stem: 'Build a revision spinner with paper: sky, Sun-Moon-Earth, planets, rockets.',
    challenge: 'Convert textbook exercises into mission-control questions.',
    bossBattle: '10-question mock test, adaptive retry, and instant explanation.',
    reward: 'Young Space Explorer Certificate',
    parent: {
      objective: 'Prepare for ISO using mixed recall, confidence tracking, and gentle remediation.',
      duration: '20-25 minutes',
      materials: ['Question cards', 'Paper spinner', 'Pencil'],
      prepTime: '5 minutes',
      vocabulary: ['revise', 'explain', 'evidence', 'confidence', 'mistake'],
      outcome: 'Child can attempt mixed questions without feeling like a test.',
      misconception: 'A wrong answer should not be treated as failure; it identifies the next practice topic.',
      followUp: ['Which question felt easy?', 'Which one needs a retry?', 'Can you explain why?'],
      homeActivity: 'Repeat only weak-topic cards the next day.'
    }
  }
];

export function getSpaceRank(completedCount: number): SpaceRank {
  if (completedCount >= spaceMissions.length) return 'Young Space Explorer';
  return spaceRanks[Math.min(completedCount, spaceRanks.length - 1)];
}
