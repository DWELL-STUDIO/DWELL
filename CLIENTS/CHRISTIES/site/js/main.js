/* =============================================================
   LENIS — Smooth scroll
============================================================= */
const lenis = new Lenis({
  duration:    1.2,
  easing:      t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

gsap.registerPlugin(ScrollTrigger);

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

/* =============================================================
   NAV — glass on scroll
============================================================= */
ScrollTrigger.create({
  start:       'top -60',
  onEnter:     () => document.querySelector('.nav-pill').classList.add('scrolled'),
  onLeaveBack: () => document.querySelector('.nav-pill').classList.remove('scrolled'),
});

/* =============================================================
   HERO — entrance
============================================================= */
const heroTl = gsap.timeline({ delay: 0.15 });

heroTl
  .to('.hero-title', {
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity:  1,
    duration: 1.2,
    ease:     'power4.out',
  })
  .to('.hero-location', {
    opacity:   1,
    y:         0,
    duration:  0.9,
    ease:      'power3.out',
  }, '-=0.55')
  .to('.hero-price', {
    opacity:   1,
    y:         0,
    duration:  0.9,
    ease:      'power3.out',
  }, '-=0.75');

/* =============================================================
   HERO — parallax on scroll
============================================================= */
gsap.to('.hero-bg', {
  yPercent: 20,
  ease:     'none',
  scrollTrigger: {
    trigger: '#hero',
    start:   'top top',
    end:     'bottom top',
    scrub:   1.2,
  },
});

/* =============================================================
   SECTION LABELS — reveal
============================================================= */
gsap.utils.toArray('.section-label').forEach(el => {
  gsap.to(el, {
    opacity:  1,
    y:        0,
    duration: 0.7,
    ease:     'power3.out',
    scrollTrigger: {
      trigger: el,
      start:   'top 88%',
    },
  });
});

/* =============================================================
   SPEC NUMBERS — count-up
============================================================= */
document.querySelectorAll('.spec-num[data-target]').forEach(el => {
  const target = parseInt(el.dataset.target, 10);

  ScrollTrigger.create({
    trigger: el,
    start:   'top 85%',
    once:    true,
    onEnter: () => {
      gsap.to({ val: 0 }, {
        val:       target,
        duration:  1.5,
        ease:      'power2.out',
        onUpdate:  function () {
          el.textContent = Math.round(this.targets()[0].val);
        },
      });
    },
  });
});

/* =============================================================
   GALLERY — staggered reveal
============================================================= */
gsap.to('.gi', {
  opacity:   1,
  y:         0,
  scale:     1,
  duration:  0.9,
  ease:      'power3.out',
  stagger:   0.08,
  scrollTrigger: {
    trigger: '.gallery-grid',
    start:   'top 78%',
  },
});

/* =============================================================
   STORY QUOTE — clip-path wipe
============================================================= */
gsap.to('.story-quote', {
  clipPath: 'inset(0% 0% 0% 0%)',
  opacity:  1,
  duration: 1.1,
  ease:     'power3.out',
  scrollTrigger: {
    trigger: '.story-quote',
    start:   'top 80%',
  },
});

/* =============================================================
   STORY PARAGRAPHS — stagger fade-up
============================================================= */
gsap.utils.toArray('.story-p').forEach((p, i) => {
  gsap.to(p, {
    opacity:  1,
    y:        0,
    duration: 0.85,
    ease:     'power3.out',
    delay:    i * 0.1,
    scrollTrigger: {
      trigger: p.closest('div'),
      start:   'top 78%',
    },
  });
});

/* =============================================================
   MAP — fade up
============================================================= */
gsap.to('.map-ph', {
  opacity:  1,
  y:        0,
  duration: 1.0,
  ease:     'power3.out',
  scrollTrigger: {
    trigger: '.map-ph',
    start:   'top 80%',
  },
});

/* =============================================================
   AGENT CARD — fade up
============================================================= */
gsap.to('.agent-outer', {
  opacity:  1,
  y:        0,
  duration: 1.0,
  ease:     'power3.out',
  scrollTrigger: {
    trigger: '.agent-outer',
    start:   'top 80%',
  },
});

/* =============================================================
   ACCORDION
============================================================= */
document.querySelectorAll('.acc-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const item   = toggle.closest('.acc-item');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.acc-item.open').forEach(open => {
      open.classList.remove('open');
    });

    // Open if was closed
    if (!isOpen) item.classList.add('open');
  });
});
