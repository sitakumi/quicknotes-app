// ---------- element references ----------
const form           = document.getElementById('note-form');
const noteInput      = document.getElementById('note-input');
const categorySelect = document.getElementById('category-select');
const errorMessage   = document.getElementById('error-message');
const notesList      = document.getElementById('notes-list');
const noteCount      = document.getElementById('note-count');

// ---------- constants ----------
const MAX_CHARS = 200;

// ---------- state ----------
let notes = [];

// ---------- helpers ----------
function formatDate(date) {
  return date.toLocaleString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function categoryClass(category) {
  return 'category-' + category.toLowerCase();
}

function showError(message) {
  errorMessage.textContent = message;
}

function clearError() {
  errorMessage.textContent = '';
}

// ---------- count text ----------
function updateCount() {
  const total = notes.length;
  if (total === 0) {
    noteCount.textContent = 'You have no notes yet.';
  } else if (total === 1) {
    noteCount.textContent = 'You have 1 note.';
  } else {
    noteCount.textContent = `You have ${total} notes.`;
  }
}

// ---------- render ----------
function renderNotes() {
  // clear the list
  notesList.innerHTML = '';

  // update the count paragraph
  updateCount();

  // build a card for each note
  notes.forEach((note) => {
    const li = document.createElement('li');
    li.className = `note-card ${categoryClass(note.category)}`;
    li.dataset.id = note.id;

    // left side: text + meta
    const body = document.createElement('div');

    const text = document.createElement('p');
    text.className = 'note-text';
    text.textContent = note.text;

    const meta = document.createElement('p');
    meta.className = 'note-meta';
    meta.textContent = `${note.category} · ${note.createdAt}`;

    body.append(text, meta);

    // right side: delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteNote(note.id));

    li.append(body, deleteBtn);
    notesList.appendChild(li);
  });
}

// ---------- actions ----------
function addNote(text, category) {
  const note = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    text: text.trim(),
    category,
    createdAt: formatDate(new Date()),
  };

  notes.push(note);
  renderNotes();
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  renderNotes();
}

// ---------- form submit with validation ----------
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const raw = noteInput.value;
  const text = raw.trim();
  const category = categorySelect.value;

  // 1. empty or only spaces
  if (text === '') {
    showError('Please type a note first.');
    noteInput.focus();
    return;
  }

  // 2. too long
  if (raw.length > MAX_CHARS) {
    showError('Notes must be 200 characters or fewer.');
    noteInput.focus();
    return;
  }

  // valid → clear error and add
  clearError();
  addNote(text, category);

  // reset the form for the next note
  noteInput.value = '';
  categorySelect.value = 'Personal';
  noteInput.focus();
});

// clear the error as soon as the user edits the field again
noteInput.addEventListener('input', clearError);

// ---------- init ----------
renderNotes();