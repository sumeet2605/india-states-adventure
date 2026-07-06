export type MissionQuizItem = { unitId:string; prompt:string; options:string[]; correctIndex:number; note:string };

export const isoMissionQuiz: MissionQuizItem[] = [
 { unitId:'u1-astronomy', prompt:'What is astronomy?', options:['Only naming stars','Scientific study of space and objects beyond Earth','Weather only','Storytelling'], correctIndex:1, note:'Astronomy uses observation and evidence.' },
 { unitId:'u1-astronomy', prompt:'What causes day and night?', options:['Earth rotates on its axis','The Sun switches off','Clouds cover half of Earth','The Moon blocks the Sun every evening'], correctIndex:0, note:'Earth rotation creates the day-night cycle.' },
 { unitId:'u2-solar-system', prompt:'How many official planets are in the Solar System?', options:['Seven','Eight','Nine','Twelve'], correctIndex:1, note:'Mercury through Neptune are the eight planets.' },
 { unitId:'u2-solar-system', prompt:'Which planet is third from the Sun?', options:['Venus','Earth','Mars','Jupiter'], correctIndex:1, note:'The order is Mercury, Venus, Earth, Mars.' },
 { unitId:'u3-galaxy', prompt:'What is a light-year?', options:['A long school year','The distance light travels in one year','A star birthday','A Moon phase'], correctIndex:1, note:'A light-year is a distance unit.' },
 { unitId:'u3-galaxy', prompt:'Where is our Solar System located?', options:['Inside the Milky Way','Outside all galaxies','At the exact centre of the universe','Inside the Moon'], correctIndex:0, note:'The Milky Way contains our Solar System.' },
 { unitId:'u4-earth-moon', prompt:'What causes Moon phases?', options:['Changing view of the Moon sunlit half','Clouds','Earth shadow every night','More Moon light'], correctIndex:0, note:'Moon phases show changing views of the lit half.' },
 { unitId:'u4-earth-moon', prompt:'What mainly causes ocean tides on Earth?', options:['The Moon gravity','Only wind','Only clouds','Water colour'], correctIndex:0, note:'The Moon is the main cause of tides.' },
 { unitId:'u5-satellites', prompt:'What is an artificial satellite?', options:['A human-made spacecraft placed in orbit','A natural moon only','A mountain','A star'], correctIndex:0, note:'Artificial satellites are built and launched by people.' },
 { unitId:'u5-satellites', prompt:'What do communication satellites relay?', options:['Signals','Rocks','Rainwater','Shadows'], correctIndex:0, note:'They relay radio signals over large areas.' },
 { unitId:'u6-rockets', prompt:'How does a rocket produce thrust?', options:['By pushing exhaust backward','By flapping wings','By pulling the Moon','By sound'], correctIndex:0, note:'Rocket thrust comes from expelling material backward.' },
 { unitId:'u6-rockets', prompt:'What does orbit need besides height?', options:['High sideways speed','No gravity anywhere','A painted circle','Only clouds'], correctIndex:0, note:'Orbit needs sideways speed while gravity bends the path.' },
 { unitId:'u7-isro', prompt:'What is ISRO?', options:['India space agency','A sea station','A planet','A star pattern'], correctIndex:0, note:'ISRO is India national space agency.' },
 { unitId:'u7-isro', prompt:'Which mission achieved India lunar soft landing in August 2023?', options:['Chandrayaan-3','Mangalyaan','Aditya-L1','Sputnik 1'], correctIndex:0, note:'Chandrayaan-3 landed the Vikram lander.' },
 { unitId:'u8-exploration', prompt:'What is a space station?', options:['A spacecraft where people live and work in orbit','A tower','A fuel tank','A mountain'], correctIndex:0, note:'A space station is an orbiting lab and home.' },
 { unitId:'u8-exploration', prompt:'What is a rover?', options:['A mobile robot on another world','A telescope only','A cloud','A star'], correctIndex:0, note:'Rovers explore selected surface sites.' },
 { unitId:'u9-physics', prompt:'What is gravity?', options:['Attraction between objects with mass','Only air pushing','A colour','A shadow'], correctIndex:0, note:'Gravity attracts masses.' },
 { unitId:'u9-physics', prompt:'What is force?', options:['A push or pull','Only light','Only heat','A galaxy'], correctIndex:0, note:'A force can change motion or shape.' },
 { unitId:'u10-reasoning', prompt:'What is observation?', options:['Information gathered by watching or measuring','A guess','Only a story','Random answer'], correctIndex:0, note:'Observation records what is seen or measured.' },
 { unitId:'u10-reasoning', prompt:'What should pattern recognition find?', options:['A consistent rule','Only colour','A random guess','No reason'], correctIndex:0, note:'A pattern needs a rule that fits.' },
 { unitId:'u11-awareness', prompt:'What should space news distinguish?', options:['Completed, ongoing and planned events','Only rumours','Only pictures','Only old stories'], correctIndex:0, note:'Status words matter.' },
 { unitId:'u11-awareness', prompt:'What is an exoplanet?', options:['A planet orbiting a star beyond the Sun','A Moon of Earth','A rocket','A cloud'], correctIndex:0, note:'Exoplanets orbit stars outside our Solar System.' }
];

export function getMissionQuiz(unitId:string){ return isoMissionQuiz.filter((q)=>q.unitId===unitId); }
