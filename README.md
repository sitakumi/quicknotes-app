# QuickNotes

A small, dependency-free note-taking web app. Jot down a note, tag it with a
category, and search or delete it later. Notes are saved in the browser with
`localStorage`, so they survive a page refresh.

## Features

- **Add notes** with a short text and a category (Personal, Work, or Study).
- **Validation** — rejects empty notes and anything over 200 characters.
- **Category colours** — each note card shows a coloured left border:
  teal for Personal, dark red for Work, blue for Study.
- **Live search** — filters notes by text as you type, case-insensitive.
- **Delete** — remove any note with its own Delete button.
- **Live count** — shows "You have no notes yet.", "You have 1 note." or
  "You have N notes."
- **Persistence** — notes are stored in `localStorage` and restored on load.
- **Responsive** — the form stacks vertically on screens 600px or narrower.

## File structure
```
quicknotes-app/
├── index.html # page structure: header, form, notes list, footer
├── style.css # layout, cards, category colours, responsive rules
├── script.js # add / delete / search / count / localStorage logic
└── README.md # this file
```

## Getting started

No build step or dependencies are required.

1. Clone or download the repository.
2. Open `index.html` in any modern browser.

That's it — the app runs entirely client-side.

## Usage

1. Type a note into the **Note** field.
2. Choose a **Category** (Personal, Work, or Study).
3. Click **Add Note** (or press Enter).
4. Use the **Search** box to filter notes by text.
5. Click **Delete** on a card to remove that note.

## Technical notes

- Written in plain HTML, CSS and JavaScript — no frameworks.
- Colours are defined as CSS variables on `:root`, making the theme easy
  to change in one place.
- Notes are serialised to `localStorage` under the key `quicknotes-notes`
  whenever they are added or deleted.

## License

For educational use.