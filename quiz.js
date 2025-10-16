// quiz.js - Modular Cyber Quiz functionality

const quizQuestions = [
  {
    question: "You receive an SMS from 'M-Pesa' saying you've won 50,000 KSH. What should you do?",
    options: [
      "Reply immediately to claim your prize",
      "Call the number provided to verify",
      "Ignore it and don't respond",
      "Forward it to friends"
    ],
    correct: 2
  },
  {
    question: "What makes a strong password?",
    options: [
      "Your name and birth year",
      "Simple words like 'password123'",
      "A mix of letters, numbers, and symbols",
      "Same password for all accounts"
    ],
    correct: 2
  }
];

let quizState = {
  current: 0,
  score: 0
};

function showQuizModal() {
  const modal = document.getElementById('quizModal');
  if (!modal) return;
  modal.style.display = 'block';
  quizState.current = 0;
  quizState.score = 0;
  renderQuizQuestion();
  document.getElementById('quizCloseBtn').focus();
}

function closeQuizModal() {
  const modal = document.getElementById('quizModal');
  if (modal) modal.style.display = 'none';
}

function renderQuizQuestion() {
  const container = document.getElementById('quizContent');
  if (!container) return;

  if (quizState.current >= quizQuestions.length) {
    container.innerHTML = `
      <h2>Your Score: ${quizState.score} / ${quizQuestions.length}</h2>
      <button id="quizRestartBtn" class="btn btn-primary" aria-label="Restart Quiz">Restart Quiz</button>
      <button id="quizCloseBtn2" class="btn btn-secondary" aria-label="Close Quiz">Close</button>
    `;
    document.getElementById('quizRestartBtn').onclick = () => {
      quizState.current = 0;
      quizState.score = 0;
      renderQuizQuestion();
    };
    document.getElementById('quizCloseBtn2').onclick = closeQuizModal;
    return;
  }

  const q = quizQuestions[quizState.current];
  container.innerHTML = `
    <h2>Question ${quizState.current + 1} of ${quizQuestions.length}</h2>
    <p>${q.question}</p>
    <div id="quizOptions">
      ${q.options
        .map(
          (opt, idx) =>
            `<button class="btn btn-primary quiz-opt" data-index="${idx}" aria-label="Option ${String.fromCharCode(
              65 + idx
            )}: ${opt}">${String.fromCharCode(65 + idx)}) ${opt}</button>`
        )
        .join('')}
    </div>
    <div id="quizFeedback" aria-live="polite"></div>
    <button id="quizCloseBtn" class="btn btn-secondary" style="margin-top:1rem;" aria-label="Close Quiz">Close</button>
  `;

  document.querySelectorAll('.quiz-opt').forEach(btn => {
    btn.onclick = e => {
      const selected = parseInt(btn.getAttribute('data-index'));
      const feedback = document.getElementById('quizFeedback');
      if (selected === q.correct) {
        quizState.score++;
        feedback.textContent = 'Correct!';
      } else {
        feedback.textContent = `Incorrect. Correct answer: ${
          q.options[q.correct]
        }`;
      }
      setTimeout(() => {
        quizState.current++;
        renderQuizQuestion();
      }, 1200);
    };
  });

  document.getElementById('quizCloseBtn').onclick = closeQuizModal;
}

window.showQuizModal = showQuizModal;