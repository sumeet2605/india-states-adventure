export type IsoChapter = {
  number: number;
  title: string;
};

export type IsoUnit = {
  unit: number;
  title: string;
  startPage: number;
  chapters: IsoChapter[];
};

export const isoFoundationSyllabus: IsoUnit[] = [
  {
    unit: 1,
    title: 'Fundamentals of Astronomy',
    startPage: 9,
    chapters: [
      { number: 1, title: 'What is Astronomy?' },
      { number: 2, title: 'The Sky Around Us' },
      { number: 3, title: 'Day and Night' },
      { number: 4, title: 'Sunrise and Sunset' },
      { number: 5, title: 'Directions' },
      { number: 6, title: 'Seasons' },
      { number: 7, title: 'Observing the Sky' },
      { number: 8, title: 'Stars Visible at Night' },
      { number: 9, title: 'Introduction to Constellations' },
      { number: 10, title: 'Astronomy in Everyday Life' },
      { number: 11, title: 'Simple Astronomical Observations' }
    ]
  },
  {
    unit: 2,
    title: 'The Solar System',
    startPage: 34,
    chapters: [
      { number: 1, title: 'Our Sun' },
      { number: 2, title: 'The Eight Planets' },
      { number: 3, title: 'Dwarf Planets' },
      { number: 4, title: 'Order of the Planets' },
      { number: 5, title: 'Natural Satellites' },
      { number: 6, title: 'Asteroids' },
      { number: 7, title: 'Comets' },
      { number: 8, title: 'Meteors and Meteorites' },
      { number: 9, title: 'Characteristics of the Planets' }
    ]
  },
  {
    unit: 3,
    title: 'Stars, Galaxies & the Universe',
    startPage: 55,
    chapters: [
      { number: 1, title: 'What are Stars?' },
      { number: 2, title: 'Brightness of Stars' },
      { number: 3, title: 'The Nearest Stars' },
      { number: 4, title: 'The Milky Way Galaxy' },
      { number: 5, title: 'Other Galaxies' },
      { number: 6, title: 'Understanding the Universe' }
    ]
  },
  {
    unit: 4,
    title: 'Earth & Moon',
    startPage: 70,
    chapters: [
      { number: 1, title: 'Earth: Our Home Planet' },
      { number: 2, title: 'Continents and Oceans' },
      { number: 3, title: 'Earth’s Rotation' },
      { number: 4, title: 'Earth’s Revolution' },
      { number: 5, title: 'Day and Night Revisited' },
      { number: 6, title: 'Seasons Revisited' },
      { number: 7, title: 'Phases of the Moon' },
      { number: 8, title: 'Solar and Lunar Eclipses' },
      { number: 9, title: 'Tides' }
    ]
  },
  {
    unit: 5,
    title: 'Satellites & Space Technology',
    startPage: 91,
    chapters: [
      { number: 1, title: 'Natural and Artificial Satellites' },
      { number: 2, title: 'Communication Satellites' },
      { number: 3, title: 'Weather Satellites' },
      { number: 4, title: 'GPS and Navigation' },
      { number: 5, title: 'Satellites in Everyday Life' }
    ]
  },
  {
    unit: 6,
    title: 'Rockets & Launch Vehicles',
    startPage: 104,
    chapters: [
      { number: 1, title: 'What is a Rocket?' },
      { number: 2, title: 'How Rockets Reach Space' },
      { number: 3, title: 'Launch Pads' },
      { number: 4, title: 'Astronauts' },
      { number: 5, title: 'Reusable Rockets' }
    ]
  },
  {
    unit: 7,
    title: 'ISRO & India’s Space Missions',
    startPage: 117,
    chapters: [
      { number: 1, title: 'Introduction to ISRO' },
      { number: 2, title: 'Chandrayaan Missions' },
      { number: 3, title: 'Mangalyaan' },
      { number: 4, title: 'Aditya-L1' },
      { number: 5, title: 'Gaganyaan' },
      { number: 6, title: 'Great Indian Space Scientists' },
      { number: 7, title: "India's Achievements in Space" }
    ]
  },
  {
    unit: 8,
    title: 'Space Exploration',
    startPage: 135,
    chapters: [
      { number: 1, title: 'Who are Astronauts?' },
      { number: 2, title: 'Space Stations' },
      { number: 3, title: 'Moon Exploration Missions' },
      { number: 4, title: 'Mars Exploration Missions' },
      { number: 5, title: 'Famous Space Missions' }
    ]
  },
  {
    unit: 9,
    title: 'Basic Physics for Space Science',
    startPage: 148,
    chapters: [
      { number: 1, title: 'Gravity' },
      { number: 2, title: 'Force' },
      { number: 3, title: 'Motion' },
      { number: 4, title: 'Light' },
      { number: 5, title: 'Shadows' },
      { number: 6, title: 'Heat' },
      { number: 7, title: 'Simple Machines' },
      { number: 8, title: 'Air and Atmosphere' }
    ]
  },
  {
    unit: 10,
    title: 'Scientific Reasoning & Logical Aptitude',
    startPage: 167,
    chapters: [
      { number: 1, title: 'Observation Skills' },
      { number: 2, title: 'Picture Reasoning' },
      { number: 3, title: 'Pattern Recognition' },
      { number: 4, title: 'Classification' },
      { number: 5, title: 'Sequencing' },
      { number: 6, title: 'Simple Mathematical Reasoning' },
      { number: 7, title: 'Logical Thinking' }
    ]
  },
  {
    unit: 11,
    title: 'General Space Awareness',
    startPage: 184,
    chapters: [
      { number: 1, title: 'Current Space Events' },
      { number: 2, title: 'Famous Astronauts' },
      { number: 3, title: 'Planets in the News' },
      { number: 4, title: 'Important Space Discoveries' },
      { number: 5, title: 'Amazing Space Facts' }
    ]
  }
];

export const isoFoundationSourceNote = 'Derived from ISO 2026 Foundation Level Classes I-IV official reading material supplied by the parent. Use the textbook as the single source of truth for full lesson content, exercises, model papers and answer keys.';
