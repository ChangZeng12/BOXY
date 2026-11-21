// Shared behaviour for both pages: scaling, menu, reveals, buttons, marquee, footer, home-page bits.
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const root = document.documentElement;

// The design is a fixed 1440px canvas; scale it to the viewport.
// shortcut: desktop-only layout (phones get a shrunken desktop page), build the Figma mobile frames when mobile matters.
// Up to 1440 the page scales 1:1 with the viewport; beyond that it grows gently (capped at 1.2×) and
// the extra width becomes gutters that section backgrounds bleed into: --w page width, --g gutter, --k width ratio.
const fit = () => {
  const r = root.clientWidth / 1440, s = r <= 1 ? r : Math.min(1.2, 1 + (r - 1) * .35), w = Math.max(1440, root.clientWidth / s);
  [['--s', s], ['--w', w], ['--g', (w - 1440) / 2], ['--k', w / 1440]].forEach(([k, v]) => root.style.setProperty(k, v));
};
fit();
addEventListener('resize', fit);

// Button labels roll on hover — wrap the text once, and expose setLabel for labels that change.
function setLabel(btn, text) {
  btn.innerHTML = `<span class="roll" data-t="${text}"><i>${text}</i></span>`;
}
$$('.btn, .pill').forEach(b => setLabel(b, b.textContent.trim()));

// Menu
const menuBtn = $('.nav-menu');
const toggleMenu = open => {
  root.classList.toggle('menu-open', open);
  menuBtn.setAttribute('aria-expanded', open);
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  $('.menu').inert = !open;
};
toggleMenu(false);
menuBtn.addEventListener('click', () => toggleMenu(!root.classList.contains('menu-open')));
addEventListener('keydown', e => e.key === 'Escape' && toggleMenu(false));
$$('.menu a').forEach((a, i) => { a.style.setProperty('--i', i); a.addEventListener('click', () => toggleMenu(false)); });

// Headline words rise in one by one
$$('[data-words]').forEach(el => {
  let i = 0;
  const walk = node => [...node.childNodes].forEach(n => {
    if (n.nodeType === 3) {
      const frag = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach(part => {
        if (!part.trim()) return frag.append(part);
        const w = Object.assign(document.createElement('span'), { className: 'w', textContent: part });
        w.style.setProperty('--i', i++);
        frag.append(w);
      });
      n.replaceWith(frag);
    } else if (n.nodeName !== 'BR') walk(n);
  });
  walk(el);
});

// Scroll reveal (siblings stagger via --i)
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .2 });
function reveal(els) {
  els.forEach(el => {
    if (el.classList.contains('rv')) el.style.setProperty('--i', [...el.parentElement.children].filter(c => c.classList.contains('rv')).indexOf(el));
    io.observe(el);
  });
}
reveal($$('.rv, [data-words], .strip'));
$$('.strip a').forEach((a, i, all) => a.style.setProperty('--i', all.length - 1 - i));

// A little burst of hand-drawn stars, used for "it worked" moments
function burst(host, x, y, src = 'assets/about-star-1.svg', n = 9) {
  for (let i = 0; i < n; i++) {
    const s = Object.assign(new Image(), { src, className: 'burst', alt: '' });
    s.style.cssText = `left:${x - 18}px;top:${y - 17}px`;
    host.append(s);
    const a = (i / n) * Math.PI * 2 + Math.random() * .5, d = 80 + Math.random() * 90;
    s.animate([
      { transform: 'translate(0,0) scale(.2) rotate(0deg)', opacity: 1 },
      { transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d}px) scale(${.6 + Math.random() * .7}) rotate(${Math.random() * 240 - 120}deg)`, opacity: 1, offset: .6 },
      { transform: `translate(${Math.cos(a) * d * 1.15}px, ${Math.sin(a) * d * 1.15 + 30}px) scale(.3) rotate(${Math.random() * 360}deg)`, opacity: 0 },
    ], { duration: 900 + Math.random() * 400, easing: 'cubic-bezier(.2,.7,.3,1)' }).onfinish = () => s.remove();
  }
}

// Marquee: build the repeating strip, slow it down on hover
const mq = $('.marquee');
if (mq) {
  const unit = `<div class="mq-star"><img src="assets/mq-star.svg" alt=""></div><span>Unboxed</span><img class="mq-spark" src="assets/mq-spark.svg" alt=""><div class="mq-logo"><img src="assets/mq-logo.svg" alt=""></div>`;
  const group = `<div class="mq-group">${unit.repeat(10)}</div>`;
  mq.innerHTML = `<div class="mq-track">${group}${group}</div>`;
  const anim = () => $('.mq-track', mq).getAnimations()[0];
  mq.addEventListener('mouseenter', () => anim()?.updatePlaybackRate(.2));
  mq.addEventListener('mouseleave', () => anim()?.updatePlaybackRate(1));
}

// Footer subscribe (front-end only — nothing is sent anywhere)
const sub = $('.subscribe');
sub.addEventListener('submit', e => {
  e.preventDefault();
  const input = $('input', sub);
  if (!input.value.trim() || !input.validity.valid) {
    sub.classList.remove('bad'); void sub.offsetWidth; sub.classList.add('bad');
    return input.focus();
  }
  sub.classList.remove('bad');
  sub.classList.add('done');
  const f = $('.subscribe-field', sub);
  f.style.overflow = 'visible';
  burst(f, f.offsetWidth - 40, f.offsetHeight / 2);
  setTimeout(() => (f.style.overflow = ''), 1400);
});

// ── Home page ──
const heroHome = $('.hero-home');
if (heroHome) {
  heroHome.addEventListener('pointermove', e => {
    heroHome.style.setProperty('--mx', (e.clientX / innerWidth - .5).toFixed(3));
    heroHome.style.setProperty('--my', (e.clientY / innerHeight - .5).toFixed(3));
  });
  heroHome.addEventListener('pointerleave', () => { heroHome.style.setProperty('--mx', 0); heroHome.style.setProperty('--my', 0); });
}

const track = $('.res-track');
if (track) {
  const [prev, next] = $$('.res-arrows button');
  const step = () => track.firstElementChild.offsetWidth + 24;
  const sync = () => {
    prev.disabled = track.scrollLeft < 4;
    next.disabled = track.scrollLeft > track.scrollWidth - track.clientWidth - 4;
  };
  prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
  track.addEventListener('scroll', sync, { passive: true });
  sync();
  const all = $('#viewAll');
  all.addEventListener('click', () => {
    const on = track.classList.toggle('all');
    setLabel(all, on ? 'Show Less' : 'View All');
    $('.res-arrows').style.visibility = on ? 'hidden' : '';
    sync();
  });
}
