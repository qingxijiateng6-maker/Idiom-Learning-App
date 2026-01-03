/**
 * Generates a quiz question with one correct answer and three wrong answers
 * @param {Object} idiom - The idiom object to create a question for
 * @param {Array} allIdioms - Array of all idioms to select wrong answers from
 * @returns {Object} Question object with idiom, options, and correctAnswer
 */
export function generateQuizQuestion(idiom, allIdioms) {
  const correctAnswer = idiom.meaning;

  // Get wrong answers from other idioms (filter out current idiom)
  const otherIdioms = allIdioms.filter(i => i.id !== idiom.id);

  // Shuffle and take 3 wrong answers
  const wrongAnswers = otherIdioms
    .map(i => i.meaning)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  // Combine correct and wrong answers, then shuffle
  const options = [correctAnswer, ...wrongAnswers]
    .sort(() => Math.random() - 0.5);

  return {
    idiom,
    options,
    correctAnswer
  };
}

/**
 * Generates all quiz questions for a session
 * @param {Array} sessionIdioms - Array of idioms for the session
 * @param {Array} allIdioms - Array of all idioms
 * @returns {Array} Array of question objects
 */
export function generateSessionQuestions(sessionIdioms, allIdioms) {
  return sessionIdioms.map(idiom => generateQuizQuestion(idiom, allIdioms));
}
