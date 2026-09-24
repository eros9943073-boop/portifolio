const intro = document.querySelector('#intro');
const nav = document.querySelector('#nav');
const menuButton = document.querySelector('#menuButton');

setTimeout(() => {
  intro?.remove();
}, 3400);

document.querySelectorAll('[data-scroll]').forEach((button) => {
  button.addEventListener('click', () => {
    const target = document.getElementById(button.dataset.scroll);
    target?.scrollIntoView({ behavior: 'smooth' });
    nav?.classList.remove('nav-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('nav-open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? '×' : '☰';
});

document.querySelector('#contactForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = document.querySelector('#formMessage');
  message.textContent = 'Mensagem preparada. Obrigado pelo contato!';
  event.currentTarget.reset();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 760) {
    nav?.classList.remove('nav-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    if (menuButton) menuButton.textContent = '☰';
  }
});
