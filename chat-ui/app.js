/**
 * Minimal frontend-only chat with left/right bubbles and emoji reactions.
 * No frameworks, no backend. Everything is in-memory for demo/testing.
 */

const MESSAGES_EL = document.getElementById('messages');
const PICKER_EL = document.getElementById('picker');
const COMPOSER = document.getElementById('composer');
const INPUT = document.getElementById('input');

const EMOJIS = ['👍','😂','❤️','😮','😢','🙌','🔥','🎉','👏','😆','😅','🤯','🤝','💯','😎','🤩'];

// Seed data
let messages = [
  createMessage('Hey! This is a simple chat UI with emoji reactions. Try reacting to this message. 👇', 'incoming'),
  createMessage('Looks slick! I\'ll send a message and add some reactions.', 'outgoing')
];

function createMessage(text, type = 'incoming') {
  return {
    id: crypto.randomUUID(),
    type, // 'incoming' | 'outgoing'
    text,
    createdAt: new Date(),
    reactions: {} // key: emoji, value: count
  };
}

function getAvatarHTML(type) {
  if (type === 'incoming') {
    // Echo / Robot avatar
    return `<div class="avatar bot-avatar">🤖</div>`;
  } else {
    // You / Profile avatar
    return `<div class="avatar user-avatar">🧑‍💻</div>`;
  }
}

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function renderAll() {
  const atBottom =
    MESSAGES_EL.scrollHeight - MESSAGES_EL.scrollTop - MESSAGES_EL.clientHeight < 50;

  MESSAGES_EL.innerHTML = '';
  messages.forEach(m => {
    const row = document.createElement('div');
    row.className = `row ${m.type}`;
    row.innerHTML = getAvatarHTML(m.type);

    // row.appendChild(bubble);

    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.dataset.id = m.id;
    bubble.tabIndex = 0;

    const reactionsHTML = renderReactions(m);
    const reactionsBlock = reactionsHTML ? `<div class="reactions">${reactionsHTML}</div>` : '';

    bubble.innerHTML = `
      <div class="content">${escapeHTML(m.text)}</div>
      <div class="meta">
        <span>${m.type === 'incoming' ? 'You ·' : 'Me ·'}</span>
        <time datetime="${m.createdAt.toISOString()}">${formatTime(m.createdAt)}</time>
      </div>
      ${reactionsBlock}
      <div class="bubble-actions">
        <button class="btn react-btn" type="button" aria-haspopup="menu" aria-expanded="false" title="Add reaction">😊</button>
      </div>
    `;
    row.appendChild(bubble);
    MESSAGES_EL.appendChild(row);
  });

  // auto-scroll only if user was near bottom
  if (atBottom) {
    MESSAGES_EL.scrollTop = MESSAGES_EL.scrollHeight;
  }
}

function renderReactions(m) {
  const keys = Object.keys(m.reactions);
  if (!keys.length) return '';
  return keys.map(e => `<span class="reaction" data-emoji="${e}" title="Click to remove one">${e} <b>${m.reactions[e]}</b></span>`).join('');
}

function escapeHTML(str) {
  return str.replace(/[&<>\"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', "'": '&#39;'
  }[c]));
}

// Initialize emoji picker grid
function buildPicker() {
  PICKER_EL.innerHTML = '';
  EMOJIS.forEach(e => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = e;
    b.setAttribute('data-emoji', e);
    PICKER_EL.appendChild(b);
  });
}

function openPicker(anchorButton, messageId) {
  const rect = anchorButton.getBoundingClientRect();
  const bodyRect = document.body.getBoundingClientRect();
  const x = rect.left - bodyRect.left;
  const y = rect.top - bodyRect.top;

  PICKER_EL.style.left = Math.max(8, Math.min(window.innerWidth - 260, x - 160 + rect.width/2)) + 'px';
  PICKER_EL.style.top = (y - 70) + 'px';
  PICKER_EL.classList.add('visible');
  PICKER_EL.dataset.targetId = messageId;

  // Close on outside click
  const onDocClick = (ev) => {
    if (!PICKER_EL.contains(ev.target) && ev.target !== anchorButton) {
      closePicker();
      document.removeEventListener('click', onDocClick);
    }
  };
  setTimeout(() => document.addEventListener('click', onDocClick), 0);
}

function closePicker() {
  PICKER_EL.classList.remove('visible');
  delete PICKER_EL.dataset.targetId;
}

// Open picker / remove reaction
MESSAGES_EL.addEventListener('click', (e) => {
  const btn = e.target.closest('.react-btn');
  if (btn) {
    const bubble = btn.closest('.bubble');
    openPicker(btn, bubble.dataset.id);
  }

  const badge = e.target.closest('.reaction');
  if (badge) {
    const bubble = badge.closest('.bubble');
    const id = bubble.dataset.id;
    const emoji = badge.dataset.emoji;
    const msg = messages.find(m => m.id === id);
    if (msg && msg.reactions[emoji]) {
      msg.reactions[emoji] -= 1;
      if (msg.reactions[emoji] <= 0) delete msg.reactions[emoji];
      renderAll();
    }
  }
});

// Pick emoji to add reaction
PICKER_EL.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-emoji]');
  if (!btn) return;
  const emoji = btn.dataset.emoji;
  const id = PICKER_EL.dataset.targetId;
  const msg = messages.find(m => m.id === id);
  if (msg) {
    msg.reactions[emoji] = (msg.reactions[emoji] || 0) + 1;
    renderAll();
  }
  closePicker();
});

// Send messages
COMPOSER.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = INPUT.value.trim();
  if (!text) return;
  const msg = createMessage(text, 'outgoing');
  messages.push(msg);
  INPUT.value = '';
  renderAll();
  // Demo: fake reply
  setTimeout(() => {
    const reply = getBotReply(text);
    messages.push(createMessage('Echo: ' + reply, 'incoming'));
    renderAll();
  }, 500);
});

// Ctrl+Enter to send
INPUT.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    COMPOSER.requestSubmit();
  }
});

function getBotReply(input) {
  const msg = input.toLowerCase().trim();

  if (msg.includes('hello') || msg.includes('hi')) return "Hey there 👋";
  if (msg.includes('time')) return `It's ${new Date().toLocaleTimeString()}`;
  if (msg.includes('weather')) return "I'm not connected to the internet, but it's always sunny in this app ☀️";
  if (msg.includes('help')) return "Try saying: 'hello', 'time', 'weather', or 'joke'.";
  
const jokes = [
  "Why did the web developer leave the restaurant? Because of the table layout.",
  "404: Joke not found.",
  "I would tell you a UDP joke, but you might not get it.",
  "There are only 10 types of people in the world: those who understand binary and those who don’t.",
  "A SQL query walks into a bar, walks up to two tables and asks, 'Can I join you?'",
  "Why do programmers prefer dark mode? Because light attracts bugs.",
  "To understand what recursion is, you must first understand recursion.",
  "How many programmers does it take to change a light bulb? None, that’s a hardware problem.",
  "Real programmers count from 0.",
  "Git commit -m 'fixed the thing that I broke yesterday'",
  "My code doesn’t always work, but when it does, I don’t know why.",
  "Knock knock. Who’s there? *very long pause* ... Java.",
  "Why was the developer broke? Because he used up all his cache.",
  "Debugging: Being the detective in a crime movie where you are also the murderer.",
  "I told my computer I needed a break, and it said it couldn’t handle that request.",
  "I’d tell you a JavaScript closure joke, but it’s inside another function.",
  "Why did the programmer quit his job? He didn’t get arrays.",
  "A CSS developer walks into a bar, but it’s already styled.",
  "My boss told me to have a good day — so I went home.",
  "Computers make very fast, very accurate mistakes."
];

  if (msg.includes('joke')) return jokes[Math.floor(Math.random() * jokes.length)];

  // fallback: echo the message
  return "Echo: " + input;
}

// Boot
buildPicker();
renderAll();

// Info button toggle
const infoBtn = document.getElementById('infoBtn');
const infoPanel = document.getElementById('infoPanel');
infoBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const rect = infoBtn.getBoundingClientRect();

  // Position bubble slightly below and centered to the info button
  infoPanel.style.left = `${rect.left + rect.width / 2 - infoPanel.offsetWidth / 2}px`;
  infoPanel.style.top = `${rect.bottom + 8}px`;

  infoPanel.classList.toggle('visible');
});

document.addEventListener('click', (e) => {
  if (!infoBtn.contains(e.target) && !infoPanel.contains(e.target)) {
    infoPanel.classList.remove('visible');
  }
});

// Set random emoji avatar
const avatarEl = document.getElementById('avatarEmoji');
if (avatarEl) {
  const randomEmoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
  avatarEl.textContent = randomEmoji;

  // Generate favicon with same emoji
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.font = '48px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(randomEmoji, 32, 38);

  const favicon = document.createElement('link');
  favicon.rel = 'icon';
  favicon.href = canvas.toDataURL();
  document.head.appendChild(favicon);
}
