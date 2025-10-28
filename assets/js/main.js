// main.js — Handles order & contact form submissions directly to Google Sheets
document.addEventListener('DOMContentLoaded', function () {

  // ✅ Set current year in footer (optional)
  const y = new Date().getFullYear();
  const yearEls = [document.getElementById('year'), document.getElementById('year2')];
  yearEls.forEach(el => { if (el) el.textContent = y; });

  // 🧭 Mobile navigation toggle (optional)
  const navToggle = document.getElementById('navToggle');
  const navList = document.querySelector('.nav-list');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      navList.classList.toggle('show');
    });
  }

  // 🌐 Google Apps Script Web App URLs
  const ORDER_SHEET_URL = 'https://script.google.com/macros/s/AKfycby9MKjwazzFJ0ZdjnChGpbqOKzcxoEWjXKE029nq_gm9wkcXBYHRpfvfkKD8lBrq0g7Ow/exec';
  const CONTACT_SHEET_URL = 'https://script.google.com/macros/s/AKfycbxRHST2az9dSYhygwAf-HXAD6l3HNRrPax6cuOqCoWT4hFmJ-mUAodYzGBdlFpw9qd5/exec';

  // 🧩 Helper: validate required fields
  function validateForm(form) {
    const required = form.querySelectorAll('[required]');
    let valid = true;
    required.forEach(field => {
      if (!field.value.trim()) {
        field.classList.add('error');
        valid = false;
      } else {
        field.classList.remove('error');
      }
    });
    return valid;
  }

  // 📤 Helper: submit to Google Sheet
  async function submitToSheet(endpoint, form, msgEl) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    msgEl.textContent = '📤 Submitting...';

    try {
      await fetch(endpoint, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });
      msgEl.textContent = '✅ Submitted successfully!';
      form.reset();
    } catch (error) {
      console.error('Error submitting:', error);
      msgEl.textContent = '❌ Submission failed. Try again.';
    }

    if (submitBtn) submitBtn.disabled = false;
  }

  // 🧾 Handle Order Form
  const orderForm = document.getElementById('orderForm');
  if (orderForm) {
    orderForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const msg = document.getElementById('orderMessage');
      if (!validateForm(orderForm)) {
        msg.textContent = '⚠️ Please fill in all required fields.';
        return;
      }
      submitToSheet(ORDER_SHEET_URL, orderForm, msg);
    });
  }

  // 💬 Handle Contact Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const msg = document.getElementById('contactMessageText');
      if (!validateForm(contactForm)) {
        msg.textContent = '⚠️ Please fill in all required fields.';
        return;
      }
      submitToSheet(CONTACT_SHEET_URL, contactForm, msg);
    });
  }

});
