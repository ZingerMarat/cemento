# Fullstack Test Assignment - Dynamic Table UI

## Project Description

This project is a dynamic and customizable data table built as part of a coding assignment for a Junior Full Stack Developer role. The table supports various data types, inline editing, column visibility toggling, drag-and-drop reordering, and infinite scrolling. The focus was on providing an efficient, optimized, and user-friendly UI/UX.

---

## Features

- Render different data types: `string`, `number`, `boolean`, `select`
- Inline cell editing with local save
- Column visibility toggling
- State persistence in `localStorage`
- Drag-and-drop column reordering (`@dnd-kit`)
- Infinite scroll with dynamic data loading
- Optimized performance for large datasets

---

## Screenshots

<div align="center">
        <img src="https://github.com/ZingerMarat/cemento/blob/main/cemento-ass/public/Screenshot%2001.png" width="600"/>
  <img src="https://github.com/ZingerMarat/cemento/blob/main/cemento-ass/public/Screenshot%2002.png" width="600"/>
  <img src="https://github.com/ZingerMarat/cemento/blob/main/cemento-ass/public/Screenshot%2003.png" width="600"/>

</div>

---
## Technologies Used

**Frontend:**
- React 18.2.0
- Vite 6.3.5

**State Management:**
- Zustand 5.0.5

**Drag and Drop:**
- `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/modifiers`

**Mock Data Generation:**
- `@faker-js/faker` 9.8.0

**Testing:**
- Jest
- React Testing Library

---

## Project Structure

```
src/
├── components/
│   ├── Table.jsx             # Main table component
│   ├── TableRow.jsx          # Table row component
│   ├── TableCell.jsx         # Table cell component (handles multiple types)
│   ├── ColumnSelector.jsx    # Column visibility control
│   └── SortableItem.jsx      # Drag-and-drop element for columns
├── store/
│   └── useTableStore.js      # Zustand store for global state
├── mock/
│   └── mockData.js           # Data generator
└── App.jsx                   # Root component
```

---

## Setup & Run Instructions

1. Clone the repository:
```bash
git clone github.com/ZingerMarat/cemento
cd project-folder
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

---

## Running Tests

To execute tests:
```bash
npm test
```

---
