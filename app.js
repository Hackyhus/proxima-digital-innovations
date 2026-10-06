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
      const org = fields.companyName.input.value.trim();

      alertBox.className = 'form-alert success';
      alertBox.style.display = 'block';
      alertBox.innerHTML = `
        <strong>Demonstration Request Confirmed [Docket: ${ticketId}]</strong><br>
        Thank you. An enterprise systems engineer from our Kaduna operations team will review ${org}'s specifications and reach out within 4 business hours to arrange your briefing.
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
