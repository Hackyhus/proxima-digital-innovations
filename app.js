/**
 * PROXIMA DIGITAL INNOVATIONS — Production Script
 * High reliability, zero external dependencies.
 */

document.addEventListener('DOMContentLoaded', () => {
  initProductTabs();
  initMobileDrawer();
  initConsultationForm();
  initFooterJumps();
});

/* --------------------------------------------------------------------------
   1. Interactive Product Tabs (Verkada / Linear Style)
   -------------------------------------------------------------------------- */
function initProductTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');

  if (!tabBtns.length || !panels.length) return;

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      // Update button active states & ARIA
      tabBtns.forEach((b) => {
        const isActive = b === btn;
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-selected', String(isActive));
      });

      // Update panel visibility
      panels.forEach((p) => {
        const isTarget = p.id === `panel-${targetId}`;
        p.classList.toggle('active', isTarget);
      });
    });
  });
}

/* --------------------------------------------------------------------------
   2. Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileDrawer');
  const links = drawer ? drawer.querySelectorAll('a') : [];

  if (!toggleBtn || !drawer) return;

  const toggle = (force) => {
    const isOpen = force !== undefined ? force : !drawer.classList.contains('is-open');
    drawer.classList.toggle('is-open', isOpen);
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    drawer.setAttribute('aria-hidden', String(!isOpen));
  };

  toggleBtn.addEventListener('click', () => toggle());

  links.forEach((l) => {
    l.addEventListener('click', () => toggle(false));
  });

  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('is-open') && !drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
      toggle(false);
    }
  });
}

/* --------------------------------------------------------------------------
   3. Consultation / Demo Request Form Validation
   -------------------------------------------------------------------------- */
function initConsultationForm() {
  const form = document.getElementById('consultationForm');
  const alertBox = document.getElementById('formAlert');
  const submitBtn = document.getElementById('submitFormBtn');

  if (!form || !alertBox) return;

  const fields = {
    fullName: {
      input: document.getElementById('fullName'),
      error: document.getElementById('nameError'),
      test: (v) => v.trim().length >= 3,
      message: 'Please enter your full name.'
    },
    workEmail: {
      input: document.getElementById('workEmail'),
      error: document.getElementById('emailError'),
      test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      message: 'Please provide a valid business or professional email.'
    },
    phoneNumber: {
      input: document.getElementById('phoneNumber'),
      error: document.getElementById('phoneError'),
      test: (v) => v.replace(/\D/g, '').length >= 10,
      message: 'Please provide a valid phone number (at least 10 digits).'
    },
    companyName: {
      input: document.getElementById('companyName'),
      error: document.getElementById('companyError'),
      test: (v) => v.trim().length >= 2,
      message: 'Please enter your organization name and location.'
    },
    systemSelect: {
      input: document.getElementById('systemSelect'),
      error: document.getElementById('systemError'),
      test: (v) => v !== '' && v !== null,
      message: 'Please select a system of interest.'
    },
    scopeSelect: {
      input: document.getElementById('scopeSelect'),
      error: document.getElementById('scopeError'),
      test: (v) => v !== '' && v !== null,
      message: 'Please select your estimated facility scope.'
    }
  };

  // Clear errors as user edits
  Object.values(fields).forEach((f) => {
    if (!f.input) return;
    const clear = () => {
      f.input.classList.remove('error');
      if (f.error) f.error.textContent = '';
      alertBox.style.display = 'none';
    };
    f.input.addEventListener('input', clear);
    f.input.addEventListener('change', clear);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    let firstInvalid = null;

    Object.values(fields).forEach((f) => {
      if (!f.input) return;
      if (!f.test(f.input.value)) {
        valid = false;
        f.input.classList.add('error');
        if (f.error) f.error.textContent = f.message;
        if (!firstInvalid) firstInvalid = f.input;
      } else {
        f.input.classList.remove('error');
        if (f.error) f.error.textContent = '';
      }
    });

    if (!valid) {
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Submit state
    submitBtn.disabled = true;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span>Submitting Request...</span>`;

    setTimeout(() => {
      const ticketId = 'PRX-DEMO-' + Math.floor(1000 + Math.random() * 9000);
      const name = fields.fullName.input.value.trim();
      const org = fields.companyName.input.value.trim();
      const email = fields.workEmail.input.value.trim();
      const phone = fields.phoneNumber.input.value.trim();
      const system = fields.systemSelect.input.options[fields.systemSelect.input.selectedIndex].text;
      const scope = fields.scopeSelect.input.options[fields.scopeSelect.input.selectedIndex].text;
      const notesEl = document.getElementById('requirements');
      const notes = notesEl ? notesEl.value.trim() : '';

      const waText = `*PROXIMA SYSTEM INQUIRY [${ticketId}]*\nName: ${name}\nOrganization: ${org}\nEmail: ${email}\nPhone: ${phone}\nSystem: ${system}\nScope: ${scope}\nNotes: ${notes || 'Site survey and demo requested'}`;
      const waUrl = `https://wa.me/2349039654557?text=${encodeURIComponent(waText)}`;

      const emailSubject = `Demo Request [${ticketId}]: ${org} - ${system}`;
      const mailtoUrl = `mailto:proximadiinfo@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(waText)}`;

      alertBox.className = 'form-alert success';
      alertBox.style.display = 'block';
      alertBox.innerHTML = `
        <div style="margin-bottom: 12px;">
          <strong style="color: #166534; font-size: 0.9375rem;">Demonstration Request Registered [Docket: ${ticketId}]</strong>
          <p style="margin-top: 4px; color: #166534; font-size: 0.8125rem;">
            Thank you, ${name}. Your requirements for ${org} have been compiled. For the fastest response, send this docket directly to our engineering desk via WhatsApp or Email:
          </p>
        </div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px;">
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm" style="background-color: #25D366; color: #FFFFFF; border: none; font-weight: 700;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            <span>Send via WhatsApp (+234 903 965 4557)</span>
          </a>
          <a href="${mailtoUrl}" class="btn btn-sm" style="background-color: #1E3A8A; color: #FFFFFF; border: none; font-weight: 600;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/></svg>
            <span>Email proximadiinfo@gmail.com</span>
          </a>
        </div>
        <p style="margin-top: 8px; font-size: 0.75rem; color: #15803D;">Direct Phone: <a href="tel:+2349039654557" style="text-decoration: underline; font-weight: 600;">+234 903 965 4557</a> &bull; Kaduna Operations Desk</p>
      `;

      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 600);
  });
}

/* --------------------------------------------------------------------------
   4. Footer Links Direct Tab Switching
   -------------------------------------------------------------------------- */
function initFooterJumps() {
  const jumpLinks = document.querySelectorAll('a[data-jump-tab]');
  jumpLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetTab = link.getAttribute('data-jump-tab');
      const tabButton = document.querySelector(`.tab-btn[data-tab="${targetTab}"]`);
      if (tabButton) {
        tabButton.click();
      }
    });
  });
}
