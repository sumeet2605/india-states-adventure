export type MissionQuizItem = { unitId:string; prompt:string; options:string[]; correctIndex:number; note:string };

export const isoMissionQuiz: MissionQuizItem[] = [
 { unitId:'u1-astronomy', prompt:'What is astronomy?', options:['Only naming stars','Scientific study of space and objects beyond Earth','Weather only','Storytelling'], correctIndex:1, note:'Astronomy uses observation and evidence.' },
 { unitId:'u2-solar-system', prompt:'How many official planets are in the Solar System?', options:['Seven','Eight','Nine','Twelve'], correctIndex:1, note:'Mercury through Neptune are the eight planets.' },
 { unitId:'u3-galaxy', prompt:'What is a light-year?', options:['A long school year','The distance light travels in one year','A star birthday','A Moon phase'], correctIndex:1, note:'A light-year is a distance unit.' },
 { unitId:'u4-earth-moon', prompt:'What causes Moon phases?', options:['Changing view of the Moon sunlit half','Clouds','Earth shadow every night','More Moon light'], correctIndex:0, note:'Moon phases show changing views of the lit half.' },
 { unitId:'u5-satellites', prompt:'What is an artificial satellite?', options:['A human-made spacecraft placed in orbit','A natural moon only','A mountain','A star'], correctIndex:0, note:'Artificial satellites are built and launched by people.' },
 { unitId:'u6-rockets', prompt:'How does a rocket produce thrust?', options:['By pushing exhaust backward','By flapping wings','By pulling the Moon','By sound'], correctIndex:0, note:'Rocket thrust comes from expelling material backward.' },
 { unitId:'u7-isro', prompt:'What is ISRO?', options:['India space agency','A sea station','A planet','A star pattern'], correctIndex:0, note:'ISRO is India national space agency.' },
 { unitId:'u8-exploration', prompt:'What is a space station?', options:['A spacecraft where people live and work in orbit','A tower','A fuel tank','A mountain'], correctIndex:0, note:'A space station is an orbiting lab and home.' },
 { unitId:'u9-physics', prompt:'What is gravity?', options:['Attraction between objects with mass','Only air pushing','A colour','A shadow'], correctIndex:0, note:'Gravity attracts masses.' },
 { unitId:'u10-reasoning', prompt:'What is observation?', options:['Information gathered by watching or measuring','A guess','Only a story','Random answer'], correctIndex:0, note:'Observation records what is seen or measured.' },
 { unitId:'u11-awareness', prompt:'What should space news distinguish?', options:['Completed, ongoing and planned events','Only rumours','Only pictures','Only old stories'], correctIndex:0, note:'Status words matter.' }
];

export function getMissionQuiz(unitId:string){ return isoMissionQuiz.filter((q)=>q.unitId===unitId); }
