// core.js - Core app logic (threat alerts, nav, modal trap)

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

function setupMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
      hamburger.classList.toggle('active');
    });
  }
}

// Accessibility: trap focus in modals
function trapFocus(modal) {
  const focusableEls = modal.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
  const firstEl = focusableEls[0];
  const lastEl = focusableEls[focusableEls.length - 1];
  modal.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    } else if (e.key === 'Escape') {
      modal.style.display = 'none';
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  loadThreatAlerts();
  setupMobileMenu();
  // Trap focus for quiz modal (if present)
  const quizModal = document.getElementById('quizModal');
  if (quizModal) {
    trapFocus(quizModal);
    quizModal.addEventListener('click', function (e) {
      if (e.target === quizModal) quizModal.style.display = 'none';
    });
  }
});
// Mobile Navbar Toggle Script
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      // Animate hamburger lines
      hamburger.classList.toggle("open");
    });

    // Close menu when a link is clicked
    document.querySelectorAll(".nav-link").forEach(link =>
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        hamburger.classList.remove("open");
      })
    );
  }
});


