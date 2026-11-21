// Resource articles: one data source for the home-page cards and the blog page (article.html?id=…).
// Loaded before main.js so the cards/headline exist when reveals and word-splitting are set up.
// Copy is placeholder text written for this prototype — not medical advice. Photos: Unsplash (free licence).
// Block types in `body`: p, h2, quote, list (array), note (handwritten margin aside).
const ARTICLES = [
  {
    id: 'gen-z-resources', src: 'Boxy Guides', title: 'Mental health resources for gen z', mins: 4, date: 'March 2025',
    img: 'res-genz.jpg', alt: 'A circle of friends looking down at the camera under a cloudy blue sky', credit: 'tannnpro',
    dek: 'Where to start when you know you need something, but you’re not sure what.',
    body: [
      ['p', 'Most of us were told to “reach out” without ever being told to whom, or how, or what happens after. So here’s the map we wish we’d had: the kinds of support that exist, what each one is good for, and how to take a first step that doesn’t feel like jumping off a cliff.'],
      ['h2', 'Start with the smallest door'],
      ['p', 'You don’t have to begin with the biggest, scariest option. Support comes in sizes. A message to one friend counts. Reading someone else’s story and thinking “oh — me too” counts. The point of a first step is only to make the second one easier.'],
      ['note', 'small counts.'],
      ['list', [
        'Someone you already trust — a friend, sibling, teacher or coach who listens more than they fix.',
        'School or campus counselling — usually free, usually closer than you think.',
        'Your regular doctor — a good first stop if sleep, appetite or energy have changed.',
        'Peer communities — places like this one, where people share what it’s actually like.',
        'A crisis line — for the moments that can’t wait until morning.',
      ]],
      ['quote', 'You’re allowed to ask for help before it becomes an emergency.'],
      ['h2', 'How to choose'],
      ['p', 'Ask yourself what you need right now: to be heard, to understand what’s going on, or to be safe tonight. Being heard is what friends and peers are for. Understanding is where a counsellor or doctor comes in. Safety is what crisis lines exist for — and using one is never an overreaction.'],
      ['p', 'Whatever you pick, it’s fine if the first try isn’t the right fit. That’s information, not failure. Try the next door.'],
    ],
  },
  {
    id: 'say-it-out-loud', src: 'Boxy Journal', title: 'How to say the thing out loud', mins: 5, date: 'February 2025',
    img: 'res-talk.jpg', alt: 'Two friends sitting side by side on the grass, seen from behind, looking at the water', credit: 'juli_ivanina',
    dek: 'The first sentence is the hardest. Here are a few ways to get it out of your mouth.',
    body: [
      ['p', 'There’s a particular kind of quiet that happens right before you tell someone something real. Your heart does the thing. You consider talking about literally anything else. This piece is for that moment.'],
      ['h2', 'Borrow a first line'],
      ['p', 'You don’t need a speech. You need one sentence that opens the door, and you’re allowed to borrow it. A few that have worked for people in this community:'],
      ['list', [
        '“Can I tell you something I’ve been carrying for a while?”',
        '“I don’t need you to fix it. I just need you to know.”',
        '“I’ve been acting fine and I’m not, actually.”',
        '“This is hard to say, so I might say it badly.”',
      ]],
      ['note', 'steal these.'],
      ['h2', 'Pick the setting, not the script'],
      ['p', 'Side by side is easier than face to face. Walks, car rides, washing up, sitting on a wall looking at the same view — anything where you don’t have to hold eye contact. And text is allowed. Typing it out first is not cheating; it’s a draft.'],
      ['quote', 'Saying it badly still counts as saying it.'],
      ['p', 'If it doesn’t land the way you hoped, that says something about the moment, not about whether your feelings are real. You can try again, with them or with someone else. The words get lighter each time they leave you.'],
    ],
  },
  {
    id: 'what-burnout-feels-like', src: 'Community Notes', title: 'What burnout actually feels like', mins: 4, date: 'January 2025',
    img: 'res-burnout.jpg', alt: 'Someone lying face down in a bright unmade bed', credit: 'all_who_wander',
    dek: 'It isn’t always dramatic. Sometimes it’s just a Tuesday you can’t get up from.',
    body: [
      ['p', 'We asked the community to describe burnout without using the word “tired”. Nobody said they collapsed. Almost everyone said it crept in so slowly they mistook it for their personality.'],
      ['h2', 'In your words'],
      ['list', [
        '“Like my battery says 40% but shuts off anyway.”',
        '“I stopped being excited about things I used to count down to.”',
        '“Every small task felt like it had a loading screen.”',
        '“I was rested and exhausted at the same time.”',
      ]],
      ['quote', 'I thought I’d become lazy. I’d actually become empty.'],
      ['h2', 'Why rest alone doesn’t fix it'],
      ['p', 'A weekend off helps when you’re tired. Burnout is different — it’s what happens when what you’re giving has outrun what you’re getting back for a long time. Sleep refills energy; it doesn’t refill meaning, control or connection.'],
      ['note', 'not laziness.'],
      ['p', 'So the way back is rarely one big holiday. It’s usually something smaller and less glamorous: dropping one commitment, telling one person the truth about your capacity, doing one thing a week that is for nothing and no one.'],
      ['p', 'If the flatness has lasted for weeks, or it comes with hopelessness, that’s worth taking to a doctor or counsellor. Burnout and depression can look alike, and you deserve someone who can tell the difference.'],
    ],
  },
  {
    id: 'finding-a-therapist', src: 'Boxy Guides', title: 'Finding a therapist who gets it', mins: 6, date: 'December 2024',
    img: 'res-therapist.jpg', alt: 'An empty armchair in warm afternoon light', credit: 'bahar_mr',
    dek: 'Fit matters more than credentials on a wall. How to look, what to ask, and when to move on.',
    body: [
      ['p', 'Starting therapy is strange: you’re asked to choose a stranger to tell everything to. No wonder so many of us open twelve tabs and close them all. Here’s a calmer way through.'],
      ['h2', 'Know what you’re shopping for'],
      ['p', 'Before you search, write down three things: what’s been hardest lately, what you’d like to be different, and anything that matters about who you talk to — language, culture, identity, cost, online or in person. That short list is your filter.'],
      ['h2', 'Questions worth asking'],
      ['list', [
        'Have you worked with people my age, or with what I’m dealing with?',
        'What does a typical session with you look like?',
        'How will we know if this is working?',
        'What does it cost, and are there lower-cost options?',
      ]],
      ['note', 'you’re interviewing them.'],
      ['quote', 'You are not too much. You may just be in the wrong room.'],
      ['h2', 'Give it three sessions'],
      ['p', 'The first session is mostly admin and nerves. By the third, you should have a feeling: do I leave a little lighter, or a little more understood? If the answer is a steady no, it’s okay to say so and try someone else. Good therapists expect this and won’t take it personally.'],
      ['p', 'If cost is the barrier, ask about sliding-scale fees, group sessions, or services through your school, workplace or community centre. Affordable help exists more often than search results suggest.'],
    ],
  },
  {
    id: 'being-there-for-a-friend', src: 'Boxy Journal', title: 'Being there for a friend', mins: 5, date: 'November 2024',
    img: 'res-friend.jpg', alt: 'Two friends holding each other in a field of tall grass', credit: 'deklerph',
    dek: 'You don’t need the right words. You need to stay in the room.',
    body: [
      ['p', 'When someone you love is struggling, the instinct is to fix it — find the article, the routine, the silver lining. It comes from care. It can also make the other person feel like a problem to be solved.'],
      ['h2', 'Presence over advice'],
      ['p', 'Most people aren’t looking for a solution when they open up. They’re checking whether it’s safe to be this honest with you. The answer you give is mostly in your face and your patience, not your sentences.'],
      ['list', [
        'Say less: “That sounds really heavy” does more than a paragraph of advice.',
        'Ask: “Do you want comfort, distraction, or help figuring it out?”',
        'Follow up: a text two days later means more than the perfect response in the moment.',
        'Keep inviting them, even when they keep saying no.',
      ]],
      ['quote', 'I don’t remember what she said. I remember that she didn’t leave.'],
      ['note', 'just stay.'],
      ['h2', 'Look after the one doing the looking after'],
      ['p', 'Supporting someone is real work. You’re allowed to have limits, to not be available at 3 a.m. every night, to need your own person to talk to. Being a good friend doesn’t mean being their only support.'],
      ['p', 'And if your friend ever talks about not wanting to be here, take it seriously, stay with them, and help them reach a crisis line or emergency services. You don’t have to carry that one alone.'],
    ],
  },
  {
    id: 'small-rituals', src: 'Community Notes', title: 'Small rituals for heavy days', mins: 3, date: 'October 2024',
    img: 'res-rituals.jpg', alt: 'A cup of tea, a lit candle and an open notebook on a soft blanket', credit: 'sixteenmilesout',
    dek: 'Tiny, repeatable things the community reaches for when everything feels like too much.',
    body: [
      ['p', 'None of these will change your life. That’s the point. On heavy days the goal isn’t transformation — it’s getting a little bit of ground back under your feet.'],
      ['h2', 'From the community'],
      ['list', [
        'Make one warm drink and do nothing else until it’s finished.',
        'Open a window and name five things you can hear.',
        'Write three lines — not a journal entry, just three lines.',
        'Change one thing about the room: the light, the sheets, the music.',
        'Step outside for the length of one song.',
        'Text one person a photo of the sky.',
      ]],
      ['note', 'pick just one.'],
      ['quote', 'I can’t fix the whole day. I can make the tea.'],
      ['h2', 'Why small works'],
      ['p', 'When you’re overwhelmed, big plans become one more thing to fail at. A ritual is small enough to finish, and finishing something tells your body the day isn’t entirely out of your hands.'],
      ['p', 'Keep the ones that help. Drop the ones that feel like homework. And if the heavy days are stacking up without a break, let someone know — rituals are a handrail, not the whole staircase.'],
    ],
  },
];

const cardHTML = (a, cls = '') => `<a class="card ${cls}" href="article.html?id=${a.id}"><div class="card-img"><img loading="lazy" src="assets/${a.img}" alt="${a.alt}"></div><div class="card-txt"><p class="card-src">${a.src}</p><p class="card-title">${a.title}</p></div></a>`;

// Home page: fill the resources carousel
const resTrack = document.querySelector('.res-track');
if (resTrack) resTrack.innerHTML = ARTICLES.map((a, i) => cardHTML(a, i < 3 ? 'rv' : '')).join('');

// Blog page: render the requested article
const post = document.querySelector('#post');
if (post) {
  const a = ARTICLES.find(x => x.id === new URLSearchParams(location.search).get('id')) || ARTICLES[0];
  const set = (id, text) => (document.getElementById(id).textContent = text);
  document.title = `${a.title} — BOXY`;
  set('pSrc', a.src); set('pMins', a.mins); set('pTitle', a.title); set('pDek', a.dek); set('pDate', a.date);
  Object.assign(document.getElementById('pImg'), { src: `assets/${a.img}`, alt: a.alt });
  document.getElementById('pCredit').innerHTML = `Photo by <a href="https://unsplash.com/@${a.credit}" target="_blank" rel="noopener">@${a.credit}</a> on Unsplash`;

  const el = (tag, cls, text) => Object.assign(document.createElement(tag), { className: cls, textContent: text || '' });
  const body = document.getElementById('pBody');
  a.body.forEach(([type, val]) => {
    if (type === 'p') body.append(el('p', 'rv', val));
    if (type === 'h2') body.append(el('h2', 'rv', val));
    if (type === 'note') body.append(el('p', 'post-note hand rv', val));
    if (type === 'quote') { const q = el('blockquote', 'post-quote rv'); q.append(el('span', '', val)); body.append(q); }
    if (type === 'list') { const ul = el('ul', 'rv'); val.forEach(t => ul.append(el('li', '', t))); body.append(ul); }
  });

  const rest = ARTICLES.filter(x => x !== a), start = ARTICLES.indexOf(a) % rest.length;
  document.getElementById('pMore').innerHTML = [0, 1, 2].map(k => cardHTML(rest[(start + k) % rest.length], 'rv')).join('');

  // reading progress (also drives the hero image's slow drift)
  const onScroll = () => document.documentElement.style.setProperty('--p', (scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)).toFixed(4));
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  addEventListener('DOMContentLoaded', () => {   // setLabel/burst come from main.js
    const copy = document.getElementById('copy');
    copy.addEventListener('click', async () => {
      let ok = true;
      try { await navigator.clipboard.writeText(location.href); } catch { ok = false; }
      setLabel(copy, ok ? 'Copied ✓' : 'Copy failed');
      setTimeout(setLabel, 1800, copy, 'Copy link');
    });
    const helpful = document.getElementById('helpful');
    helpful.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
      const yes = b.dataset.v === 'yes';
      helpful.classList.add('done');
      helpful.querySelector('h2').textContent = yes ? 'Glad it helped.' : 'Thanks for being honest.';
      helpful.querySelector('p').textContent = yes ? 'Pass it to someone who might need it too.' : 'We’ll keep working on it — tell us more any time.';
      if (yes) burst(helpful, helpful.offsetWidth / 2, 60);
    }));
  });
}
