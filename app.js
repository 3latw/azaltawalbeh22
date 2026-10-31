(() => {
  'use strict';
  const form = document.querySelector('#contact-form');
  if (!form) return;

  const fields = [...form.querySelectorAll('input, textarea')];
  const status = document.querySelector('#form-status');

  function showError(field, message) {
    field.setAttribute('aria-invalid', String(Boolean(message)));
    document.getElementById(field.getAttribute('aria-describedby')).textContent = message;
  }

  fields.forEach(field => {
    field.addEventListener('input', () => {
      showError(field, '');
      status.textContent = '';
    });
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    status.textContent = '';
    let firstInvalid;

    fields.forEach(field => {
      const value = field.value.trim();
      let message = '';
      if (!value) {
        message = `Please enter your ${field.labels[0].textContent.replace('*', '').trim().toLowerCase()}.`;
      } else if (field.type === 'email' && !field.validity.valid) {
        message = 'Please enter a valid email address.';
      }
      showError(field, message);
      if (message && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      status.textContent = 'Please complete all fields correctly before submitting.';
      firstInvalid.focus();
      return;
    }

    window.alert('Your form was submitted successfully. Thank you!');
    form.reset();
    status.textContent = 'Thank you! Your form was submitted successfully. To send me an email, use the university email link.';
  });
})();
