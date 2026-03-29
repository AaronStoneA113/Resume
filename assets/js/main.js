(function () {
  const u = 'abhishekroy.1599';
  const d = 'gmail.com';
  const e = u + '\u0040' + d;
  const link = document.getElementById('email-link');
  const display = document.getElementById('email-display');
  const footer = document.getElementById('footer-email');
  if (link) link.href = 'mailto:' + e;
  if (display) display.textContent = e;
  if (footer) footer.textContent = e;
})();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const navLinks = document.querySelectorAll('.nav-link');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const a = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
      if (a) a.classList.add('active');
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));

let isLight = false;
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
  isLight = !isLight;
  document.body.classList.toggle('light', isLight);
  themeBtn.querySelector('.icon-moon').style.display = isLight ? 'none' : 'block';
  themeBtn.querySelector('.icon-sun').style.display = isLight ? 'block' : 'none';
  themeBtn.querySelector('.action-label').textContent = isLight ? 'Dark Mode' : 'Light Mode';
});

window.addEventListener('beforeprint', () => {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
});
