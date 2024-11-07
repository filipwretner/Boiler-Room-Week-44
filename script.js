// Hämtar element och tilldelar dem variabler
const taskForm = document.getElementById("taskForm"); // form
const taskInput = document.getElementById("taskInput"); // input
const taskList = document.getElementById("taskList"); // ul
const message = document.getElementById("message"); // paragraf för felmeddelande

function showToDo() {

    message.innerText = ""; // Tömmer felmeddelandet varje gång vi visar denna funktion
    taskList.innerHTML = ""; // Tömmer den varje gång vi kallar på funktionen, lägger sedan till alla items i listan igen

    toDoList.forEach(task => { // För varje uppgift i arrayen lägger vi till HTML element

        const showTask = document.createElement("li"); // Skapar ett list element
        showTask.className = task.isCompleted ? "completed" : ""; // Tilldelar klassen completed om vi har markerat en uppgift som klar
        showTask.dataset.id = task.taskID; // Tilldelar den det ID som skapades när vi lade till uppgiften som id i HTML

        const showDescription = document.createElement("p"); // Skapar en p för beskrivningen 
        showDescription.textContent = task.taskDescription;

        const completeTask = document.createElement("button"); // Skapar en knapp för att markera som klar
        completeTask.className = "completeButton"; // Tilldelar klass för att kunna göra olika styling
        completeTask.textContent = "Markera uppgift som klar";
        completeTask.addEventListener("click", () => markAsCompleteToDo(task.taskID)); // Kallar på markAsComplete funktionen och skickar med det ID för uppgiften vi klickade på

        const deleteTask = document.createElement("button"); // Skapar en knapp för att ta bort uppgift
        deleteTask.className = "deleteButton"; // Tilldelar klass för att kunna göra olika styling
        deleteTask.textContent = "Ta bort uppgift";
        deleteTask.addEventListener("click", () => deleteToDo(task.taskID)); // Kallar på deleteToDo funktionen och skickar med det ID för uppgiften vi klickade på

        // Lägger till alla element i rätt ordning under li
        showTask.appendChild(showDescription);
        showTask.appendChild(completeTask);
        showTask.appendChild(deleteTask);
        taskList.appendChild(showTask); // Lägger till li i ul

    });
}