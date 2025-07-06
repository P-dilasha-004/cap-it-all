const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");
const endButton = document.getElementById("end-btn");

const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "What is the capital of Germany?",
    answers: [
      { text: "Vienna", correct: false },
      { text: "Berlin", correct: true },
      { text: "Bern", correct: false },
      { text: "Amsterdam", correct: false },
    ],
  },
  {
    question: "What is the capital of Australia?",
    answers: [
      { text: "Sydney", correct: false },
      { text: "Melbourne", correct: false },
      { text: "Canberra", correct: true },
      { text: "Brisbane", correct: false },
    ],
  },
  {
    question: "What is the capital of Canada?",
    answers: [
      { text: "Toronto", correct: false },
      { text: "Ottawa", correct: true },
      { text: "Vancouver", correct: false },
      { text: "Montreal", correct: false },
    ],
  },
  {
    question: "What is the capital of Japan?",
    answers: [
      { text: "Osaka", correct: false },
      { text: "Kyoto", correct: false },
      { text: "Tokyo", correct: true },
      { text: "Hiroshima", correct: false },
    ],
  },
  {
    question: "What is the capital of Italy?",
    answers: [
      { text: "Milan", correct: false },
      { text: "Rome", correct: true },
      { text: "Venice", correct: false },
      { text: "Naples", correct: false },
    ],
  },
  {
    question: "What is the capital of Brazil?",
    answers: [
      { text: "Rio de Janeiro", correct: false },
      { text: "São Paulo", correct: false },
      { text: "Brasília", correct: true },
      { text: "Salvador", correct: false },
    ],
  },
  {
    question: "What is the capital of Russia?",
    answers: [
      { text: "Saint Petersburg", correct: false },
      { text: "Moscow", correct: true },
      { text: "Novosibirsk", correct: false },
      { text: "Kazan", correct: false },
    ],
  },
  {
    question: "What is the capital of Egypt?",
    answers: [
      { text: "Alexandria", correct: false },
      { text: "Cairo", correct: true },
      { text: "Luxor", correct: false },
      { text: "Giza", correct: false },
    ],
  },
  {
    question: "What is the capital of Argentina?",
    answers: [
      { text: "Buenos Aires", correct: true },
      { text: "Cordoba", correct: false },
      { text: "Rosario", correct: false },
      { text: "Mendoza", correct: false },
    ],
  },
  {
    question: "What is the capital of Turkey?",
    answers: [
      { text: "Istanbul", correct: false },
      { text: "Ankara", correct: true },
      { text: "Izmir", correct: false },
      { text: "Antalya", correct: false },
    ],
  },
  {
    question: "What is the capital of Mexico?",
    answers: [
      { text: "Guadalajara", correct: false },
      { text: "Monterrey", correct: false },
      { text: "Mexico City", correct: true },
      { text: "Cancun", correct: false },
    ],
  },
  {
    question: "What is the capital of Kenya?",
    answers: [
      { text: "Nairobi", correct: true },
      { text: "Mombasa", correct: false },
      { text: "Kisumu", correct: false },
      { text: "Nakuru", correct: false },
    ],
  },
  {
    question: "What is the capital of Spain?",
    answers: [
      { text: "Barcelona", correct: false },
      { text: "Madrid", correct: true },
      { text: "Valencia", correct: false },
      { text: "Seville", correct: false },
    ],
  },
  {
    question: "What is the capital of Nepal?",
    answers: [
      { text: "Pokhara", correct: false },
      { text: "Kathmandu", correct: true },
      { text: "Lalitpur", correct: false },
      { text: "Biratnagar", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  if (answersDisabled) return;
  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

 if (percentage === 100) {
  resultMessage.textContent = "Perfect! You've reached Capital Genius status!";
} else if (percentage >= 80) {
  resultMessage.textContent = "Great job! You're a Capital Conqueror!";
} else if (percentage >= 60) {
  resultMessage.textContent = "Good effort! You're getting closer to capital greatness!";
} else if (percentage >= 40) {
  resultMessage.textContent = "Not bad! Keep trekking toward those capitals!";
} else {
  resultMessage.textContent = "Keep practicing! You’ll soon rule the capitals!";
}

}

endButton.addEventListener("click", showResults);

function restartQuiz() {
  resultScreen.classList.remove("active");
  score = 0;

  startQuiz();
}
