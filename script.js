let firstUserTeam = []; // Array to store selected monsters

// Adds a monster to the user's team
function addToTeam(monster) {
    if(firstUserTeam.length < 4 && !firstUserTeam.includes(monster)){
        firstUserTeam.push(monster);
        massageDiv.textContent = ""; // clear any previous message
        renderTeam();
        saveTeamToLocalStorage();
    }else{
        massageDiv.textContent = "You can only select up to 4 unique monsters.";
    }
}

// Removes a monster from the user's team
function removeFromTeam(monster){
    firstUserTeam = firstUserTeam.filter(m => m.id !== monster.id);
    renderTeam();
    saveTeamToLocalStorage();
}


function renderTeam() {
    const teamContainer = document.getElementById("teamContainer");
    teamContainer.innerHTML = "";

    firstUserTeam.forEach(id => {

        // Selecting monster from the main array with the IDs of the monsters in the team array
        const monsterId = allMonsters.find(monster => monster.id === id);

        // Creating the card
        const monsterCard = document.createElement("div");
        monsterCard.classList.add("monsterCard");

        // Creating the image element
        const monsterImg = document.createElement("img");
        monsterImg.setAttribute("src", monsterId.image)
        monsterImg.setAttribute("alt", monsterId.name)

        // Creating the name element
        const monsterName = document.createElement("h3");
        monsterName.textContent = monsterId.name;

        // Creating the content element
        const monsterSpeciality = document.createElement("p");
        monsterSpeciality.textContent = monsterId.speciality;

        // Creating the remove button
        const removeButton = document.createElement("button");
        removeButton.className.add("removeButton");
        removeButton.textContent = "Ta bort från ditt lag"
        removeButton.addEventListener("click", () => removeFromTeam(monsterId.id));

        // Appending the elements in the correct order
        monsterCard.appendChild(monsterImg);
        monsterCard.appendChild(monsterName);
        monsterCard.appendChild(monsterSpeciality);
        monsterCard.appendChild(removeButton);
    
        teamContainer.appendChild(monsterCard);
    });
}

document.getElementById("resetButton").addEventListener("click", () => {
    firstUserTeam = [];
    saveTeamToLocalStorage();
    renderTeam();
});