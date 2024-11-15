// Globala variabler för laget
let selectedTeam = [];

// 1. Läs laget från LocalStorage vid sidladdning
document.addEventListener("DOMContentLoaded", () => {
    const savedTeam = localStorage.getItem("monsterTeam");

    if (savedTeam) {
        selectedTeam = JSON.parse(savedTeam); // Återställ laget från LocalStorage
        selectedTeam.forEach((monster) => {
            addMonsterToTeamUI(monster); // Visa varje monster i laget på sidan
        });
    }
});

// 2. Spara laget till LocalStorage
function saveTeamToLocalStorage(team) {
    localStorage.setItem("monsterTeam", JSON.stringify(team));
}

// 3. Visa ett monster i UI
function addMonsterToTeamUI(monster) {
    const teamContainer = document.getElementById("team-container");
    const monsterDiv = document.createElement("div");
    monsterDiv.classList.add("monster"); // lägger till en css klass för styling.

    monsterDiv.innerHTML = `
        <img src="${monster.image}" alt="${monster.name}">
        <h3>${monster.name}</h3>
        <p>${monster.speciality}</p> 
    `; // monster.div.innerhtml lägger till monsterdata i div, alltså namn och specialitet.

    teamContainer.appendChild(monsterDiv);
}

// 4. Återställ laget och rensa LocalStorage
function resetTeam() {
    selectedTeam = []; // Töm laget
    localStorage.removeItem("monsterTeam"); // Ta bort data från LocalStorage

    const teamContainer = document.getElementById("team-container");
    teamContainer.innerHTML = ""; // Rensa UI
}

// Event Listener för återställningsknappen
document.getElementById("reset-button").addEventListener("click", resetTeam);
