let firstUserTeam = []; // Array to store selected monsters
let allMonsters = []; // Array för att lagra monsterdata
const messageDiv = document.getElementById("messageDiv");

fetch('./monsters.json')
  .then(response => response.json())
  .then(data => {
    allMonsters = data; // Saves JSON in main array
    displayMonsters(allMonsters); 

    const savedTeam = localStorage.getItem("monsterTeam"); // Adds the previously saved team to current load
    if (savedTeam) {
        firstUserTeam = JSON.parse(savedTeam);
        renderTeam();
    }
  })
  .catch(error => console.error("Error när monsterdata skulle hämtas", error));

const container = document.getElementById("monster-container");

function displayMonsters(monsterList) {

    // Adds HTML structure
    monsterList.forEach(monster => {
        
        // Creating the card
        const monsterCard = document.createElement('div');
        monsterCard.classList.add("monsterCard");

        // Creating the image element
        const monsterImg = document.createElement('img');
        monsterImg.src = monster.image;
        monsterImg.alt = monster.name;

        // Creating container for text and button
        const monsterDetails = document.createElement("div");
        monsterDetails.classList.add("monsterDetails");
        
        // Creating the element for name
        const monsterName = document.createElement('h3');
        monsterName.classList.add("monsterName");
        monsterName.textContent = monster.name;

        // Creating the element for the text
        const monsterSpeciality = document.createElement('p');
        monsterSpeciality.classList.add("monsterSpeciality");
        monsterSpeciality.textContent = monster.speciality;

        // Creating the add to team button
        const addButton = document.createElement("button");
        addButton.classList.add("addButton");
        addButton.textContent = "Add to your team";
        addButton.addEventListener("click", () => addToTeam(monster));

        // Appending each element to the corresponding parent
        monsterCard.appendChild(monsterImg);
        monsterCard.appendChild(monsterDetails)
        monsterDetails.appendChild(monsterName);
        monsterDetails.appendChild(monsterSpeciality);
        monsterDetails.appendChild(addButton);

        container.appendChild(monsterCard);
        
    });  
}


function addToTeam(monster) {

    if (firstUserTeam.length < 4 && !firstUserTeam.includes(monster.id)) {

        firstUserTeam.push(monster.id);
        messageDiv.textContent = "";
        renderTeam();
        saveTeamToLocalStorage();

    } else if (firstUserTeam.length >= 4) {
        messageDiv.textContent = "You can only select up to 4 unique monsters.";

    } else {
        messageDiv.textContent = "You can't select the same monster twice";
    }
}


function removeFromTeam(monster){
    firstUserTeam = firstUserTeam.filter(id => id !== monster.id); // Finds monster with corresponding ID of the button we pressed
    messageDiv.textContent = "";
    renderTeam();
    saveTeamToLocalStorage();
}


function renderTeam() {
    const teamContainer = document.getElementById("teamContainer");
    teamContainer.innerHTML = "";

    // Adds HTML structure
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

        // Appending each element to corresponding parent
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
    messageDiv.textContent = "";
    saveTeamToLocalStorage();
    renderTeam();
});

document.addEventListener("DOMContentLoaded", () => {
    const savedTeam = localStorage.getItem("monsterTeam");

    if (savedTeam) {
        firstUserTeam = JSON.parse(savedTeam); // Adds the team saved in localStorage when the page loads
        renderTeam();
    }

});

function saveTeamToLocalStorage() {
    localStorage.setItem("monsterTeam", JSON.stringify(firstUserTeam));
}

renderTeam();
displayMonsters(allMonsters);