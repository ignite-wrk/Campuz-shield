// core.js - Core app logic (threat alerts, nav, modal trap)

/* ===============================
   🔒 Threat Alerts Data & Loader
================================*/
const threatAlerts = [
  {
    title: "⚠️ Fake M-Pesa Messages",
    description: "Scammers sending fake M-Pesa confirmation SMS. Don't reply or call unknown numbers from these messages.",
    date: "Today",
    urgency: "high"
  },
  {
    title: "🎣 Phishing Emails Targeting Students",
    description: "Fake scholarship and internship emails asking for personal information. Verify before clicking links.",
    date: "2 days ago",
    urgency: "medium"
  },
  {
    title: "📱 Social Media Impersonation",
    description: "Fake profiles pretending to be university staff. Never share passwords or send money via social media.",
    date: "1 week ago",
    urgency: "high"
  }
];

function loadThreatAlerts() {
  const alertsContainer = document.getElementById('threatAlerts');
  if (!alertsContainer) return;
  alertsContainer.innerHTML = threatAlerts.map(alert => `
    <div class="alert-card" data-urgency="${alert.urgency}">
      <h3>${alert.title}</h3>
      <p>${alert.description}</p>
      <span class="alert-date">Posted: ${alert.date}</span>
    </div>
  `).join('');
}

/* ===============================
   📱 Mobile Navbar Toggle
================================*/
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  // Toggle Menu Open/Close
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      hamburger.classList.toggle("open");
    });

    // Close menu when a nav link is clicked
    document.querySelectorAll(".nav-link").forEach(link =>
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        hamburger.classList.remove("open");
      })
    );

    // Optional: Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove("active");
        hamburger.classList.remove("open");
      }
    });
  }
});

/* ===============================
   ♿ Accessibility: Trap Focus in Modals
================================*/
function trapFocus(modal) {
  const focusableEls = modal.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
  const firstEl = focusableEls[0];
  const lastEl = focusableEls[focusableEls.length - 1];

  modal.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    } else if (e.key === 'Escape') {
      modal.style.display = 'none';
    }
  });
}

/* ===============================
   🚀 Initialize Page
================================*/
document.addEventListener('DOMContentLoaded', function() {
  loadThreatAlerts();

  const quizModal = document.getElementById('quizModal');
  if (quizModal) {
    trapFocus(quizModal);
    quizModal.addEventListener('click', function (e) {
      if (e.target === quizModal) quizModal.style.display = 'none';
    });
  }
});
