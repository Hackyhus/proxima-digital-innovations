/**
 * PROXIMA DIGITAL INNOVATIONS — Core Client Script
 * Production-quality, accessible, zero-dependency.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initTechnicalSpecsModal();
  initDemoForm();
  initSmoothScrollLinks();
});

/* --------------------------------------------------------------------------
   1. Mobile Navigation
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = mobileNav ? mobileNav.querySelectorAll('.mobile-nav-link, .btn') : [];

  if (!toggleBtn || !mobileNav) return;

  const toggleMenu = (open) => {
    const isOpen = open !== undefined ? open : !mobileNav.classList.contains('is-open');
    mobileNav.classList.toggle('is-open', isOpen);
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    mobileNav.setAttribute('aria-hidden', String(!isOpen));
  };

  toggleBtn.addEventListener('click', () => toggleMenu());

  // Close when clicking any nav link
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (
      mobileNav.classList.contains('is-open') &&
      !mobileNav.contains(e.target) &&
      !toggleBtn.contains(e.target)
    ) {
      toggleMenu(false);
    }
  });
}

/* --------------------------------------------------------------------------
   2. Technical Specs Modal & Data
   -------------------------------------------------------------------------- */
const SOLUTION_SPECS = {
  bms: {
    sku: 'PROXIMA-BMS-SPEC',
    title: 'Proxima BMS / ERP — Architectural Specifications',
    category: 'Commercial Enterprise & Multi-Branch Resource Planning',
    sections: [
      {
        title: 'Deployment & System Architecture',
        details: [
          { key: 'Deployment Models', value: 'On-Premises Dedicated Server, Hybrid Edge Relay, or Private VPC' },
          { key: 'Database Engine', value: 'Embedded ACID-compliant local storage with PostgreSQL upstream sync' },
          { key: 'Network Fault Model', value: 'Store-and-forward write-ahead replication; zero latency on LAN' },
          { key: 'Multi-Branch Sync', value: 'Asymmetric cryptographic change feeds with automatic conflict resolution' }
        ]
      },
      {
        title: 'Core Functional Modules',
        details: [
          { key: 'Inventory Control', value: 'Multi-depot transfers, automated reorder thresholds, batch/lot tracking' },
          { key: 'Financial Ledger', value: 'Double-entry general ledger, chart of accounts, automated tax reporting' },
          { key: 'Point of Sale (POS)', value: 'High-throughput checkout, barcode integration, cash drawer pulse relays' },
          { key: 'Audit & Compliance', value: 'Non-repudiable audit logs, user permission matrices, transaction rollback' }
        ]
      },
      {
        title: 'Hardware & Security Controls',
        details: [
          { key: 'Peripherals Supported', value: 'ESC/POS thermal printers, USB/Serial 2D barcode scanners, customer displays' },
          { key: 'Cryptographic Node Lock', value: 'Binary bound to motherboard UUID and CPU hardware signature' }
        ]
      }
    ]
  },
  hms: {
    sku: 'PROXIMA-HMS-SPEC',
    title: 'Proxima HMS — Clinical Architecture & Safety Specs',
    category: 'Hospital & Healthcare Facility Management',
    sections: [
      {
        title: 'Clinical Operations Architecture',
        details: [
          { key: 'Operational Availability', value: 'Continuous 24/7/365 local runtime; immune to external ISP downtime' },
          { key: 'EMR Records Security', value: 'Encrypted patient records with strictly segregated clinical access roles' },
          { key: 'Data Residency', value: '100% on-site data retention complying with Nigerian health data standards' },
          { key: 'Emergency Triage Node', value: 'Sub-second patient file retrieval even during peak clinic intake' }
        ]
      },
      {
        title: 'Pharmacy & Diagnostic Subsystems',
        details: [
          { key: 'Dispensary Control', value: 'Automated batch number verification, expiration tracking, stock lockouts' },
          { key: 'Laboratory (LIS)', value: 'Specimen barcode labeling, analyzer interface logs, verified doctor sign-off' },
          { key: 'Billing & Insurance', value: 'Automated HMO/NHIS tariff computation, co-pay reconciliation, deposit control' },
          { key: 'Inpatient Ward Mgmt', value: 'Bed occupancy visualization, nursing rounds logging, vital signs charting' }
        ]
      },
      {
        title: 'Hardware & Environmental Durability',
        details: [
          { key: 'Hardware Footprint', value: 'Low-power local rack servers with automated power-cut safe-write safeguards' },
          { key: 'Backup Topology', value: 'Continuous local snapshotting with secondary air-gapped disk replication' }
        ]
      }
    ]
  },
  sms: {
    sku: 'PROXIMA-SMS-SPEC',
    title: 'Proxima SMS — Institutional Architecture Specs',
    category: 'School & Academic Institution Operations',
    sections: [
      {
        title: 'Academic Computing & Governance',
        details: [
          { key: 'Grading Engine', value: 'Automated continuous assessment (CA) formulas, weighted terminal exams' },
          { key: 'Report Card Security', value: 'Cryptographically signed transcripts preventing unauthorized score tampering' },
          { key: 'Timetabling Engine', value: 'Automated faculty workload balancing and room allocation conflict checks' },
          { key: 'Student Information', value: 'Lifetime student records, behavioral notes, guardian contact matrices' }
        ]
      },
      {
        title: 'Bursary & Financial Reconciliation',
        details: [
          { key: 'Tuition Management', value: 'Customizable fee structures per class/term, automated debt notification' },
          { key: 'Payment Reconciliation', value: 'Bank branch deposit reference matching and anti-fraud receipt logging' },
          { key: 'Scholarship Ledgers', value: 'Automated discount allocations and multi-child family ledger linking' }
        ]
      },
      {
        title: 'Access Control Integration',
        details: [
          { key: 'Attendance Automation', value: 'Direct integration with school turnstiles for automated morning roll call' },
          { key: 'Guardian Notification', value: 'Automated SMS / messaging trigger upon biometric gate entry/exit' }
        ]
      }
    ]
  },
  biometrics: {
    sku: 'PROXIMA-BIO-SPEC',
    title: 'Biometric Security — Hardware & Driver Specifications',
    category: 'Hardware-Integrated Access Control & Time Telemetry',
    sections: [
      {
        title: 'Edge Authentication & Speed',
        details: [
          { key: 'Verification Latency', value: '<300ms local edge verification directly on hardware controller' },
          { key: 'Matching Algorithms', value: '1:1 and 1:N fingerprint pattern matching and dual-camera facial verification' },
          { key: 'Anti-Spoofing', value: 'Live finger capacitance detection, infrared anti-photo 3D depth check' },
          { key: 'Offline Buffering', value: 'Up to 100,000 punch events stored internally per terminal during outages' }
        ]
      },
      {
        title: 'Supported Hardware Ecosystem',
        details: [
          { key: 'Terminal Manufacturers', value: 'Native TCP/IP socket drivers for Hikvision, ZKTeco, and proprietary edge boards' },
          { key: 'Physical Interfaces', value: 'Wiegand 26/34 bit, RS-485, Ethernet 10/100, Dry Contact Door Relays' },
          { key: 'Barrier Support', value: 'Optical turnstiles, tripod gates, magnetic door locks, vehicular barrier arms' }
        ]
      },
      {
        title: 'Time & Attendance Engine',
        details: [
          { key: 'Shift Policies', value: 'Complex overnight shifts, rotational rosters, grace periods, split duty' },
          { key: 'Audit & Anti-Fraud', value: 'Terminal ID stamp, geo-tagged mobile supervisor punches, buddy-punch elimination' },
          { key: 'Payroll Connectivity', value: 'Direct export to Proxima BMS or CSV/Excel formatting for third-party payroll' }
        ]
      }
    ]
  }
};

function initTechnicalSpecsModal() {
  const modal = document.getElementById('specsModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const dismissBtn = document.getElementById('modalDismissBtn');
  const modalSku = document.getElementById('modalSku');
  const modalTitle = document.getElementById('modalTitle');
  const modalContent = document.getElementById('modalContent');
  const modalCtaBtn = document.getElementById('modalCtaBtn');

  if (!modal || !modalContent) return;

  let lastActiveElement = null;

  const openModal = (solutionKey) => {
    const spec = SOLUTION_SPECS[solutionKey];
    if (!spec) return;

    lastActiveElement = document.activeElement;

    modalSku.textContent = spec.sku;
    modalTitle.textContent = spec.title;

    let html = `<p style="margin-bottom: 20px; font-weight: 500; color: #1E3A8A;">${spec.category}</p>`;

    spec.sections.forEach((sec) => {
      html += `
        <div class="spec-tech-block">
          <h4>${sec.title}</h4>
          <table class="spec-table">
            <tbody>
              ${sec.details
                .map(
                  (d) => `
                <tr>
                  <td>${d.key}</td>
                  <td>${d.value}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>
      `;
    });

    modalContent.innerHTML = html;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    closeBtn.focus();
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  };

  // Attach buttons in cards
  const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
  learnMoreBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.getAttribute('data-target');
      openModal(target);
    });
  });

  // Footer jump links
  const footerJumpLinks = document.querySelectorAll('a[data-jump]');
  footerJumpLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const jumpKey = link.getAttribute('data-jump');
      if (jumpKey && SOLUTION_SPECS[jumpKey]) {
        e.preventDefault();
        openModal(jumpKey);
      }
    });
  });

  // Close triggers
  closeBtn.addEventListener('click', closeModal);
  dismissBtn.addEventListener('click', closeModal);
  if (modalCtaBtn) {
    modalCtaBtn.addEventListener('click', () => {
      closeModal();
    });
  }

  // Backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Keyboard navigation: Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   3. Demo & Site Audit Request Form
   -------------------------------------------------------------------------- */
function initDemoForm() {
  const form = document.getElementById('demoRequestForm');
  const feedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('submitBtn');

  if (!form || !feedback) return;

  const fields = {
    fullName: {
      input: document.getElementById('fullName'),
      error: document.getElementById('fullNameError'),
      validate: (val) => val.trim().length >= 3,
      msg: 'Please provide your full name (minimum 3 characters).'
    },
    workEmail: {
      input: document.getElementById('workEmail'),
      error: document.getElementById('workEmailError'),
      validate: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
      msg: 'Please provide a valid corporate or professional email.'
    },
    phoneNumber: {
      input: document.getElementById('phoneNumber'),
      error: document.getElementById('phoneNumberError'),
      validate: (val) => val.replace(/\D/g, '').length >= 10,
      msg: 'Please enter a valid phone number (at least 10 digits).'
    },
    organizationName: {
      input: document.getElementById('organizationName'),
      error: document.getElementById('organizationNameError'),
      validate: (val) => val.trim().length >= 2,
      msg: 'Please specify your organization name and location.'
    },
    solutionSelect: {
      input: document.getElementById('solutionSelect'),
      error: document.getElementById('solutionSelectError'),
      validate: (val) => val !== '' && val !== null,
      msg: 'Please select an enterprise solution platform.'
    },
    branchCount: {
      input: document.getElementById('branchCount'),
      error: document.getElementById('branchCountError'),
      validate: (val) => val !== '' && val !== null,
      msg: 'Please select your estimated operational scope.'
    }
  };

  // Real-time clearance of errors on user input
  Object.keys(fields).forEach((key) => {
    const item = fields[key];
    if (item.input) {
      item.input.addEventListener('input', () => {
        item.input.classList.remove('error');
        if (item.error) item.error.textContent = '';
        feedback.style.display = 'none';
      });
      item.input.addEventListener('change', () => {
        item.input.classList.remove('error');
        if (item.error) item.error.textContent = '';
      });
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    let firstInvalidInput = null;

    // Validate all required fields
    Object.keys(fields).forEach((key) => {
      const item = fields[key];
      if (!item.input) return;

      const val = item.input.value;
      if (!item.validate(val)) {
        isValid = false;
        item.input.classList.add('error');
        if (item.error) item.error.textContent = item.msg;
        if (!firstInvalidInput) {
          firstInvalidInput = item.input;
        }
      } else {
        item.input.classList.remove('error');
        if (item.error) item.error.textContent = '';
      }
    });

    if (!isValid) {
      if (firstInvalidInput) {
        firstInvalidInput.focus();
      }
      return;
    }

    // Processing UI state
    submitBtn.disabled = true;
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <span>Processing Specification...</span>
    `;

    // Simulate reliable submission (production API endpoint hook)
    setTimeout(() => {
      const randomTicketId = 'PRX-' + Math.floor(1000 + Math.random() * 9000) + '-KD';
      const org = fields.organizationName.input.value.trim();

      feedback.className = 'form-feedback success';
      feedback.style.display = 'block';
      feedback.innerHTML = `
        <strong>Specification Received [Docket: ${randomTicketId}]</strong><br>
        Thank you. A systems engineer from our Kaduna technical desk will review ${org}'s operational scope and reach out via email/phone within 4 business hours to arrange your technical briefing.
      `;

      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;

      // Scroll smoothly to feedback message
      feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 600);
  });
}

/* --------------------------------------------------------------------------
   4. Smooth Internal Scroll
   -------------------------------------------------------------------------- */
function initSmoothScrollLinks() {
  const anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#' || targetId === '#top') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
