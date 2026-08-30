document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Language LocalStorage & Selector Engine ---
  const langBackdrop = document.getElementById('langBackdrop');
  const langButtons = document.querySelectorAll('.lang-btn');
  const openLangBtn = document.getElementById('openLangBtn');
  const savedLang = localStorage.getItem('portal_lang');

  function applyLanguage(lang) {
    document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    const translatableElements = document.querySelectorAll('[data-en]');
    translatableElements.forEach((el) => {
      if (el.dataset[lang]) {
        el.textContent = el.dataset[lang];
      }
    });

    localStorage.setItem('portal_lang', lang);
  }

  // Open modal if user hasn't selected a language before
  if (!savedLang) {
    langBackdrop.classList.add('is-open');
  } else {
    applyLanguage(savedLang);
  }

  langButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.dataset.lang;
      applyLanguage(selectedLang);
      langBackdrop.classList.remove('is-open');
    });
  });

  // Re-open Language Modal via Top Button
  if (openLangBtn) {
    openLangBtn.addEventListener('click', () => {
      langBackdrop.classList.add('is-open');
    });
  }

  // Close language modal when clicking backdrop
  langBackdrop.addEventListener('click', (e) => {
    if (e.target === langBackdrop && localStorage.getItem('portal_lang')) {
      langBackdrop.classList.remove('is-open');
    }
  });

  // --- 2. Multi-Language Typewriter Effect ---
  const headingPhrases = [
    "Which YouTube channel brought you here?",
    "どのチャンネルから来ましたか？",
    "من أي قناة جئت؟"
  ];
  
  const textContainer = document.getElementById('typewriterText');
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentPhrase = headingPhrases[phraseIndex];
    charIndex += isDeleting ? -1 : 1;

    const visibleText = currentPhrase.substring(0, charIndex);
    textContainer.innerHTML = `${visibleText}<span class="cursor">|</span>`;

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentPhrase.length) {
      speed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % headingPhrases.length;
      speed = 400;
    }

    setTimeout(typeEffect, speed);
  }

  typeEffect();

  // --- 3. Menu Navigation Handler ---
  const menuButtons = document.querySelectorAll('.menu-btn');
  const channelCards = document.querySelectorAll('.channel-card');

  menuButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;

      menuButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      channelCards.forEach((card) => {
        card.classList.remove('active');
        if (card.id === `card-${target}`) {
          card.classList.add('active');
        }
      });
    });
  });

  // --- 4. Modal Dialog Controller ---
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTriggers = document.querySelectorAll('.modal-trigger');

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const currentLang = localStorage.getItem('portal_lang') || 'en';
      const langSuffix = currentLang.charAt(0).toUpperCase() + currentLang.slice(1);
      
      modalTitle.textContent = trigger.dataset.title;
      modalDescription.textContent = trigger.dataset[`desc${langSuffix}`] || trigger.dataset.descEn || trigger.dataset.desc;
      modalBackdrop.classList.add('is-open');
    });
  });

  function closeModal() {
    modalBackdrop.classList.remove('is-open');
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });
});