export function shuffleArray(array: any[]) {
  for (let x = array.length - 1; x > 0; x--) {
    const y = Math.floor(Math.random() * (x + 1));
    [array[x], array[y]] = [array[y], array[x]];
  }
  return [...array];
}

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export const Difficulty: Array<string> = ["easy", "medium", "hard"];

export type QuestionsState = Question & { answers: string[] };

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: string
): Promise<QuestionsState[]> => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const res = await (await fetch(endpoint)).json();
  return res.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
