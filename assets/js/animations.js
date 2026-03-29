const isMobile = window.matchMedia('(max-width: 768px)').matches;
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';

function scramble(el) {
  const original = el.dataset.original || el.textContent;
  el.dataset.original = original;
  let frame = 0;
  const totalFrames = 18;
  const interval = setInterval(() => {
    el.textContent = original.split('').map((ch, i) => {
      if (ch === ' ') return ' ';
      if (frame / totalFrames > i / original.length) return ch;
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    }).join('');
    frame++;
    if (frame > totalFrames) {
      el.textContent = original;
      clearInterval(interval);
    }
  }, 40);
}

const scrambleObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      scramble(e.target);
      scrambleObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.scramble').forEach(el => scrambleObserver.observe(el));

function countUp(el) {
  const target = parseFloat(el.dataset.count);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const isDecimal = target % 1 !== 0;
  const steps = 50;
  const interval = 1200 / steps;
  let step = 0;
  const timer = setInterval(() => {
    step++;
    const val = target * (step / steps);
    el.textContent = prefix + (isDecimal ? val.toFixed(2) : Math.round(val)) + suffix;
    if (step >= steps) {
      el.textContent = prefix + target + suffix;
      clearInterval(timer);
    }
  }, interval);
}

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && e.target.dataset.count) {
      countUp(e.target);
      countObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.8 });
document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.lang-fill').forEach(fill => {
        const w = fill.style.width;
        fill.style.width = '0%';
        setTimeout(() => {
          fill.style.transition = 'width 1s ease';
          fill.style.width = w;
        }, 100);
      });
      barObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
const langGrid = document.querySelector('.lang-grid');
if (langGrid) barObserver.observe(langGrid);

if (!isMobile) {
  const magnetTargets = document.querySelectorAll('.avatar-ring, .tag, .nav-link, .action-btn');
  document.addEventListener('mousemove', (e) => {
    magnetTargets.forEach(el => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 80;
      if (dist < maxDist) {
        const pull = (1 - dist / maxDist) * 6;
        el.style.transform = `translate(${dx * pull / dist}px, ${dy * pull / dist}px)`;
      } else {
        el.style.transform = '';
      }
    });
  });
}

if (!isMobile) {
  const sidebarInner = document.querySelector('.sidebar-inner');
  window.addEventListener('scroll', () => {
    sidebarInner.style.transform = `translateY(${window.scrollY * 0.08}px)`;
  }, { passive: true });
}

const nameLast = document.querySelector('.name-last');
if (nameLast) {
  nameLast.style.opacity = '0';
  nameLast.style.transition = 'none';
  setTimeout(() => {
    nameLast.style.transition = 'opacity 0.4s ease';
    nameLast.style.opacity = '1';
    scramble(nameLast);
  }, 400);
}
