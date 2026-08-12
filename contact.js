'use strict';
function setContactField(id, state, msg) {
  var el  = document.getElementById(id);
  var err = document.getElementById(id + 'Err');
  if (!el) return;
  el.classList.remove('valid','invalid');
  if (state === 'valid') {
    el.classList.add('valid');
    if (err) err.classList.remove('show');
  } else if (state === 'invalid') {
    el.classList.add('invalid');
    if (err) { err.textContent = msg || 'This field is required.'; err.classList.add('show'); }
  }
}

var cForm = document.getElementById('cForm');
if (cForm) {
  cForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var valid = true;

    var name = document.getElementById('cName');
    if (!name || !name.value.trim()) { setContactField('cName','invalid','Full name is required.'); valid = false; }
    else setContactField('cName','valid');

    var email = document.getElementById('cEmail');
    if (!email || !email.value.trim()) { setContactField('cEmail','invalid','Email is required.'); valid = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { setContactField('cEmail','invalid','Enter a valid email address.'); valid = false; }
    else setContactField('cEmail','valid');

    var subject = document.getElementById('cSubject');
    if (!subject || !subject.value) { setContactField('cSubject','invalid','Please select a subject.'); valid = false; }
    else setContactField('cSubject','valid');

    var msg = document.getElementById('cMsg');
    if (!msg || !msg.value.trim()) { setContactField('cMsg','invalid','Message is required.'); valid = false; }
    else if (msg.value.trim().length < 10) { setContactField('cMsg','invalid','Message must be at least 10 characters.'); valid = false; }
    else setContactField('cMsg','valid');

    var consent = document.getElementById('consent');
    var cErr    = document.getElementById('cConsentErr');
    if (consent && !consent.checked) {
      if (cErr) { cErr.style.display = 'block'; cErr.textContent = 'You must agree before submitting.'; }
      valid = false;
    } else if (cErr) { cErr.style.display = 'none'; }

    if (valid) {
      if (window.showToast) showToast('Message sent successfully! We will reply within 24 hours.', 'success');
      cForm.reset();
      ['cName','cEmail','cSubject','cMsg'].forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.classList.remove('valid','invalid');
      });
    } else {
      if (window.showToast) showToast('Please fix the errors above before submitting.', 'error');
    }
  });

  // Live validation on blur
  ['cName','cEmail','cSubject','cMsg'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) {
      el.addEventListener('blur', function() {
        if (this.value.trim()) setContactField(id, 'valid');
      });
      el.addEventListener('input', function() {
        if (this.classList.contains('invalid') && this.value.trim()) setContactField(id, 'valid');
      });
    }
  });
}