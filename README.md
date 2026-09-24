# 🏋️ FitLog — Workout Library

A dark, no-nonsense gym companion built with Next.js. Pick a lift, lock it into today's plan, and watch the week's work add up.

![FitLog Banner]([/fitlog/src/assets/banner.png](https://github.com/aminulislamdev/Fitlog/blob/main/src/assets/banner.png?raw=true))

---

## 📖 Overview

FitLog is a workout library where users can browse 12 exercises covering every major muscle group, view detailed instructions, and add them to a personal "Today's Plan" (capped at 5 lifts) or a Saved list. Everything persists across page reloads using `localStorage`.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|-----------|---------|
| **Next.js 15** | App Router framework |
| **React 19** | UI library |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Utility-first styling |
| **DaisyUI** | Component library (available) |
| **react-icons** | All icons (no SVG files) |
| **react-toastify** | Toast notifications |
| **Context API** | Global state management |
| **localStorage** | Data persistence |

---

## ✨ Key Features

1. **🔝 Dynamic Navbar** — Live Plan/Saved badges that update instantly when you add or remove workouts.
2. **📚 Workout Library** — Responsive 3-column grid of 12 exercises with images, tags, equipment, and stats.
3. **📋 Detail Page** — Two-column layout with a sticky image, spec table, instructions, and action buttons.
4. **📅 My Plan** — Track today's plan (max 5 lifts) and saved workouts with live stats: Exercises / Minutes / Calories.
5. **🔀 Sort & Filter** — Sort by duration, calories, or rating with a smooth dropdown.
6. **💾 Persistence** — All plan/saved data survives page reloads via `localStorage`.
7. **🔔 Toast Notifications** — Every add, remove, and mark-done action gives instant feedback.
8. **📱 Fully Responsive** — Works seamlessly on mobile, tablet, and desktop.
9. **🎯 Custom 404** — Friendly not-found page with a sense of humor.
10. **⚡ Loading Skeletons** — Smooth skeleton UI during data fetching.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm / pnpm / yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/fitlog.git
cd fitlog

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── my-plan/              # My Plan page
│   ├── workouts/[id]/        # Workout detail page
│   ├── layout.tsx            # Root layout (Navbar + Footer + PlanProvider)
│   ├── page.tsx              # Home page (Banner + Library)
│   ├── loading.tsx           # Home loading skeleton
│   └── not-found.tsx         # Custom 404
├── components/
│   ├── home/                 # Banner, WorkoutList
│   ├── plan/                 # PlanStats, PlanTabs, PlanCard, EmptyState
│   └── shared/               # Navbar, Footer, WorkoutCard, WorkoutActions, SortDropdown
├── context/
│   └── PlanContext.tsx       # Global state with localStorage
├── lib/
│   └── api.ts                # API fetch helpers
└── types/                    # TypeScript types
```

---

## 🔌 API

Base URL: `https://api.abcz.workers.dev/api/fitlog`

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/fitlog` | GET | Fetch all workouts |
| `/api/fitlog/:id` | GET | Fetch a single workout |

---

## 📝 License

MIT — feel free to use, modify, and share.

---

## 👨‍💻 Author

Built with 💪 by **Aminul Islam Mahi**

**Train hard, log honest.**
