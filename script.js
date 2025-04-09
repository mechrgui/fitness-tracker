const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const workoutGoalInput = document.getElementById("workoutGoalInput");
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");
const genderForm = document.getElementById('genderForm');
const workoutPlanContainer = document.getElementById('workoutPlan');
const loadingText = document.getElementById('loading');
const daySelectorForm = document.getElementById("daySelector");
const workoutContainer = document.getElementById("workoutContainer");
const genderSelect = document.getElementById("gender");

// Load and initialize data
let progress = JSON.parse(localStorage.getItem("workoutProgress")) || {};
let workoutGoal = parseInt(localStorage.getItem("workoutGoal")) || 4;
workoutGoalInput.value = workoutGoal;
progressBar.max = workoutGoal;

function updateUI() {
  const doneCount = Object.values(progress).filter(Boolean).length;
  progressBar.value = doneCount;
  progressText.textContent = `${doneCount} / ${workoutGoal} workouts done`;
  message.textContent = doneCount >= workoutGoal ? "🎉 Goal Achieved! Great job!" : "";
}

updateUI();

// Update workout goal
workoutGoalInput.addEventListener("change", () => {
  workoutGoal = parseInt(workoutGoalInput.value) || 4;
  localStorage.setItem("workoutGoal", workoutGoal);
  progressBar.max = workoutGoal;
  updateUI();
});

// Reset progress
resetBtn.addEventListener("click", () => {
  localStorage.removeItem("workoutProgress");
  localStorage.removeItem("workoutGoal");
  localStorage.removeItem("gender");
  location.reload();
});

// Workout plans
const workoutPlans = {
  women: {
    "Weight Loss": {
      Wednesday: [
        { exercise: "Squats", video: "https://youtu.be/dQw4w9WgXcQ" },
        { exercise: "Hip Thrusts", video: "https://youtu.be/xyz123" }
      ],
      Thursday: [
        { exercise: "Leg Press", video: "https://youtu.be/abc456" },
        { exercise: "Lunges", video: "https://youtu.be/def789" }
      ]
    },
    "Muscle Gain": {
      Friday: [
        { exercise: "Squats", video: "https://youtu.be/dQw4w9WgXcQ" },
        { exercise: "Deadlifts", video: "https://youtu.be/xyz123" }
      ],
      Saturday: [
        { exercise: "Hip Thrusts", video: "https://youtu.be/abc456" },
        { exercise: "Lunges", video: "https://youtu.be/def789" }
      ]
    }
  },
  men: {
    "Weight Loss": {
      Wednesday: [
        { exercise: "Deadlift", video: "https://youtu.be/xyz123" },
        { exercise: "Pull-ups", video: "https://youtu.be/abc456" }
      ],
      Thursday: [
        { exercise: "Bench Press", video: "https://youtu.be/def789" },
        { exercise: "Dips", video: "https://youtu.be/ghi101" }
      ]
    },
    "Muscle Gain": {
      Friday: [
        { exercise: "Squats", video: "https://youtu.be/jkl112" },
        { exercise: "Chest Press", video: "https://youtu.be/mno131" }
      ],
      Saturday: [
        { exercise: "Pull-ups", video: "https://youtu.be/pqr141" },
        { exercise: "Tricep Dips", video: "https://youtu.be/stu151" }
      ]
    }
  }
};

// Load saved gender
const savedGender = localStorage.getItem("gender") || "women";
genderSelect.value = savedGender;
loadWorkoutPlan(savedGender);

genderForm.addEventListener("change", () => {
  const selectedGender = genderSelect.value;
  localStorage.setItem("gender", selectedGender);
  loadWorkoutPlan(selectedGender);
});

function loadWorkoutPlan(gender) {
  const goal = gender === "women" ? "Weight Loss" : "Muscle Gain";
  displayLoading(true);

  setTimeout(() => {
    const plan = workoutPlans[gender][goal];
    let workoutHTML = `<h2>${gender === 'women' ? 'Women\'s' : 'Men\'s'} ${goal} Plan</h2>`;

    for (const day in plan) {
      workoutHTML += `<h3>${day}</h3><ul>`;
      workoutHTML += plan[day].map(item => `
        <li>
          ${item.exercise} - <a href="${item.video}" target="_blank">View Exercise Tutorial</a>
        </li>`).join('');
      workoutHTML += '</ul>';
    }

    workoutPlanContainer.innerHTML = workoutHTML;
    displayLoading(false);
  }, 1000);
}

function displayLoading(isLoading) {
  loadingText.style.display = isLoading ? "block" : "none";
}

daySelectorForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const selectedDays = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
  workoutContainer.innerHTML = "";

  selectedDays.forEach(day => {
    const daySection = document.createElement("div");
    daySection.innerHTML = `<h3>${day}</h3>`;
    const goal = genderSelect.value === 'women' ? 'Weight Loss' : 'Muscle Gain';
    const plan = workoutPlans[genderSelect.value][goal][day];

    if (plan) {
      plan.forEach(ex => {
        const workoutItem = document.createElement("div");
        workoutItem.innerHTML = `
          <p>${ex.exercise}</p>
          <a href="${ex.video}" target="_blank">View Exercise Tutorial</a>
          <button class="mark-btn" data-day="${day}">Mark as Done</button>
        `;
        daySection.appendChild(workoutItem);
      });
    } else {
      daySection.innerHTML += `<p>No workout plan for this day.</p>`;
    }

    workoutContainer.appendChild(daySection);
  });

  // Mark buttons functionality
  setTimeout(() => {
    const markButtons = document.querySelectorAll(".mark-btn");
    markButtons.forEach(button => {
      const day = button.getAttribute("data-day");
      if (progress[day]) {
        button.textContent = "✅ Done";
        button.disabled = true;
      }

      button.addEventListener("click", () => {
        progress[day] = true;
        localStorage.setItem("workoutProgress", JSON.stringify(progress));
        updateUI();
        button.textContent = "✅ Done";
        button.disabled = true;
      });
    });
  }, 100);
});

    
