// Share page: notebook ⇄ typewriter, the typewriter's mechanics, the two-step form, featured stories.
// Uses $, $$, setLabel, burst and io from main.js. Front-end only: a submitted story lives in memory until reload.
const hero = $('#hero'), cta = $('#cta'), book = $('#book'), sheet = $('#sheet'), twIn = $('.tw-in');
const replay = (el, cls) => { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); };

/* ───── stories in the notebook ───── */
const P1 = 'Lorem ipsum dolor sit amet consectetur. Elementum magnis pulvinar ut tellus tincidunt est placerat dolor. Ullamcorper facilisis blandit etiam nullam ipsum orci leo mattis purus. A hendrerit condimentum quam enim augue ac. Ut non aliquam maecenas magnis at odio quam. Aliquet sed arcu nunc sed sed. Odio tortor euismod mauris amet vitae varius sodales vitae massa. Blandit habitasse in nunc amet tristique. Sollicitudin senectus nisl ullamcorper nullam purus. Amet nam arcu purus nam mattis velit platea sed viverra. Enim eu sit fames diam purus elementum. Tincidunt sed risus odio morbi vel dolor adipiscing. Congue lacus luctus sed nulla. Tincidunt ornare et molestie turpis id at. Malesuada amet faucibus bibendum sit gravida sit adipiscing mi.';
const P2 = 'Pretium dignissim dolor commodo viverra. Mi magna lorem imperdiet diam bibendum accumsan egestas. Mauris ut vestibulum urna est nisl posuere. Pulvinar amet accumsan risus maecenas in neque tempor maecenas. Velit id odio quisque tortor. Feugiat posuere amet quisque pellentesque dolor enim. Neque risus mauris proin ac at imperdiet enim quam.';
const stories = [
  { id: 'dani', title: 'Dani’s story', body: [P1, P2], photos: ['assets/photo-flowers.jpg', 'assets/photo-friends.jpg'] },
  { id: 'kat', title: 'Kat’s story', body: [P2, P1], photos: ['assets/strip-3.jpg', 'assets/photo-flowers.jpg'] },
  { id: 'brandon', title: 'Brandon’s story', body: [P1.slice(0, 420) + '.', P2], photos: ['assets/strip-2.jpg', 'assets/strip-4.jpg'] },
];
let current = 0;
const pols = [$('#polA'), $('#polB')];

function render(i) {
  const s = stories[current = i];
  $('#storyTitle').textContent = s.title;
  $('#storyBody').replaceChildren(...s.body.map(t => Object.assign(document.createElement('p'), { textContent: t })));
  pols.forEach((p, k) => {
    p.hidden = !s.photos[k];
    if (s.photos[k]) $('.pol-photo img', p).src = s.photos[k];
  });
}

function turn(i, dir = 1) {
  i = (i + stories.length) % stories.length;
  if (i === current || book.classList.contains('turning')) return;
  book.classList.add('turning');
  const [from, to] = dir > 0 ? [0, -180] : [-180, 0];
  $('.book-flip').animate(
    [{ transform: `rotateY(${from}deg)`, opacity: 1 }, { transform: `rotateY(${to}deg)`, opacity: 1 }],
    { duration: 760, easing: 'cubic-bezier(.6,0,.3,1)' }
  ).onfinish = () => book.classList.remove('turning');
  setTimeout(() => {
    render(i);
    pols.forEach((p, k) => p.animate([{ scale: .7, opacity: 0 }, { scale: 1, opacity: 1 }], { duration: 450, delay: k * 90, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'backwards' }));
  }, 340);
}
$('.book-nav.prev').addEventListener('click', () => turn(current - 1, -1));
$('.book-nav.next').addEventListener('click', () => turn(current + 1, 1));
book.addEventListener('keydown', e => { if (e.key === 'ArrowRight') turn(current + 1, 1); if (e.key === 'ArrowLeft') turn(current - 1, -1); });

/* ───── sound (synthesised, so no audio files) ───── */
let ac, soundOn = true;
function audio() {
  if (!soundOn) return null;
  try { ac ||= new AudioContext(); ac.state === 'suspended' && ac.resume(); } catch { return null; }
  return ac;
}
function noise(dur, freq, vol) {
  const a = audio(); if (!a) return;
  const len = a.sampleRate * dur, buf = a.createBuffer(1, len, a.sampleRate), d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 3;
  const src = a.createBufferSource(), f = a.createBiquadFilter(), g = a.createGain();
  src.buffer = buf; f.type = 'bandpass'; f.frequency.value = freq; f.Q.value = 1.2; g.gain.value = vol;
  src.connect(f).connect(g).connect(a.destination); src.start();
}
const clack = () => noise(.05, 1300 + Math.random() * 700, .55);
const tick = () => noise(.02, 3600, .16);
const ratchet = () => [0, 70, 140, 210, 280].forEach(t => setTimeout(tick, t));
function ding() {
  const a = audio(); if (!a) return;
  const o = a.createOscillator(), g = a.createGain(), t = a.currentTime;
  o.frequency.value = 2093; g.gain.setValueAtTime(.18, t); g.gain.exponentialRampToValueAtTime(.0001, t + 1.1);
  o.connect(g).connect(a.destination); o.start(t); o.stop(t + 1.2);
}
const snd = $('#snd');
snd.addEventListener('click', () => { soundOn = !soundOn; snd.setAttribute('aria-pressed', soundOn); clack(); });

/* ───── typebars: one swings up from the basket and strikes for every character ───── */
// Geometry is in the typewriter stage's own 1438×1654 px space, measured off the photo:
// the slotted segment is an ellipse around (768,652); the print point sits at (766,636).
const KEYS = "1qaz2wsx3edc4rfv5tgb6yhn7ujm8ik,9ol.0p;/-['=]";
const bars = $('#typebars'), hitEl = $('#hit');
function strike(ch = '') {
  const k = KEYS.indexOf(ch.toLowerCase());
  const u = k < 0 ? Math.random() : k / (KEYS.length - 1);          // where across the basket this key's bar lives
  const th = (u * 2 - 1) * 62 * Math.PI / 180;
  const px = 768 + 150 * Math.sin(th), py = 652 + 122 * Math.cos(th); // pivot on the segment
  const dx = 766 - px, dy = 636 - py;
  const rot = Math.atan2(dy, dx) * 180 / Math.PI + 90;                // at rest the bar points away from the print point
  const bar = document.createElement('i');
  bar.className = 'typebar';
  bar.style.cssText = `left:${px}px;top:${py}px;height:${Math.hypot(dx, dy)}px`;
  bars.append(bar);
  const at = deg => `rotate(${rot}deg) rotateX(${deg}deg)`;
  bar.animate([
    { transform: at(50), opacity: 0, easing: 'ease-in' },
    { transform: at(95), opacity: 1, offset: .16, easing: 'ease-in' },
    { transform: at(180), opacity: 1, offset: .42 },
    { transform: at(180), opacity: 1, offset: .5, easing: 'ease-out' },
    { transform: at(60), opacity: 0 },
  ], { duration: 240 }).onfinish = () => bar.remove();
  setTimeout(hit, 100);
}
function hit() {
  clack();
  twIn.animate([{ transform: 'none' }, { transform: `translate(${Math.random() * 2 - 1}px, 1.8px)` }, { transform: 'none' }], { duration: 90 });
  hitEl.animate([{ opacity: .9, transform: 'scale(.4)' }, { opacity: 0, transform: 'scale(1.6)' }], { duration: 240, easing: 'ease-out' });
}
const nudge = (x, y, ms) => steps[step].animate([{ translate: '0 0' }, { translate: `${x}px ${y}px` }, { translate: '0 0' }], { duration: ms, easing: 'ease-out' });
const lineFeed = () => { tick(); setTimeout(tick, 60); nudge(0, -3, 180); };
const carriageReturn = () => { ding(); nudge(-12, 0, 320); };

/* ───── form ───── */
const els = sheet.elements, text = ['name', 'email', 'title', 'story'].map(n => els[n]);
const next = $('#next'), submit = $('#submit'), file = $('#file'), photo = $('#photo'), upload = $('#upload');
const steps = $$('.step', sheet);
let step = 0, photoUrl = null;

function go(n, quiet) {
  step = n;
  steps.forEach((el, i) => { el.classList.toggle('is-active', i === n); el.classList.toggle('is-past', i < n); el.inert = i !== n; });
  quiet || ratchet();   // the platen ratchets as the paper feeds
}
function check() {
  text.forEach(f => f.closest('.field').classList.toggle('filled', !!f.value.trim()));
  next.disabled = !text.every(f => f.value.trim() && f.validity.valid);
}
function resetForm() {
  sheet.reset();
  photoUrl = null; photo.hidden = true; photo.removeAttribute('src');
  upload.classList.remove('has-photo'); $('#uploadText').textContent = 'Upload Image';
  submit.disabled = true;
  go(0, true); check();
}

sheet.addEventListener('input', e => {
  if (e.target === file) return;
  check();
  const type = e.inputType || 'insertText';
  if (type.startsWith('delete')) return tick();
  if (type === 'insertLineBreak') return carriageReturn();
  const data = e.data || ' ';
  for (let i = 0; i < Math.min(data.length, 6); i++) setTimeout(strike, i * 45, data[i]);   // pasted text rattles off a few bars
});
sheet.addEventListener('focusin', e => e.target.closest('.field') && lineFeed());
sheet.addEventListener('submit', e => { e.preventDefault(); if (step === 0 && !next.disabled) go(1); });

file.addEventListener('change', () => {
  const f = file.files[0];
  if (!f) return;
  if (!f.type.startsWith('image/')) return void ($('#uploadText').textContent = 'Images only, please');
  photoUrl = URL.createObjectURL(f);
  photo.src = photoUrl; photo.hidden = false;
  replay(photo, 'dev'); replay(upload, 'stuck');
  upload.classList.add('has-photo'); $('#uploadText').textContent = 'Replace';
  submit.disabled = false;
  noise(.12, 900, .5);   // shutter
});
['dragenter', 'dragover'].forEach(t => upload.addEventListener(t, () => upload.classList.add('over')));
['dragleave', 'drop'].forEach(t => upload.addEventListener(t, () => upload.classList.remove('over')));

submit.addEventListener('click', () => {
  const first = els.name.value.trim().split(/\s+/)[0];
  stories.push({ id: 'you', title: `${first}’s story`, body: [els.title.value.trim(), ...els.story.value.trim().split(/\n{2,}/)], photos: [photoUrl] });
  go(2);
  setTimeout(() => { ding(); burst(twIn, 793, 300, 'assets/book-star-1.svg', 12); }, 500);
});
$('#back').addEventListener('click', () => {
  setMode('read');
  setTimeout(turn, 1100, stories.length - 1);   // open the notebook on the story you just wrote
});

/* ───── notebook ⇄ typewriter ───── */
function setMode(mode) {
  const top = hero.getBoundingClientRect().top + scrollY;
  const s = +getComputedStyle(document.documentElement).getPropertyValue('--s') || 1;
  scrollTo({ top: top + (mode === 'write' ? 96 * s : 0), behavior: 'smooth' });
  if (hero.dataset.mode === mode) return;
  hero.dataset.mode = mode;
  setLabel(cta, mode === 'write' ? 'Read other stories' : 'Share your story');
  book.inert = mode === 'write';
  sheet.inert = mode !== 'write';
  if (mode === 'write') {
    ratchet();
    setTimeout(() => step === 0 && els.name.focus({ preventScroll: true }), 1250);
  } else if (step === 2) setTimeout(resetForm, 1100);
}
cta.addEventListener('click', () => setMode(hero.dataset.mode === 'read' ? 'write' : 'read'));
$('#twOpen').addEventListener('click', () => setMode('write'));
$$('.js-share').forEach(a => a.addEventListener('click', e => { e.preventDefault(); setMode('write'); }));
$$('.js-read').forEach(a => a.addEventListener('click', e => { e.preventDefault(); setMode('read'); }));

/* ───── featured stories ───── */
const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
const feats = [
  ['strip-1.jpg', 'a second chance at happiness'], ['strip-2.jpg', 'learning to ask for help'], ['strip-3.jpg', 'the small things that healed me'],
  ['strip-4.jpg', 'after the storm passed'], ['strip-5.jpg', 'the friends who stayed'], ['photo-friends.jpg', 'unboxing the quiet years'],
];
const grid = $('#grid'), more = $('#more');
function addCards(n) {
  for (let k = 0; k < n; k++) {
    const i = grid.children.length, [img, title] = feats[i % feats.length];
    const a = Object.assign(document.createElement('a'), { className: 'card rv', href: '#hero' });
    a.innerHTML = `<div class="card-img"><img loading="lazy" src="assets/${img}" alt=""></div><div class="card-txt"><p class="card-title">${title}</p><p>${LOREM}</p></div>`;
    a.style.setProperty('--i', k % 3);
    a.addEventListener('click', e => { e.preventDefault(); setMode('read'); turn(i % 3, 1); });
    grid.append(a);
    io.observe(a);
  }
}
addCards(6);
more.addEventListener('click', () => {
  addCards(3);
  if (grid.children.length >= 12) { more.disabled = true; setLabel(more, 'You’re all caught up'); more.style.opacity = .4; }
});

/* ───── start ───── */
render(0);
sheet.inert = true;
go(0, true);
const hash = location.hash.slice(1), wanted = stories.findIndex(s => s.id === hash);
if (wanted > 0) render(wanted);
if (hash === 'write') setTimeout(setMode, 900, 'write');
