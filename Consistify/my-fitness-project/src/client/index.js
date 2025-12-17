// filepath: c:\Users\Admin\Desktop\Claude Projects\Consistify\my-fitness-project\src\client\index.js
document.addEventListener('DOMContentLoaded', () => {
    // Ensure elements exist before using them
    const calorieForm = document.getElementById('calorie-form');
    const workoutContainer = document.getElementById('workout-plans');
    const dietContainer = document.getElementById('diet-plans');
    const sleepListEl = document.getElementById('sleep-list');
    const resultBox = document.getElementById('calorie-result');
    const planSummary = document.getElementById('plan-summary');

    // Fallback image used when an item has no image or image fails to load
    const fallbackImg = "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=1200&q=60&auto=format&fit=crop";

    // Sample data
    const workouts = [
      { id: "w1", title: "Home Strength (30 min)", type: "Home", intensity: "Moderate", duration: 30, estCaloriesPerMin: 6, img: "https://images.unsplash.com/photo-1558611848-73f7eb4001d7?w=800&q=60&auto=format&fit=crop" },
      { id: "w2", title: "Gym Hypertrophy (60 min)", type: "Gym", intensity: "High", duration: 60, estCaloriesPerMin: 9, img: "https://images.unsplash.com/photo-1558611847-0b1b71f52833?w=800&q=60&auto=format&fit=crop" },
      { id: "w3", title: "Morning Yoga Flow (25 min)", type: "Yoga", intensity: "Low", duration: 25, estCaloriesPerMin: 3, img: "https://images.unsplash.com/photo-1554284126-aa88f22d8d6b?w=800&q=60&auto=format&fit=crop" },
      { id: "w4", title: "HIIT Cardio (20 min)", type: "Cardio", intensity: "Very High", duration: 20, estCaloriesPerMin: 12, img: "https://images.unsplash.com/photo-1546484959-f9d8c2b0f57b?w=800&q=60&auto=format&fit=crop" },
    ];

    const diets = [
      { id: "d1", title: "Balanced 2000 kcal", calories: 2000, protein: 100, carbs: 250, fat: 67, cost: 6, img: "https://images.unsplash.com/photo-1543353071-087092ec393a?w=800&q=60&auto=format&fit=crop" },
      { id: "d2", title: "High Protein 2200 kcal", calories: 2200, protein: 160, carbs: 180, fat: 73, cost: 8, img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=60&auto=format&fit=crop" },
      { id: "d3", title: "Budget Veg 1800 kcal", calories: 1800, protein: 70, carbs: 260, fat: 50, cost: 4, img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=60&auto=format&fit=crop" },
    ];

    // render cards (workouts OR diets) — shows a friendly card when list is empty, and ensures no empty <img> left
    function renderCards(list, containerEl, type){
      if(!containerEl) return;
      containerEl.innerHTML = "";

      if(!list || list.length === 0){
        // show a "no results" card with fallback image
        const col = document.createElement("div");
        col.className = "col-12";
        col.innerHTML = `
          <div class="card mb-4">
            <img src="${fallbackImg}" class="card-img-top" alt="No results" onerror="this.onerror=null;this.src='${fallbackImg}';">
            <div class="card-body">
              <h5 class="card-title">No matching ${type === 'workout' ? 'workouts' : 'diets'} found</h5>
              <p class="mb-0 text-muted">Adjust your preferences, budget or inputs and press Calculate to refresh suggestions.</p>
            </div>
          </div>
        `;
        containerEl.appendChild(col);
        return;
      }

      list.forEach(item => {
        const imgSrc = item.img || fallbackImg;
        const col = document.createElement("div");
        col.className = "col-md-6 col-lg-3 mb-4";
        let bodyInfo = "";
        if (type === 'workout') {
          bodyInfo = `<p class="mb-1"><strong>Type:</strong> ${item.type}</p><p class="mb-1"><strong>Intensity:</strong> ${item.intensity}</p><p class="mb-1"><strong>Duration:</strong> ${item.duration} min</p>`;
        } else {
          bodyInfo = `<p class="mb-1"><strong>Calories:</strong> ${item.calories} kcal</p><p class="mb-1"><strong>Cost/day:</strong> $${item.cost}</p>`;
        }

        col.innerHTML = `
          <div class="card h-100">
            <img src="${imgSrc}" class="card-img-top" alt="${escapeHtml(item.title)}" onerror="this.onerror=null;this.src='${fallbackImg}';">
            <div class="card-body">
              <h5 class="card-title">${escapeHtml(item.title)}</h5>
              ${bodyInfo}
            </div>
            <div class="card-footer bg-transparent">
              <button class="btn btn-sm btn-outline-primary w-100" data-id="${item.id}" data-type="${type}">Use this plan</button>
            </div>
          </div>
        `;
        containerEl.appendChild(col);
      });

      // attach handlers
      containerEl.querySelectorAll("button[data-id]").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const id = e.currentTarget.dataset.id;
          const t = e.currentTarget.dataset.type;
          if (t === "workout") applyWorkoutPlan(id);
          else applyDietPlan(id);
        });
      });
    }

    // simple HTML escape for titles used inside template literals
    function escapeHtml(str){
      if(!str) return "";
      return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    // apply chosen workout/diet to plan summary
    function applyWorkoutPlan(id){
      const w = workouts.find(x => x.id === id);
      if(!w || !planSummary) return;
      planSummary.innerHTML = `
        <strong>Selected workout:</strong> ${escapeHtml(w.title)} — ${w.duration} min (${escapeHtml(w.intensity)})<br>
        Estimated calories burned (example): ${Math.round(w.estCaloriesPerMin * w.duration)} kcal
      `;
    }

    function applyDietPlan(id){
      const d = diets.find(x => x.id === id);
      if(!d || !planSummary) return;
      planSummary.innerHTML = `
        <strong>Selected diet:</strong> ${escapeHtml(d.title)} — ${d.calories} kcal/day, Protein ${d.protein}g<br>
        Estimated cost: $${d.cost}/day
      `;
    }

    // Update sleep tips
    function updateSleepTips(age, activityFactor){
      if(!sleepListEl) return;
      sleepListEl.innerHTML = "";
      const recommended = age < 18 ? "8–10 hours" : "7–9 hours";
      const tips = [
        `Recommended nightly sleep: ${recommended}.`,
        "Maintain consistent bed & wake times.",
        "Keep bedroom cool, dark and quiet.",
        "Avoid screens 60 minutes before sleep.",
        "Limit caffeine after midday."
      ];
      if (activityFactor >= 1.725) {
        tips.push("Add 20-30 min light nap or extended sleep after heavy training days for recovery.");
      }
      tips.forEach(t => {
        const li = document.createElement("li");
        li.textContent = t;
        sleepListEl.appendChild(li);
      });
    }

    // Filter and update plans after calculation
    function updatePlans(maintenance, protein, budget, prefs){
      // workouts: filter by user prefs (if none selected, show all)
      const prefTypes = [];
      if (prefs.home) prefTypes.push("Home");
      if (prefs.gym) prefTypes.push("Gym");
      if (prefs.cardio) prefTypes.push("Cardio");
      if (prefs.yoga) prefTypes.push("Yoga");

      const filteredWorkouts = workouts.filter(w => {
        if (prefTypes.length === 0) return true;
        return prefTypes.includes(w.type);
      });

      // diets: budget filter & approximate calorie match (allow +/-15%)
      const filteredDiets = diets.filter(d => {
        const budgetOk = !budget || d.cost <= budget;
        const calOk = Math.abs(d.calories - maintenance) <= maintenance * 0.15;
        return budgetOk && calOk;
      });

      // if no diets match, relax calorie constraint but respect budget if provided
      const dietsToShow = filteredDiets.length ? filteredDiets : diets.filter(d => d.cost <= (budget || Infinity));

      renderCards(filteredWorkouts, workoutContainer, "workout");
      renderCards(dietsToShow, dietContainer, "diet");
    }

    // Calorie calculation (Mifflin-St Jeor) - main handler used for "Calculate" button
    if (calorieForm) {
      calorieForm.addEventListener("submit", function(e){
        e.preventDefault();
        const weight = parseFloat(document.getElementById("weight").value);
        const height = parseFloat(document.getElementById("height").value);
        const age = parseFloat(document.getElementById("age").value);
        const gender = document.getElementById("gender").value;
        const activity = parseFloat(document.getElementById("activity-level").value);
        const budget = parseFloat(document.getElementById("budget").value) || 0;

        if(!weight || !height || !age) return;

        let bmr;
        if (gender === "male") {
          bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else if (gender === "female") {
          bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        } else {
          bmr = 10 * weight + 6.25 * height - 5 * age - 78;
        }

        const maintenance = Math.round(bmr * activity);
        const recommendedProtein = Math.round((weight * 1.6)); // g/day typical
        const recommendedFat = Math.round((0.25 * maintenance) / 9);
        const recommendedCarbs = Math.round((maintenance - (recommendedProtein * 4 + recommendedFat * 9)) / 4);

        if(resultBox){
          resultBox.classList.remove("d-none");
          resultBox.innerHTML = `
            <strong>Maintenance calories:</strong> ${maintenance} kcal/day<br>
            <strong>Suggested macros:</strong> Protein ${recommendedProtein} g, Fat ${recommendedFat} g, Carbs ${recommendedCarbs} g<br>
            <strong>Budget:</strong> $${budget.toFixed(2)} / day
          `;
        }

        if(planSummary){
          planSummary.innerHTML = `
            Maintenance: <strong>${maintenance} kcal</strong><br>
            Protein target: <strong>${recommendedProtein} g/day</strong><br>
            Sample: We'll suggest budget-friendly meals that meet these targets (integration with nutrition APIs recommended).
          `;
        }

        // read preferences (guard if elements missing)
        const prefs = {
          home: document.getElementById("pref-home") ? document.getElementById("pref-home").checked : false,
          gym: document.getElementById("pref-gym") ? document.getElementById("pref-gym").checked : false,
          cardio: document.getElementById("pref-cardio") ? document.getElementById("pref-cardio").checked : false,
          yoga: document.getElementById("pref-yoga") ? document.getElementById("pref-yoga").checked : false,
        };

        // update workout/diet lists and sleep tips (this ensures all three sections update on Calculate)
        updatePlans(maintenance, recommendedProtein, budget, prefs);
        updateSleepTips(age, activity);

        // Placeholder for API integration:
        // fetchNutritionAndGenerateMeals(maintenance, recommendedProtein, budget, prefs);
      });
    }

    // initial render (show defaults)
    renderCards(workouts, workoutContainer, "workout");
    renderCards(diets, dietContainer, "diet");

    // populate initial sleep tips
    if(sleepListEl){
      const defaultTips = [
        "Maintain consistent bed & wake times.",
        "Keep bedroom cool, dark and quiet.",
        "Avoid screens 60 minutes before sleep.",
        "Limit caffeine after midday."
      ];
      defaultTips.forEach(t => {
        const li = document.createElement("li");
        li.textContent = t;
        sleepListEl.appendChild(li);
      });
    }
});