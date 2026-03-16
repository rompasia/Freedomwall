# The Freedom Wall

A personal digital corkboard — sticky notes, thoughts, letters, rants.
Built with React, deployed to GitHub Pages.

---

## Project Structure

```
freedom-wall/
├── public/
│   └── index.html              # HTML shell (Google Fonts loaded here)
├── src/
│   ├── index.js                # React entry point
│   ├── App.jsx                 # Root component — wires everything together
│   │
│   ├── components/
│   │   ├── Landing.jsx         # Front page / alias creation screen
│   │   ├── Header.jsx          # Sticky top bar
│   │   ├── Wall.jsx            # Notes grid
│   │   ├── NoteCard.jsx        # Single sticky note card
│   │   ├── CreateNoteModal.jsx # Rich-text note editor pop-up
│   │   ├── ViewNoteModal.jsx   # Full note reader pop-up
│   │   └── Toast.jsx           # Brief notification
│   │
│   ├── hooks/
│   │   ├── useLocalStorage.js  # Persist state to localStorage
│   │   └── useToast.js         # Toast notification state
│   │
│   └── styles/
│       ├── global.css          # CSS variables, reset, keyframes
│       ├── Landing.css         # Landing screen styles
│       ├── Header.css          # Header styles
│       ├── Wall.css            # Wall + NoteCard styles
│       └── Modals.css          # All modals, toolbar, toast
│
└── package.json
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run locally

```bash
npm start
```

Opens at `http://localhost:3000`.

### 3. Build for production

```bash
npm run build
```

Outputs to `build/`.

---

## Deploy to GitHub Pages

### Option A — Manual deploy

1. Run `npm run build`
2. Push the contents of `build/` to the `gh-pages` branch of your repo
3. In **Settings → Pages**, set source to `gh-pages` branch

### Option B — Automated with gh-pages package

```bash
npm install --save-dev gh-pages
```

Add to `package.json` scripts:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
```

Then deploy with:
```bash
npm run deploy
```

> **Important:** `"homepage": "."` is already set in `package.json` so asset
> paths resolve correctly on GitHub Pages.

---

## Adding Features (roadmap)

- [ ] Delete / edit existing notes
- [ ] Search & filter notes
- [ ] Tags / categories
- [ ] Dark mode toggle
- [ ] Export notes as text/PDF
- [ ] Pin / favourite notes
- [ ] Note timestamps (relative: "2 days ago")
