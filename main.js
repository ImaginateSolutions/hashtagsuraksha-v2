// ═══════════════════════════════════════════════════
//  HASHTAG SURAKSHA — MAIN JAVASCRIPT
//  Features: Cursor Glow · Magnetic Buttons
//  3D Card Tilt · Horizontal Scroll · Typewriter · Counters
//  Chat Demo · Activity Feed · Scroll Reveal
// ═══════════════════════════════════════════════════

function decodeBlurSource(html) {
  return html
    .replace(/<br\s*\/?>/gi, '\u0000')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .replace(/\u0000/g, '\n');
}

function syncHeroGradient(titleEl) {
  const chars = titleEl.querySelectorAll('.hs-type-char');
  if (!chars.length) return;
  const host = titleEl.getBoundingClientRect();
  chars.forEach((char) => {
    const box = char.getBoundingClientRect();
    char.style.backgroundSize = `${Math.ceil(host.width)}px 100%`;
    char.style.backgroundPosition = `${Math.round(host.left - box.left)}px 0`;
  });
}

function initBubbleButtons() {
  const buttons = document.querySelectorAll(
    '.btn-primary, .btn-outline, .btn-ghost, .btn-hero-outline, .nav-cta, .nav-signup-btn, .mobile-cta, .cybernaut-cta, .show-more-btn, .nh-btn-main, .nh-btn-ghost, .btn-dark, .btn-out, .btn-cask-primary, .btn-cta-white'
  );
  buttons.forEach((btn) => {
    if (btn.dataset.bubbleReady === '1') return;
    btn.dataset.bubbleReady = '1';
    btn.classList.add('hs-bubble');
    btn.addEventListener('pointerenter', (event) => {
      const rect = btn.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const reach = Math.hypot(Math.max(x, rect.width - x), Math.max(y, rect.height - y));
      btn.style.setProperty('--bx', `${x}px`);
      btn.style.setProperty('--by', `${y}px`);
      btn.style.setProperty('--br', `${Math.ceil(reach * 2.35)}px`);
    });
  });
}

function splitTypeChars(el) {
  const lines = decodeBlurSource(el.innerHTML)
    .split('\n')
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  el.textContent = '';
  const chars = [];
  lines.forEach((line) => {
    const lineEl = document.createElement('span');
    lineEl.className = 'hs-type-line';
    Array.from(line).forEach((char) => {
      if (char === ' ') {
        lineEl.appendChild(document.createTextNode(' '));
        return;
      }
      const span = document.createElement('span');
      span.className = 'hs-type-char';
      span.textContent = char;
      lineEl.appendChild(span);
      chars.push(span);
    });
    el.appendChild(lineEl);
  });
  const caret = document.createElement('span');
  caret.className = 'hero-type-caret';
  caret.setAttribute('aria-hidden', 'true');
  const firstLine = el.querySelector('.hs-type-line');
  if (firstLine) firstLine.prepend(caret);
  else el.appendChild(caret);
  return { chars, caret };
}

function cyberIllustrations() {
  const shield = `<svg viewBox="0 0 160 160" aria-hidden="true"><path fill="#007aff" d="M80 14 126 34v42c0 34-18 58-46 72-28-14-46-38-46-72V34z"/><path fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" d="M58 80 74 96 104 62"/><circle cx="122" cy="34" r="12" fill="#ff9933"/></svg>`;
  const lock = `<svg viewBox="0 0 160 160" aria-hidden="true"><rect x="40" y="68" width="80" height="64" rx="16" fill="#138808"/><path fill="none" stroke="#7dff9a" stroke-width="10" stroke-linecap="round" d="M58 68V50a22 22 0 0 1 44 0v18"/><circle cx="80" cy="96" r="8" fill="#fff"/></svg>`;
  const globe = `<svg viewBox="0 0 160 160" aria-hidden="true"><circle cx="80" cy="80" r="46" fill="#123a72"/><ellipse cx="80" cy="80" rx="20" ry="46" fill="none" stroke="#7ec8ff" stroke-width="3"/><path fill="none" stroke="#7ec8ff" stroke-width="3" d="M34 80h92M46 56h68M46 104h68"/><circle cx="118" cy="48" r="8" fill="#138808"/></svg>`;
  const book = `<svg viewBox="0 0 160 160" aria-hidden="true"><path fill="#007aff" d="M28 42h48c8 0 14 6 14 14v68H42c-8 0-14-4-14-12z"/><path fill="#ff9933" d="M132 42H84c-8 0-14 6-14 14v68h48c8 0 14-4 14-12z"/><path fill="#138808" d="M80 22 88 40 108 42 92 56 96 76 80 66 64 76 68 56 52 42 72 40z"/></svg>`;
  const trophy = `<svg viewBox="0 0 160 160" aria-hidden="true"><path fill="#ff9933" d="M48 28h64v36c0 22-14 38-32 38S48 86 48 64z"/><path fill="#007aff" d="M68 102h24v14H68zM56 122h48v12H56z"/><circle cx="80" cy="52" r="8" fill="#fff"/></svg>`;
  const mic = `<svg viewBox="0 0 160 160" aria-hidden="true"><rect x="62" y="24" width="36" height="64" rx="18" fill="#007aff"/><path fill="none" stroke="#ff9933" stroke-width="8" stroke-linecap="round" d="M46 72a34 34 0 0 0 68 0"/><path stroke="#138808" stroke-width="8" stroke-linecap="round" d="M80 108v20M62 134h36"/></svg>`;
  const chat = `<svg viewBox="0 0 160 160" aria-hidden="true"><path fill="#007aff" d="M28 36h104v72H72l-24 22V108H28z"/><circle cx="58" cy="72" r="7" fill="#fff"/><circle cx="80" cy="72" r="7" fill="#ff9933"/><circle cx="102" cy="72" r="7" fill="#7dff9a"/></svg>`;
  const nodes = `<svg viewBox="0 0 160 160" aria-hidden="true"><path fill="none" stroke="#7ec8ff" stroke-width="4" d="M48 48 112 56M48 48 70 112M112 56 70 112"/><circle cx="48" cy="48" r="16" fill="#007aff"/><circle cx="112" cy="56" r="16" fill="#ff9933"/><circle cx="70" cy="118" r="16" fill="#138808"/></svg>`;
  const medal = `<svg viewBox="0 0 160 160" aria-hidden="true"><circle cx="80" cy="96" r="36" fill="#138808"/><circle cx="80" cy="96" r="22" fill="#fff"/><path fill="#ff9933" d="M80 82 84 92h10l-8 6 3 10-9-6-9 6 3-10-8-6h10z"/></svg>`;
  const laptop = `<svg viewBox="0 0 160 160" aria-hidden="true"><rect x="28" y="34" width="104" height="70" rx="10" fill="#123a72"/><rect x="38" y="44" width="84" height="48" rx="4" fill="#7ec8ff"/><path fill="#ff9933" d="M22 108h116l-10 16H32z"/></svg>`;
  const flag = `<svg viewBox="0 0 160 160" aria-hidden="true"><path stroke="#007aff" stroke-width="6" stroke-linecap="round" d="M46 22v116"/><path fill="#ff9933" d="M52 28h70l-12 16 12 16H52z"/><path fill="#fff" d="M52 60h58l-10 14 10 14H52z"/><path fill="#138808" d="M52 88h70l-12 16 12 16H52z"/></svg>`;
  return [shield, lock, globe, book, trophy, mic, chat, nodes, medal, laptop, flag];
}

function initSectionMotion() {
  document.querySelectorAll('body > section').forEach((section, index) => {
    if (section.id === 'partner' || section.id === 'video' || section.classList.contains('cask-hero') || section.classList.contains('cask-section-mid') || section.classList.contains('nh')) return;
    if (section.querySelector(':scope > .hs-ambient')) return;
    const layer = document.createElement('div');
    layer.className = 'hs-ambient';
    layer.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < 3; i += 1) {
      const orb = document.createElement('span');
      orb.className = `hs-orb hs-orb-${i}`;
      layer.appendChild(orb);
    }
    section.prepend(layer);
    ['tl', 'br'].forEach((corner) => {
      const radar = document.createElement('span');
      radar.className = `hs-radar hs-radar-${corner}`;
      layer.appendChild(radar);
    });
    const drawings = cyberIllustrations();
    const primary = document.createElement('div');
    primary.className = `hs-illu ${index % 2 ? 'is-right' : 'is-left'}`;
    primary.innerHTML = drawings[index % drawings.length];
    const accent = document.createElement('div');
    accent.className = `hs-illu hs-illu-small ${index % 2 ? 'is-left' : 'is-right'}`;
    accent.innerHTML = drawings[(index + 3) % drawings.length];
    layer.appendChild(primary);
    layer.appendChild(accent);
    for (let moteIndex = 0; moteIndex < 7; moteIndex += 1) {
      const mote = document.createElement('span');
      mote.className = 'hs-mote';
      mote.style.left = `${8 + ((moteIndex * 17 + index * 9) % 84)}%`;
      mote.style.top = `${12 + ((moteIndex * 23) % 70)}%`;
      mote.style.animationDelay = `${-moteIndex * 0.7}s`;
      layer.appendChild(mote);
    }
    layer.querySelectorAll('.hs-orb').forEach((orb, i) => {
      gsap.to(orb, {
        x: i === 1 ? -80 : 64,
        y: i === 2 ? 70 : -56,
        scale: 1.12,
        duration: 12 + i * 4 + (index % 3),
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });
    });
  });
}

function initCardGlow() {
  document.querySelectorAll('.vertical-card, .partner-card, .testimonial-card').forEach((card) => {
    if (card.querySelector(':scope > .hs-spot')) return;
    const spot = document.createElement('span');
    spot.className = 'hs-spot';
    spot.setAttribute('aria-hidden', 'true');
    card.appendChild(spot);
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      spot.style.setProperty('--sx', `${event.clientX - rect.left}px`);
      spot.style.setProperty('--sy', `${event.clientY - rect.top}px`);
    });
  });
}

function bindShortReveal(panel) {
  gsap.set(panel, { autoAlpha: 0, y: 28 });
  gsap.to(panel, {
    autoAlpha: 1,
    y: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: panel,
      start: 'top 50%',
      end: 'center 55%',
      scrub: 0.45,
      onLeave() { gsap.set(panel, { clearProps: 'opacity,visibility,transform' }); },
      onLeaveBack() { gsap.set(panel, { autoAlpha: 0, y: 28 }); }
    }
  });
}

function bindCenterReveal(panel) {
  if (!panel || panel.dataset.revealBound === '1') return;
  panel.dataset.revealBound = '1';
  const height = panel.offsetHeight;
  const isShort = height > 0 && height < window.innerHeight * 0.72;
  if (isShort) {
    bindShortReveal(panel);
    return;
  }
  panel.classList.add('hs-await-reveal');
  gsap.set(panel, { clipPath: 'circle(0% at 50% 40%)' });
  const reveal = { progress: 0 };
  gsap.to(reveal, {
    progress: 1,
    ease: 'none',
    immediateRender: false,
    scrollTrigger: {
      trigger: panel,
      start: 'top 50%',
      end: 'top 12%',
      scrub: 0.45,
      onLeave() {
        panel.classList.add('is-section-open');
        gsap.set(panel, { clearProps: 'clipPath' });
      },
      onEnterBack() { panel.classList.remove('is-section-open'); },
      onLeaveBack() {
        panel.classList.remove('is-section-open');
        gsap.set(panel, { clipPath: 'circle(0% at 50% 40%)' });
      }
    },
    onUpdate() {
      if (panel.classList.contains('is-section-open')) return;
      panel.style.clipPath = `circle(${reveal.progress * 150}% at 50% 40%)`;
    }
  });
}

function initLaterSectionReveal() {
  bindCenterReveal(document.querySelector('#ecosystem'));
  const start = document.querySelector('.cybernaut-section');
  if (!start) return;
  let node = start;
  while (node) {
    if (node.matches && node.matches('section') && node.id !== 'partner') bindCenterReveal(node);
    node = node.nextElementSibling;
  }
}

function initHomeGsap() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const titleEl = document.querySelector('.hero-headline .hero-gradient-text');
  const section = document.querySelector('.verticals-section');
  if (reduceMotion || typeof gsap === 'undefined' || !titleEl) {
    document.documentElement.classList.remove('js-home-anim');
    return;
  }
  if (typeof ScrollTrigger === 'undefined') {
    document.documentElement.classList.remove('js-home-anim');
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  const headline = titleEl.closest('.hero-headline');
  const hero = document.querySelector('.hero');
  const certBar = document.querySelector('.hero .cert-govt-bar');
  const heroSub = document.querySelector('.hero .hero-sub');
  const heroMap = document.querySelector('.hero-map-col');
  const typed = splitTypeChars(titleEl);
  gsap.set(typed.chars, { opacity: 0, y: 14 });
  headline?.classList.add('is-ready');
  syncHeroGradient(titleEl);
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  typed.chars.forEach((char, index) => {
    heroTl.to(char, {
      opacity: 1,
      y: 0,
      duration: 0.32,
      ease: 'power3.out',
      onStart: () => char.after(typed.caret)
    }, 0.12 + index * 0.038);
  });
  heroTl.to(typed.caret, { opacity: 0, duration: 0.3 }, '+=0.28');
  if (heroSub) {
    gsap.set(heroSub, { opacity: 0, y: 14 });
    heroTl.to(heroSub, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
      onComplete: () => gsap.set(heroSub, { clearProps: 'opacity,transform' })
    }, '-=0.15');
  }
  if (certBar) heroTl.from(certBar, { y: 16, opacity: 0, duration: 0.55 }, 0);
  if (heroMap) {
    heroTl.fromTo(heroMap,
      { clipPath: 'inset(0% 100% 0% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.35,
        ease: 'power3.inOut',
        onComplete: () => {
          heroMap.classList.add('is-shown');
          gsap.set(heroMap, { clearProps: 'clipPath' });
        }
      },
      0.2
    );
  }
  if (hero) {
    gsap.to('.hero-text', { yPercent: -10, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 } });
    if (heroMap) {
      gsap.to(heroMap, { yPercent: 14, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 } });
    }
  }
  if (!section) return;
  initSectionMotion();
  initLaterSectionReveal();
  initCardGlow();
  gsap.utils.toArray('.btn-primary, .btn-outline, .btn-hero-outline, .cybernaut-cta').forEach((btn) => {
    if (btn.closest('.nav, .mobile-menu, #partner')) return;
    gsap.from(btn, {
      y: 24,
      scale: 0.96,
      opacity: 0,
      duration: 0.65,
      ease: 'power2.out',
      scrollTrigger: { trigger: btn, start: 'top 92%', toggleActions: 'play none none none' },
      onComplete: () => gsap.set(btn, { clearProps: 'transform,opacity' })
    });
  });
  const refreshHome = () => { syncHeroGradient(titleEl); ScrollTrigger.refresh(); };
  window.addEventListener('load', refreshHome);
  window.addEventListener('resize', () => syncHeroGradient(titleEl));
}

function initSisterPageMotion() {
  const isCask = document.querySelector('.cask-hero');
  const isOlympiad = document.querySelector('section.nh');
  if ((!isCask && !isOlympiad) || document.querySelector('.hero-headline .hero-gradient-text')) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    document.documentElement.classList.remove('js-page-anim');
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('js-page-anim');
  const landing = isCask ? document.querySelector('.cask-hero') : document.querySelector('section.nh');
  initSectionMotion();
  document.querySelectorAll('body > section').forEach((panel) => {
    if (panel === landing || panel.id === 'video' || panel.classList.contains('cask-section-mid')) return;
    bindCenterReveal(panel);
  });
  initCardGlow();
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

document.addEventListener('DOMContentLoaded', () => {
  initBubbleButtons();
  // ─── THEME SYSTEM ──────────────────────────────────────────────
  const htmlEl = document.documentElement;
  const THEME_KEY = 'hs-theme';
  htmlEl.setAttribute('data-theme', 'dark');
  try {
    localStorage.setItem(THEME_KEY, 'dark');
    localStorage.removeItem('suraksha-theme');
  } catch (e) {}

  // ─── CURSOR GLOW ───────────────────────────────────────────────
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow) {
    let mouseX = -500, mouseY = -500;
    let glowX  = -500, glowY  = -500;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    document.addEventListener('mouseleave', () => {
      cursorGlow.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      cursorGlow.style.opacity = '1';
    });

    function animateGlow() {
      // Smooth lerp follow
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      cursorGlow.style.transform = `translate(${glowX - 200}px, ${glowY - 200}px)`;
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  }

  // ─── NAVBAR SCROLL ─────────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // ─── HAMBURGER MENU ────────────────────────────────────────────
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }

  // ─── MAGNETIC BUTTONS ──────────────────────────────────────────
  document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect   = btn.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) * 0.25;
      const dy     = (e.clientY - cy) * 0.25;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      setTimeout(() => btn.style.transition = '', 400);
    });
  });

  // ─── 3D CARD TILT ──────────────────────────────────────────────
  document.querySelectorAll('.eco-card, .cert-card, .testimonial-card, .audience-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect  = card.getBoundingClientRect();
      const cx    = rect.left + rect.width  / 2;
      const cy    = rect.top  + rect.height / 2;
      const rotX  = ((e.clientY - cy) / rect.height) * -10;
      const rotY  = ((e.clientX - cx) / rect.width)  *  10;
      card.style.transform   = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(6px)`;
      card.style.transition  = 'transform 0.1s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.3, 0.64, 1)';
    });
  });

  // ─── HORIZONTAL SCROLL (ECOSYSTEM) ─────────────────────────────
  const ecoTrack = document.getElementById('ecoTrack');
  if (ecoTrack) {
    let isDown = false, startX, scrollLeft;

    ecoTrack.addEventListener('mousedown', (e) => {
      isDown = true;
      ecoTrack.classList.add('grabbing');
      startX     = e.pageX - ecoTrack.offsetLeft;
      scrollLeft = ecoTrack.scrollLeft;
    });

    document.addEventListener('mouseup', () => {
      isDown = false;
      ecoTrack.classList.remove('grabbing');
    });

    ecoTrack.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x    = e.pageX - ecoTrack.offsetLeft;
      const walk = (x - startX) * 1.4;
      ecoTrack.scrollLeft = scrollLeft - walk;
    });

    // Scroll progress bar
    const progressBar = document.querySelector('.eco-scroll-progress-bar');
    if (progressBar) {
      ecoTrack.addEventListener('scroll', () => {
        const max     = ecoTrack.scrollWidth - ecoTrack.clientWidth;
        const pct     = (ecoTrack.scrollLeft / max) * 100;
        progressBar.style.width = pct + '%';
      });
    }
  }

  // ─── TYPEWRITER (HERO SUB) ──────────────────────────────────────
  const heroSub = document.getElementById('heroSub');
  if (heroSub) {
    const originalText = heroSub.textContent;
    heroSub.textContent = '';
    heroSub.style.visibility = 'visible';
    let charIndex = 0;
    const TYPE_SPEED = 28; // ms per char

    function typeNextChar() {
      if (charIndex < originalText.length) {
        heroSub.textContent += originalText[charIndex];
        charIndex++;
        setTimeout(typeNextChar, TYPE_SPEED);
      }
    }

    // Delay so hero loads first
    setTimeout(typeNextChar, 800);
  }

  // ─── COUNTER ANIMATION ─────────────────────────────────────────
  function animateCounter(el, target, duration = 2200) {
    const startTime = performance.now();
    const isLarge   = target >= 10000;

    function update(now) {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = Math.round(eased * target);

      if (isLarge) {
        el.textContent = current >= 1000
          ? Math.round(current / 1000) + 'K'
          : current.toString();
        if (progress >= 1) el.textContent = Math.round(target / 1000) + 'K';
      } else {
        el.textContent = current;
      }

      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    let counted = false;
    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !counted) {
        counted = true;
        document.querySelectorAll('.stat-num').forEach(el => {
          animateCounter(el, parseInt(el.dataset.target), 2200);
        });
      }
    }, { threshold: 0.3 }).observe(statsSection);
  }

  // ─── AI CHAT SIMULATION ────────────────────────────────────────
  const chatMessages = document.getElementById('chatMessages');
  const chatInput    = document.getElementById('chatInput');

  if (chatMessages) {
    const conversation = [
      { type: 'user', text: 'What is phishing?' },
      { type: 'ai',   text: 'Phishing is when someone poses as a trusted source — a bank, school, or government body — to trick you into sharing passwords or personal details. Always verify the sender\'s email before clicking any link.' },
      { type: 'user', text: 'How do I spot a deepfake?' },
      { type: 'ai',   text: 'Look for unnatural blinking, mismatched lip movements, or blurry edges around the face. If a video feels wrong — trust that instinct. You can verify suspicious videos using tools like InVID or Google\'s reverse image search.' },
      { type: 'user', text: 'Is public WiFi safe?' },
      { type: 'ai',   text: 'Public WiFi is risky. Attackers on the same network can intercept your data. Avoid banking or sharing passwords on public networks. A VPN encrypts your traffic and keeps you protected.' },
    ];

    let step = 0;

    function addTypingIndicator() {
      const el = document.createElement('div');
      el.className = 'typing-indicator';
      el.id = 'typingIndicator';
      el.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
      chatMessages.appendChild(el);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function removeTypingIndicator() {
      const el = document.getElementById('typingIndicator');
      if (el) el.remove();
    }

    function addMessage(type, text) {
      const el = document.createElement('div');
      el.className = `chat-msg ${type}`;
      el.innerHTML = `<p>${text}</p>`;
      el.style.opacity = '0';
      el.style.transform = 'translateY(10px)';
      chatMessages.appendChild(el);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      requestAnimationFrame(() => {
        el.style.transition = 'all 0.35s ease';
        el.style.opacity    = '1';
        el.style.transform  = 'translateY(0)';
      });
    }

    function runStep() {
      if (step >= conversation.length) {
        setTimeout(() => {
          chatMessages.innerHTML = '<div class="chat-msg ai"><p>Namaste! I\'m your Suraksha AI. Ask me anything about staying safe online.</p></div>';
          if (chatInput) chatInput.value = '';
          step = 0;
          setTimeout(runStep, 2000);
        }, 5000);
        return;
      }

      const current = conversation[step];

      if (current.type === 'user') {
        let i = 0;
        if (chatInput) chatInput.value = '';
        const interval = setInterval(() => {
          if (chatInput) chatInput.value += current.text[i];
          i++;
          if (i >= current.text.length) {
            clearInterval(interval);
            setTimeout(() => {
              addMessage('user', current.text);
              if (chatInput) chatInput.value = '';
              step++;
              setTimeout(runStep, 600);
            }, 400);
          }
        }, 48);
      } else {
        addTypingIndicator();
        const delay = 900 + current.text.length * 8;
        setTimeout(() => {
          removeTypingIndicator();
          addMessage('ai', current.text);
          step++;
          setTimeout(runStep, 2800);
        }, delay);
      }
    }

    const platformTeaser = document.querySelector('.platform-teaser');
    if (platformTeaser) {
      let started = false;
      new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          setTimeout(runStep, 1500);
        }
      }, { threshold: 0.4 }).observe(platformTeaser);
    }
  }

  // ─── ACTIVITY FEED ANIMATION ────────────────────────────────────
  const activityFeed = document.getElementById('activityFeed');
  if (activityFeed) {
    const activities = [
      '<strong>Meera Iyer</strong> from Bangalore earned her Surakshak badge',
      '<strong>Rahul Verma</strong> from Lucknow ran a workshop for 150 students',
      '<strong>Sneha Pillai</strong> from Trivandrum won the state Olympiad',
      '<strong>Aditya Kumar</strong> from Patna became a Surakshak Captain',
      '<strong>Divya Sharma</strong> from Jaipur mentored 20 new Surakshaks',
      '<strong>Rohan Mehta</strong> from Surat completed the full learning programme',
      '<strong>Pooja Nair</strong> from Kochi spoke at the national conclave',
      '<strong>Vijay Rao</strong> from Chennai created a viral awareness reel',
    ];

    const times = ['just now', '1 min ago', '3 min ago', '7 min ago', '11 min ago', '19 min ago', '24 min ago', '38 min ago'];

    let feedStarted = false;
    const feedSection = activityFeed.closest('section');

    if (feedSection) {
      new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !feedStarted) {
          feedStarted = true;
          setInterval(() => {
            const items    = activityFeed.querySelectorAll('.feed-item');
            const newItem  = document.createElement('div');
            newItem.className = 'feed-item';
            newItem.innerHTML = `
              <span class="feed-dot"></span>
              <span>${activities[Math.floor(Math.random() * activities.length)]}</span>
              <span class="feed-time">just now</span>
            `;
            newItem.style.opacity = '0';

            // Age existing times
            items.forEach((item, i) => {
              const timeEl = item.querySelector('.feed-time');
              if (timeEl && times[i + 1]) timeEl.textContent = times[i + 1];
            });

            activityFeed.insertBefore(newItem, activityFeed.firstChild);
            requestAnimationFrame(() => {
              newItem.style.transition = 'opacity 0.5s ease';
              newItem.style.opacity    = '1';
            });

            // Limit to 6 items
            const all = activityFeed.querySelectorAll('.feed-item');
            if (all.length > 6) all[all.length - 1].remove();
          }, 4000);
        }
      }, { threshold: 0.3 }).observe(feedSection);
    }
  }

  // ─── COUNTDOWN TIMER (Olympiad page) ────────────────────────────
  const countdownEl = document.getElementById('olympiadCountdown');
  if (countdownEl) {
    const targetDate = new Date('2025-08-15T00:00:00');
    function updateCountdown() {
      const now  = new Date();
      const diff = targetDate - now;
      if (diff <= 0) { countdownEl.innerHTML = '<span style="color:var(--accent-saffron);font-family:Space Grotesk,sans-serif;font-size:24px">Registration Closed</span>'; return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      const pad = n => String(n).padStart(2, '0');
      countdownEl.innerHTML = `
        <div class="countdown-unit"><div class="countdown-num">${pad(d)}</div><div class="countdown-unit-label">Days</div></div>
        <div class="countdown-sep">:</div>
        <div class="countdown-unit"><div class="countdown-num">${pad(h)}</div><div class="countdown-unit-label">Hours</div></div>
        <div class="countdown-sep">:</div>
        <div class="countdown-unit"><div class="countdown-num">${pad(m)}</div><div class="countdown-unit-label">Mins</div></div>
        <div class="countdown-sep">:</div>
        <div class="countdown-unit"><div class="countdown-num">${pad(s)}</div><div class="countdown-unit-label">Secs</div></div>
      `;
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // ─── TOPIC TABS (Platform page) ─────────────────────────────────
  document.querySelectorAll('.topic-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const group = tab.closest('[data-tab-group]') || document;
      group.querySelectorAll('.topic-tab').forEach(t => t.classList.remove('active'));
      group.querySelectorAll('.topic-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.target);
      if (target) target.classList.add('active');
    });
  });
  // Init first tab
  const firstTopicTab = document.querySelector('.topic-tab');
  if (firstTopicTab && !document.querySelector('.topic-tab.active')) firstTopicTab.click();

  // ─── FILTER TABS (Resources page) ───────────────────────────────
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.resource-group').forEach(g => g.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.filter);
      if (target) target.classList.add('active');
      else {
        // 'all' tab — show everything
        document.querySelectorAll('.resource-group').forEach(g => g.classList.add('active'));
      }
    });
  });
  const firstFilterTab = document.querySelector('.filter-tab');
  if (firstFilterTab) firstFilterTab.click();

  // ─── TIER SELECTOR (Partner page) ───────────────────────────────
  document.querySelectorAll('.tier-selector-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tier-selector-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tier-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.tier);
      if (target) target.classList.add('active');
    });
  });
  const firstTierTab = document.querySelector('.tier-selector-tab');
  if (firstTierTab && !document.querySelector('.tier-selector-tab.active')) firstTierTab.click();

  // ─── TIMELINE ANIMATION (Schools page) ──────────────────────────
  const timelineItems = document.querySelectorAll('.timeline-item');
  if (timelineItems.length) {
    const tlObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          tlObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    timelineItems.forEach(item => tlObserver.observe(item));
  }

  // ─── SCROLL REVEAL ──────────────────────────────────────────────
  const revealTargets = document.querySelectorAll(
    '.cert-card, .testimonial-card, .step, .partner-item, .threat-item, .reveal-card, .timeline-card, .tier-card, .track-card, .resource-card, .role-card, .prize-tier, .partner-type-card, .topic-item'
  );

  if (revealTargets.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          setTimeout(() => {
            el.style.opacity   = '1';
            el.style.transform = 'translateY(0)';
            el.classList.add('revealed');
          }, (i % 4) * 80);
          revealObserver.unobserve(el);
        }
      });
    }, { threshold: 0.12 });

    revealTargets.forEach(el => {
      if (!el.classList.contains('reveal-card')) {
        el.style.opacity   = '0';
        el.style.transform = 'translateY(22px)';
        el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
      }
      revealObserver.observe(el);
    });
  }

  try {
    initHomeGsap();
    initSisterPageMotion();
  } catch (err) {
    document.documentElement.classList.remove('js-home-anim');
    document.documentElement.classList.remove('js-page-anim');
  }

});
