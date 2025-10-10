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

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function renderAll() {
  MESSAGES_EL.innerHTML = '';
  messages.forEach(m => {
    const row = document.createElement('div');
    row.className = `row ${m.type}`;

    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.dataset.id = m.id;
    bubble.tabIndex = 0;

    // Build reactions only if present
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
  MESSAGES_EL.scrollTop = MESSAGES_EL.scrollHeight;
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
    messages.push(createMessage('Echo: ' + text, 'incoming'));
    renderAll();
  }, 500);
});

// Ctrl+Enter to send
INPUT.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    COMPOSER.requestSubmit();
  }
});

// Boot
buildPicker();
renderAll();
