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
  },
  {
    question: "What is network security as used in cybersecurity?",
    options: [
      "Safeguarding networks from intrusion",
      "Securing softwares and apps",
      "Protecting data stored and transmitted online",
      "Detecting and responding to cyber attacks"
    ],
    correct: 0
  },
  {
    question: "What is a threat actor?",
    options: [
      "Individual or group that engages in malicious activities such as hackers and cybercriminals.",
      "None of the above.",
      "Weakness in a system that can be exploited by attackers.",
      "Method or pathway used to compromise a network or system."
    ],
    correct: 0
  },
  {
    question: "What is threat intelligence?",
    options: [
      "Process of gathering and analysing data to anticipate and prevent cyber threats.",
      "Method or pathway used by attackers to compromise a network or system.",
      "Detecting and responding to cyber attacks.",
      "Weakness in a system that can be exploited by attackers."
    ],
    correct: 0
  },
  {
    question: "What is forensic analysis as used in cybersecurity?",
    options: [
      "Process of investigating cyber incidents, collecting evidence of attack and analysis.",
      "Weakness in a system that can be exploited by attackers.",
      "Ensuring that the system is up to date.",
      "Collecting online evidence of system attacks."
    ],
    correct: 0
  },
  {
    question: "What is OS hardening?",
    options: [
      "Process of ensuring that the operating system is much secure from attacks.",
      "Strengthening network security posture.",
      "Improving regulatory and compliance.",
      "Integrating the operating system with modern structures."
    ],
    correct: 0
  },
  {
    question: "Which one of the following is not a key element of risk?",
    options: [
      "Threats",
      "Vulnerability",
      "Impact",
      "Virus"
    ],
    correct: 3
  },
  {
    question: "Which one is not a component of the CIA triad?",
    options: [
      "Confidentiality",
      "Integrity",
      "Availability",
      "Malware"
    ],
    correct: 3
  },
  {
    question: "Which one of the following is not necessary while creating an incident response plan?",
    options: [
      "Identify the potential crisis in your crises management team",
      "Document your emergency and response plans",
      "Document crisis communication guidelines",
      "Continuous improvements"
    ],
    correct: 0
  },
  {
    question: "Which one of the following is not the best practice for an incident response plan?",
    options: [
      "Incident response team training",
      "Awareness and preparedness",
      "Continuous improvements (review and updates)",
      "Document crisis communication guidelines"
    ],
    correct: 3
  },
  {
    question: "Which one of the following is not among the threat hunting process?",
    options: [
      "Hypothesis formulation",
      "Acquire data",
      "Analyse data",
      "Documentation"
    ],
    correct: 3
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
        <button id="moreQuizBtn" class="btn btn-primary" aria-label="More Quizzes"
          onclick="window.open('https://infosecquiz.com/fundamentals-of-information-security-quiz/', '_blank')">
          More Quizzes
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
