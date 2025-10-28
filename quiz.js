// quiz.js - Modular Cyber Quiz functionality

const quizQuestions = [
  // ... (Your quiz questions remain unchanged)
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
  document.getElementById('quizCloseBtn')?.focus();
}

function closeQuizModal() {
  const modal = document.getElementById('quizModal');
  if (modal) modal.style.display = 'none';
}

function renderQuizQuestion() {
  const container = document.getElementById('quizContent');
  if (!container) return;

  // === Final score screen ===
  if (quizState.current >= quizQuestions.length) {
    container.innerHTML = `
      <h2>Your Score: ${quizState.score} / ${quizQuestions.length}</h2>
      <div class="quiz-buttons">
        <button id="quizRestartBtn" class="btn btn-primary" aria-label="Restart Quiz">Restart Quiz</button>
        <button id="moreQuizBtn1" class="btn btn-success" aria-label="More Quizzes"
          onclick="window.open('https://infosecquiz.com/fundamentals-of-information-security-quiz/', '_blank')">
          More Quizzes
        </button>
        <button id="moreQuizBtn2" class="btn btn-secondary" aria-label="Try Another Quiz"
          onclick="window.open('https://cyberquiz.com/new-quiz', '_blank')">
          Try Another Quiz
        </button>
        <button id="quizCloseBtn2" class="btn btn-secondary" aria-label="Close Quiz">Close</button>
      </div>
    `;
    document.getElementById('quizRestartBtn').onclick = () => {
      quizState.current = 0;
      quizState.score = 0;
      renderQuizQuestion();
    };
    document.getElementById('quizCloseBtn2').onclick = closeQuizModal;
    return;
  }

  // === Question screen ===
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
    <div class="quiz-buttons" style="margin-top:1rem;">
      <button id="quizCloseBtn" class="btn btn-secondary" aria-label="Close Quiz">Close</button>
    </div>
  `;

  document.querySelectorAll('.quiz-opt').forEach(btn => {
    btn.onclick = () => {
      const selected = parseInt(btn.getAttribute('data-index'));
      const feedback = document.getElementById('quizFeedback');
      if (selected === q.correct) {
        quizState.score++;
        feedback.textContent = '✅ Correct!';
      } else {
        feedback.textContent = `❌ Incorrect. Correct answer: ${q.options[q.correct]}`;
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
