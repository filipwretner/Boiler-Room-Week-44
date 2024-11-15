let monstersArray = []; // Array för att lagra monsterdata

fetch('./monsters.json')
  .then(response => response.json())
  .then(data => {
    monstersArray = data; // Spara JSON-data i arrayen
    displayMonsters(monstersArray); // Skicka arrayen till displayMonsters
  })
  .catch(error => console.error("Error när monsterdata skulle hämtas", error));

const container = document.getElementById("monster-container");





function displayMonsters(monsterList){

    monsterList.forEach(monster => {
        const monsterCard = document.createElement('div');

        const monsterImg = document.createElement('img');
        monsterImg.src = monster.image;
        monsterImg.alt = monster.name;

        
        const monsterName = document.createElement('h2');
        monsterName.textContent = monster.name;

        const speciality = document.createElement('p');
        speciality.textContent = monster.speciality;

        monsterCard.appendChild(monsterImg);
        monsterCard.appendChild(monsterName);
        monsterCard.appendChild(speciality);

        container.appendChild(monsterCard);
        
    });
    
}

displayMonsters(monstersArray);
