document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons({ attrs: { 'stroke-width': 1.8, 'aria-hidden': 'true' } });
  }

  function drawCanvasArt(canvas) {
    const ratio = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);

    const ctx = canvas.getContext('2d');
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    const palette = {
      blog: ['#17101f', '#241735', '#a78bfa'],
      game: ['#13101c', '#302146', '#bb9cff'],
      hermes: ['#101018', '#21152d', '#9d83eb'],
      academy: ['#0d1712', '#17271d', '#69b98c'],
      podcast: ['#0d1712', '#1c3224', '#86cfa5'],
      community: ['#0c1520', '#172a3b', '#67b7ff']
    };
    const [dark, middle, accent] = palette[canvas.dataset.art] || palette.community;

    const background = ctx.createLinearGradient(0, 0, width, height);
    background.addColorStop(0, dark);
    background.addColorStop(1, middle);
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = accent;
    ctx.globalAlpha = 0.22;
    ctx.lineWidth = 1;
    for (let x = -height; x < width + height; x += 28) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + height, height);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    ctx.strokeStyle = accent;
    ctx.fillStyle = accent;
    ctx.lineWidth = 3;

    const kind = canvas.dataset.art;
    if (kind === 'podcast') {
      for (let i = 0; i < 12; i++) {
        const barHeight = 24 + ((i * 29) % 86);
        ctx.fillRect(22 + i * ((width - 44) / 12), (height - barHeight) / 2, 5, barHeight);
      }
    } else if (kind === 'academy') {
      ctx.beginPath();
      ctx.moveTo(width * 0.5, height * 0.18);
      ctx.lineTo(width * 0.74, height * 0.37);
      ctx.lineTo(width * 0.62, height * 0.37);
      ctx.lineTo(width * 0.62, height * 0.68);
      ctx.lineTo(width * 0.38, height * 0.68);
      ctx.lineTo(width * 0.38, height * 0.37);
      ctx.lineTo(width * 0.26, height * 0.37);
      ctx.closePath();
      ctx.fill();
    } else if (kind === 'community') {
      for (let i = 0; i < 7; i++) {
        ctx.beginPath();
        ctx.arc(width * (0.18 + i * 0.11), height * (0.5 + Math.sin(i) * 0.12), 18 + i % 3 * 5, 0, Math.PI * 2);
        ctx.stroke();
      }
    } else {
      ctx.beginPath();
      ctx.arc(width * 0.5, height * 0.48, Math.min(width, height) * 0.22, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(width * 0.32, height * 0.48);
      ctx.lineTo(width * 0.68, height * 0.48);
      ctx.moveTo(width * 0.5, height * 0.30);
      ctx.lineTo(width * 0.5, height * 0.66);
      ctx.stroke();
    }

    ctx.fillStyle = accent;
    ctx.globalAlpha = 0.15;
    ctx.beginPath();
    ctx.arc(width * 0.82, height * 0.18, 52, 0, Math.PI * 2);
    ctx.fill();
  }

  document.querySelectorAll('.canvas-art').forEach((canvas) => drawCanvasArt(canvas));
  window.addEventListener('resize', () => {
    document.querySelectorAll('.canvas-art').forEach((canvas) => drawCanvasArt(canvas));
  });

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

  langButtons.forEach((button) => {
    button.addEventListener('click', () => {
      applyLanguage(button.dataset.lang);
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
  langBackdrop.addEventListener('click', (event) => {
    if (event.target === langBackdrop && localStorage.getItem('portal_lang')) {
      langBackdrop.classList.remove('is-open');
    }
  });
});