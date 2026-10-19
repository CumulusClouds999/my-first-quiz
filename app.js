
const questions = [
  {
    question: "The manager _____ the report yesterday.",
    options: ["finish", "finished", "finishing", "finishes"],
    answer: 1,
    explanation: "yesterday가 있으므로 과거형 finished가 정답입니다."
  },
  {
    question: "Please submit the form _____ Friday.",
    options: ["by", "during", "while", "since"],
    answer: 0,
    explanation: "by Friday는 금요일까지라는 기한을 나타냅니다."
  }
];

let currentIndex = 0;
let score = 0;
let answered = false;

const progress = document.querySelector("#progress");
const questionEl = document.querySelector("#question");
const choices = document.querySelector("#choices");
const feedback = document.querySelector("#feedback");
const nextBtn = document.querySelector("#nextBtn");

function renderQuestion() {
  const q = questions[currentIndex];

  progress.textContent =
    `문제 ${currentIndex + 1}/${questions.length} · 정답 ${score}개`;

  questionEl.textContent = q.question;
  feedback.textContent = "";
  choices.innerHTML = "";
  answered = false;

  nextBtn.disabled = true;
  nextBtn.hidden = false;
  nextBtn.textContent =
    currentIndex === questions.length - 1 ? "결과 보기" : "다음 문제";

  q.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "choice";
    button.type = "button";
    button.textContent =
      `${String.fromCharCode(65 + index)}. ${option}`;

    button.addEventListener("click", () => checkAnswer(index));
    choices.appendChild(button);
  });
}

function checkAnswer(selectedIndex) {
  if (answered) return;

  answered = true;
  const q = questions[currentIndex];
  const buttons = choices.querySelectorAll("button");

  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === q.answer) {
      button.classList.add("correct");
    }

    if (index === selectedIndex && index !== q.answer) {
      button.classList.add("wrong");
    }
  });

  if (selectedIndex === q.answer) {
    score++;
    feedback.textContent = `정답입니다! ${q.explanation}`;
  } else {
    feedback.textContent =
      `오답입니다. 정답은 ${String.fromCharCode(65 + q.answer)}번입니다. ${q.explanation}`;
  }

  progress.textContent =
    `문제 ${currentIndex + 1}/${questions.length} · 정답 ${score}개`;

  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    renderQuestion();
    return;
  }

  progress.textContent = "학습 완료";
  questionEl.textContent =
    `총 ${questions.length}문제 중 ${score}개 정답!`;

  choices.innerHTML = "";
  feedback.textContent = "새로고침하면 다시 풀 수 있습니다.";
  nextBtn.hidden = true;
});

renderQuestion();
