export type IsoQuestion = { id: string; unitId: string; prompt: string; options: string[]; answer: string; explanation: string };

export const isoQuestionBank: IsoQuestion[] = [
  { id: 'u1-astronomy-q1', unitId: 'u1-astronomy', prompt: 'What is astronomy?', options: ['Only naming stars', 'Scientific study of space and objects beyond Earth', 'Weather study only', 'Storytelling without evidence'], answer: 'Scientific study of space and objects beyond Earth', explanation: 'Astronomy uses observations and evidence to study space and objects beyond Earth.' }
];
