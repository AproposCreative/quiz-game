async function fetchGameData() {
  const categoriesResponse = await fetch('/api/collections/categories/items');
  const categories = await categoriesResponse.json();

  const questionsResponse = await fetch('/api/collections/questions/items');
  const questions = await questionsResponse.json();

  return {
    categories: categories.items.map(category => category.name),
    questions: categories.items.map(category => 
      questions.items
        .filter(question => question.category === category.id)
        .map(question => ({
          question: question['question-text'],
          choices: question.choices.split('\n'),
          correct: question['correct-answer-index'],
          points: question.points
        }))
    )
  };
}

async function initQuizGame(containerId) {
  const container = document.getElementById(containerId);
  const gameData = await fetchGameData();

  // Game logic goes here
  // Use the container to append game elements
  // Use gameData to populate the quiz
}

// Rest of the game logic (createGameBoard, updateScores, etc.) goes here
