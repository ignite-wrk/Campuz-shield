// forms.js - Incident report form handling and validation

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

function validateIncidentForm(form) {
  const type = form.querySelector('#incidentType').value.trim();
  const desc = form.querySelector('#description').value.trim();
  let errors = [];

  if (!type) errors.push("Please select an incident type.");
  if (!desc) errors.push("Description is required.");

  const contact = form.querySelector('#contact').value.trim();
  if (contact && !validateEmail(contact)) errors.push("Invalid email format.");

  return errors;
}

function submitIncidentReport(form) {
  const errors = validateIncidentForm(form);
  const feedback = form.querySelector('.form-feedback');
  if (feedback) feedback.innerHTML = '';
  if (errors.length > 0) {
    if (feedback) feedback.innerHTML = errors.map(e => `<div class="error">${e}</div>`).join('');
    form.querySelector('[type="submit"]').disabled = false;
    return false;
  }

  // Placeholder for backend integration
  // For now, just show a thank you message
  if (feedback) feedback.innerHTML = `<div class="success">Thank you for reporting! Your information has been submitted anonymously. We will review this threat.</div>`;

  form.reset();
  return true;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('incidentForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      this.querySelector('[type="submit"]').disabled = true;
      submitIncidentReport(this);
      setTimeout(() => {
        this.querySelector('[type="submit"]').disabled = false;
      }, 2000);
    });
  }
});