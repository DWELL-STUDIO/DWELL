/* ─────────────────────────────────────────────────────────────
   DWELL — Villa Caturia, Lasne
   ───────────────────────────────────────────────────────────── */

gsap.registerPlugin(ScrollTrigger);

/* ── CURSOR ──────────────────────────────────────────────────── */
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', e => {
  gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.12, ease: 'none' });
});

document.addEventListener('mouseleave', () => cursor.classList.add('hidden'));
document.addEventListener('mouseenter', () => cursor.classList.remove('hidden'));

document.querySelectorAll('a, button, .cta-btn').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
});

/* ── PRELOADER ───────────────────────────────────────────────── */
const preloader = document.getElementById('preloader');

const preTl = gsap.timeline({
  onComplete: () => {
    preloader.style.display = 'none';
    initScrollAnimations();
  }
});

preTl
  .to('.pre-title', {
    y: 0, opacity: 1,
    duration: 1.2,
    ease: 'power3.out',
    delay: 0.2
  })
  .to('.pre-location', {
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out'
  }, '-=0.7')
  .to('.pre-bar', {
    scaleX: 1,
    duration: 1.6,
    ease: 'power3.inOut'
  }, '-=0.5')
  .to(preloader, {
    opacity: 0,
    duration: 0.9,
    ease: 'power2.inOut'
  })
  .from('.hero-eyebrow', {
    y: 20, opacity: 0,
    duration: 0.9,
    ease: 'power3.out'
  }, '-=0.2')
  .from('.hero-title', {
    y: 48, opacity: 0,
    duration: 1.2,
    ease: 'power3.out'
  }, '-=0.7')
  .from('.hero-caption', {
    opacity: 0,
    duration: 1.2,
    ease: 'power2.out'
  }, '-=0.6');

/* ── DAY / NIGHT TOGGLE ──────────────────────────────────────── */
const dnToggle = document.getElementById('dn-toggle');
const dnLabel  = document.getElementById('dn-label');
let isNight = false;

dnToggle.addEventListener('click', () => {
  isNight = !isNight;
  document.body.classList.toggle('night', isNight);
  dnLabel.textContent = isNight ? 'DAY' : 'NIGHT';
});

/* ── HERO PARALLAX ───────────────────────────────────────────── */
gsap.to('.hero-media', {
  yPercent: 18,
  ease: 'none',
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1.2
  }
});

/* ── IMAGE FRAME PARALLAX ────────────────────────────────────── */
/* Each full-screen frame gets the same parallax treatment */
document.querySelectorAll('.img-frame').forEach(frame => {
  const media = frame.querySelector('.frame-media');
  if (!media) return;

  gsap.to(media, {
    yPercent: 16,
    ease: 'none',
    scrollTrigger: {
      trigger: frame,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.4
    }
  });

  /* subtle footer text reveal as frame enters viewport */
  const footer = frame.querySelector('.frame-footer');
  if (footer) {
    gsap.from(footer.children, {
      y: 14, opacity: 0,
      stagger: 0.08,
      duration: 1.0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: frame,
        start: 'top 70%',
        once: true
      }
    });
  }
});

/* ── SCROLL ANIMATIONS ───────────────────────────────────────── */
function initScrollAnimations() {

  gsap.utils.toArray('.reveal-text').forEach(el => {
    gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
      }
    });
  });

  gsap.utils.toArray('.reveal-clip').forEach(el => {
    gsap.to(el, {
      clipPath: 'inset(0 0 0% 0)',
      duration: 1.3,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
      }
    });
  });

  /* story image subtle parallax */
  const storyImg = document.querySelector('.story-image img');
  if (storyImg) {
    gsap.to(storyImg, {
      yPercent: -8,
      scale: 1.0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.story-image',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      }
    });
  }

  /* spec rows stagger */
  gsap.utils.toArray('.specs-col').forEach((col, i) => {
    gsap.from(col.querySelectorAll('.spec-row'), {
      y: 16, opacity: 0,
      stagger: 0.07,
      duration: 0.7,
      ease: 'power3.out',
      delay: i * 0.06,
      scrollTrigger: {
        trigger: col,
        start: 'top 82%'
      }
    });
  });

  /* location distances stagger */
  gsap.from('.distance-row', {
    y: 12, opacity: 0,
    stagger: 0.08,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.distances',
      start: 'top 82%'
    }
  });

  /* plan rows stagger */
  gsap.from('.plan-row', {
    y: 14, opacity: 0,
    stagger: 0.06,
    duration: 0.75,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.plan-rooms',
      start: 'top 80%'
    }
  });

  gsap.from('.plan-canvas', {
    opacity: 0, x: 24,
    duration: 1.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.plan-canvas',
      start: 'top 82%'
    }
  });
}

/* ── FLOOR PLAN IMAGE FALLBACK ───────────────────────────────── */
const planImg    = document.getElementById('plan-img');
const planCanvas = planImg && planImg.closest('.plan-canvas');

if (planImg) {
  planImg.addEventListener('load', () => {
    if (planCanvas) planCanvas.classList.add('has-image');
  });
  planImg.addEventListener('error', () => {
    planImg.style.display = 'none';
  });
  if (planImg.complete && planImg.naturalWidth > 0 && planCanvas) {
    planCanvas.classList.add('has-image');
  }
}

/* ── NAV SCROLL BEHAVIOUR ────────────────────────────────────── */
let lastScrollY = 0;

ScrollTrigger.create({
  start: 0,
  end: 'max',
  onUpdate: () => {
    const nav = document.getElementById('nav');
    if (!nav) return;
    const scrollY = window.scrollY;
    if (scrollY > lastScrollY + 60 && scrollY > 200) {
      gsap.to(nav, { yPercent: -110, duration: 0.4, ease: 'power2.in' });
    } else if (scrollY < lastScrollY - 20 || scrollY < 100) {
      gsap.to(nav, { yPercent: 0, duration: 0.4, ease: 'power2.out' });
    }
    lastScrollY = scrollY;
  }
});

/* ── KEYBOARD SHORTCUTS ──────────────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'n' || e.key === 'N') { dnToggle.click(); }
});
