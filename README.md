# Consistify — Fitness Planner 🌟

[![Status](https://img.shields.io/badge/status-prototype-yellow)]()
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)]()

Consistify is a responsive, accessible prototype for a personalized fitness planner that helps users:
- Calculate maintenance calories (Mifflin–St Jeor) and suggested macros (protein / fat / carbs).
- Generate and filter workout routines (home, gym, cardio, yoga) according to preferences and intensity.
- Suggest budget-aware diet plans aiming to meet calorie & macro goals, prepared for integration with nutrition APIs to include micros, fiber and cost.
- Offer sleep & recovery guidance tailored by age and activity level.

---

## Table of contents 📚
- [Why Consistify](#why-consistify)
- [Features](#features)
- [Demo / Screenshots](#demo--screenshots)
- [Tech stack](#tech-stack)
- [Local setup](#local-setup)
- [How it works](#how-it-works)
- [API integration & data flow](#api-integration--data-flow)
- [Algorithms & approach](#algorithms--approach)
- [Data model suggestions](#data-model-suggestions)
- [Mobile apps](#mobile-apps)
- [UX & accessibility](#ux--accessibility)
- [Testing & CI](#testing--ci)
- [Deploying](#deploying)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Why Consistify ❓
Many people need simple, personalized planning that balances workouts, nutrition and sleep while respecting budgets and exercise preferences. Consistify is designed to be a clear, extensible front-end prototype that demonstrates how to combine calorie math, budget-aware meal suggestions and workouts into a friendly UI — with clear hooks to integrate robust nutrition and exercise APIs.

---

## Features ✨
- Calorie calculator (Mifflin–St Jeor) + activity multipliers
- Macro suggestions (protein, fat, carbs)
- Filterable workout plans (home / gym / cardio / yoga)
- Budget-aware diet plan suggestions with calorie match tolerance
- Sleep & recovery tips that adapt to age and activity
- Accessible UI built with Bootstrap
- Image-rich, responsive layouts (Unsplash placeholder images)
- Clear extension points for nutrition/exercise API integration

---

## Demo / Screenshots 🖼️
(Screenshots are placeholders — replace with your own when available)
- Hero with background + CTA
- Workout & diet cards with images
- Calorie & macro calculator panel
- Plan summary card with selected options

---

## Tech stack 🧰
- Frontend: HTML, CSS (Bootstrap + custom), vanilla JavaScript
- Prototype images: Unsplash (ensure compliance with Unsplash license for production)
- Recommended backend (for production & API keys): Node.js + Express (or serverless on Vercel / AWS Lambda)
- Optional DB: PostgreSQL / MongoDB for user accounts and saved plans
- Mobile: React Native or Flutter (recommended) for Android & iOS

---

## Local setup — Getting started 🚀

Prerequisites:
- Node.js >= 14 (only required for local web servers or backend)
- Optional: yarn / npm

Quick static preview:
1. Open `src/client/index.html` in a browser for a static preview.
2. Or run a static server (recommended):
   - npm i -g serve
   - cd src/client && serve .

For development with a backend:
1. Add a small Express server in `src/server/` to proxy nutrition or exercise API requests (keeps API keys secret).
2. Start the frontend static server and the backend concurrently during development.

---

## How it works — high level 🧭

1. User enters weight, height, age, gender, activity level, preferences and budget.
2. Client computes BMR (Mifflin–St Jeor) and maintenance calories:
   - Male: BMR = 10*kg + 6.25*cm − 5*age + 5
   - Female: BMR = 10*kg + 6.25*cm − 5*age − 161
   - Other: a safe averaged fallback
3. Maintenance calories = BMR × activityFactor (sedentary → very active)
4. App suggests macros:
   - Protein ~ 1.2–2.2 g/kg (configurable)
   - Fat ~ 25% of calories (example)
   - Carbs fill remaining calories
5. The front-end filters sample workout/diet cards using preferences & budget. For production, the backend will generate meal combinations that meet calorie/macros & budget using nutrition API nutrient data.

---

## API integration & data flow 🔗

Recommended APIs:
- Edamam Nutrition API (detailed nutrients)
- Nutritionix (food + exercise)
- USDA FoodData Central (open nutrient database)
- Spoonacular (recipes & cost estimates)
- ExerciseDB (exercise metadata & video links)

Integration pattern:
1. Frontend collects user inputs.
2. Frontend calls your backend:
   - POST /api/meal-plan { calories, macros, budget, dietaryPrefs }
3. Backend:
   - Queries nutrition API(s) for candidate foods/recipes
   - Solves for meal combos that balance calories/macros within budget (server-side algorithm)
   - Returns structured plan: meals, nutrient totals, cost estimate
4. Frontend displays meals, shopping list and allows selection

Security note:
- Never embed API keys in client-side JS. Keep all keys in server-side environment variables or use a secrets store.

Example server endpoint (pseudo):
```bash
POST /api/meal-plan
Body:
{
  "calories": 2000,
  "protein": 120,
  "budget": 6.5,
  "preferences": { "vegan": false, "noNuts": true }
}

Response:
{
  "meals": [ { "name": "Oat + banana", "calories": 450, "protein": 15, "cost": 1.2, "ingredients": [...] }, ... ],
  "totals": { "calories": 2005, "protein": 123, "cost": 5.8}
}
```

---

## Algorithms & approach 🧩

Meal planning with budget and nutrient constraints is a constrained optimization problem:
- Consider knapsack / integer linear programming approaches for small-medium scale.
- For speed, heuristics and greedy algorithms work well in a prototype:
  - Pre-filter candidate foods in desired price ranges.
  - Greedy pack meals to meet calorie target, then adjust to fix macro deficits.
  - Use simple swaps (local search) to improve cost or nutrient fit.

Exercise energy estimation:
- Use MET values or reliable API-provided calories burned per minute values.
- For simple prototypes use estimates: calories/min = estCaloriesPerMin (per workout card).

---

## Data model suggestions 🗂️

Users:
- id, email (hashed), profile (weight, height, age, gender), preferences

Plans:
- userId, createdAt, goals {calories, protein}, selectedWorkouts[], selectedMeals[], summary

Foods / Meals:
- externalId, name, nutrients {calories, protein, carbs, fat, fiber, micros}, estimatedCost

---

## Mobile apps 📱

Build a mobile app using:
- React Native (JavaScript/TypeScript) — code sharing with web; OR
- Flutter (Dart) — great cross-platform performance

Sync to the same backend for saved plans, authentication and meal-plan generation.

---

## UI / UX & Accessibility ♿
- Built with Bootstrap for a11y and responsive layout
- Use accessible color contrasts, keyboard navigation, ARIA attributes where needed
- Images are lazy-loaded and have alt text; replace Unsplash images with licensed assets for production

---

## Testing & CI ✅
- Unit test JavaScript functions (calorie math, filters)
- Add end-to-end tests using Playwright or Cypress for key flows (calculate → update plans)
- Add CI pipeline for tests and linting (GitHub Actions recommended)

---

## Deployment 🔁
- Frontend (static): Host on Netlify / Vercel / GitHub Pages
- Backend: Host on Heroku, Render, Vercel (serverless) or AWS (ECS/Lambda)
- Use environment variables for API keys and secure storage for user data

---

## Roadmap 🛣️
- Server-side meal-plan generator using nutrition APIs
- User accounts, saved plans and progress tracking
- Personalized recipe scaling and shopping lists
- Integration with wearable/exercise trackers
- Native mobile apps with offline caching

---

## Contributing 🤝
Contributions are welcome! Please:
1. Fork the repo
2. Create a feature branch
3. Open a pull request with a clear description and tests if applicable

Add an issue for large features before implementation to discuss approach.

---

## License 📄
MIT — see LICENSE file.

---

## Contact ✉️
For questions or collaboration ideas, open an issue in this repository or contact the maintainer.
