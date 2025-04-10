const genderSelect = document.getElementById("gender");
const workoutProgramSection = document.getElementById('workoutProgramSection');
const workoutContent = document.getElementById('workoutContent');
const togglePlanBtn = document.getElementById('togglePlanBtn');

// Workout plans for men and women
const workoutPlans = {
  women: {
    video: "https://youtu.be/yZbNGbjhcrw", // Women's workout video
  },
  men: {
    video: "https://youtube.com/shorts/2sasCsWHzO4", // Men's workout video
  }
};

// Load saved gender
const savedGender = localStorage.getItem("gender") || "women";
genderSelect.value = savedGender;
loadWorkoutProgram(savedGender);

// Initially load the workout plan for the selected gender
workoutProgramSection.style.display = "none"; // Hide it initially

// Event listener for gender selection
genderSelect.addEventListener("change", () => {
  const selectedGender = genderSelect.value;
  localStorage.setItem("gender", selectedGender);
  loadWorkoutProgram(selectedGender);
});

// Event listener for the Show Workout Plan button
togglePlanBtn.addEventListener("click", () => {
  // Toggle display of workout program section
  workoutProgramSection.style.display = (workoutProgramSection.style.display === "none" || workoutProgramSection.style.display === "") ? "block" : "none";
  // Change button text based on visibility
  togglePlanBtn.textContent = workoutProgramSection.style.display === "block" ? "Hide Workout Plan" : "Show Workout Plan";
});

// Load workout program based on gender
function loadWorkoutProgram(gender) {
  const program = workoutPlans[gender];
  workoutContent.innerHTML = `
    <h3>Workout for ${gender === 'women' ? 'Women' : 'Men'}</h3>
    <p>Watch the workout video:</p>
    <a href="${program.video}" target="_blank">
      <button>View Workout Video</button>
    </a>
  `;
  // Ensure the workout section is initially hidden until toggled
  workoutProgramSection.style.display = "none"; // This ensures it's hidden by default when the page loads
}



    
