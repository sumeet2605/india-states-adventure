type Question = { answer: { name: string; capital?: string }; options: string[] };

type Props = {
  indiaQuestion: Question;
  worldQuestion: { name: string };
  worldOptions: string[];
  onIndiaAnswer: (option: string) => void;
  onWorldAnswer: (option: string) => void;
};

export function QuizScreen({ indiaQuestion, worldQuestion, worldOptions, onIndiaAnswer, onWorldAnswer }: Props) {
  return (
    <section className="quiz-card arena">
      <h2>🏆 Quiz Arena</h2>
      <p>What is the capital of <strong>{indiaQuestion.answer.name}</strong>?</p>
      <div className="quiz-options">{indiaQuestion.options.map((option) => <button key={option} onClick={() => onIndiaAnswer(option)}>{option}</button>)}</div>
      <p>World bonus: Which answer matches <strong>{worldQuestion.name}</strong>?</p>
      <div className="quiz-options">{worldOptions.map((option) => <button key={option} onClick={() => onWorldAnswer(option)}>{option}</button>)}</div>
    </section>
  );
}
