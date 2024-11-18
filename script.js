let firstUserTeam = []; // Array to store selected monsters
let allMonsters = []; // Array för att lagra monsterdata
const messageDiv = document.getElementById("messageDiv");

fetch('./monsters.json')
  .then(response => response.json())
  .then(data => {
    allMonsters = data; // Spara JSON-data i arrayen
    displayMonsters(allMonsters); // Skicka arrayen till displayMonsters

    const savedTeam = localStorage.getItem("monsterTeam");
    if (savedTeam) {
        firstUserTeam = JSON.parse(savedTeam);
        renderTeam();
    }
  })
  .catch(error => console.error("Error när monsterdata skulle hämtas", error));

const container = document.getElementById("monster-container");

function displayMonsters(monsterList) {

    monsterList.forEach(monster => {
        
        const monsterCard = document.createElement('div');
        monsterCard.classList.add("monsterCard");

        const monsterImg = document.createElement('img');
        monsterImg.src = monster.image;
        monsterImg.alt = monster.name;

        const monsterDetails = document.createElement("div");
        monsterDetails.classList.add("monsterDetails");
        
        const monsterName = document.createElement('h3');
        monsterName.classList.add("monsterName");
        monsterName.textContent = monster.name;

        const monsterSpeciality = document.createElement('p');
        monsterSpeciality.classList.add("monsterSpeciality");
        monsterSpeciality.textContent = monster.speciality;

        const addButton = document.createElement("button");
        addButton.classList.add("addButton");
        addButton.textContent = "Add to your team";
        addButton.addEventListener("click", () => addToTeam(monster));

        monsterCard.appendChild(monsterImg);
        monsterCard.appendChild(monsterDetails)
        monsterDetails.appendChild(monsterName);
        monsterDetails.appendChild(monsterSpeciality);
        monsterDetails.appendChild(addButton);

        container.appendChild(monsterCard);
        
    });  
}


// Adds a monster to the user's team
function addToTeam(monster) {

    if (firstUserTeam.length < 4 && !firstUserTeam.includes(monster.id)) {
        firstUserTeam.push(monster.id);
        messageDiv.textContent = ""; // clear any previous message
        renderTeam();
        saveTeamToLocalStorage();
    } else if (firstUserTeam.length >= 4) {
        messageDiv.textContent = "You can only select up to 4 unique monsters.";
    } else {
        messageDiv.textContent = "You can't select the same monster twice";
    }
}

// Removes a monster from the user's team
function removeFromTeam(monster){
    firstUserTeam = firstUserTeam.filter(id => id !== monster.id);
    renderTeam();
    saveTeamToLocalStorage();
}


function renderTeam() {
    const teamContainer = document.getElementById("teamContainer");
    teamContainer.innerHTML = "";

    firstUserTeam.forEach(id => {

        // Selecting monster from the main array with the IDs of the monsters in the team array
        const monster = allMonsters.find(monster => monster.id === id);
        if (!monster) return;

        // Creating the card
        const monsterCard = document.createElement("div");
        monsterCard.classList.add("monsterCard");

        // Creating the image element
        const monsterImg = document.createElement("img");
        monsterImg.setAttribute("src", monster.image);
        monsterImg.setAttribute("alt", monster.name);

        // Adds container for text and button
        const monsterDetails = document.createElement("div");
        monsterDetails.classList.add("monsterDetails");

        // Creating the name element
        const monsterName = document.createElement("h3");
        monsterName.classList.add("monsterName");
        monsterName.textContent = monster.name;

        // Creating the content element
        const monsterSpeciality = document.createElement("p");
        monsterSpeciality.classList.add("monsterSpeciality");
        monsterSpeciality.textContent = monster.speciality;

        // Creating the remove button
        const removeButton = document.createElement("button");
        removeButton.classList.add("removeButton");
        removeButton.textContent = "Remove from your team";
        removeButton.addEventListener("click", () => removeFromTeam(monster));

        // Appending the elements in the correct order
        monsterCard.appendChild(monsterImg);
        monsterCard.appendChild(monsterDetails);
        monsterDetails.appendChild(monsterName);
        monsterDetails.appendChild(monsterSpeciality);
        monsterDetails.appendChild(removeButton);
    
        teamContainer.appendChild(monsterCard);
    });
}

document.getElementById("resetButton").addEventListener("click", () => {
    firstUserTeam = [];
    saveTeamToLocalStorage();
    renderTeam();
});

document.addEventListener("DOMContentLoaded", () => {
    const savedTeam = localStorage.getItem("monsterTeam");

    if (savedTeam) {
        firstUserTeam = JSON.parse(savedTeam); // Återställ laget från LocalStorage
        renderTeam(); // Visa varje monster i laget på sidan
    }

});

function saveTeamToLocalStorage() {
    localStorage.setItem("monsterTeam", JSON.stringify(firstUserTeam));
}

renderTeam();
displayMonsters(allMonsters);