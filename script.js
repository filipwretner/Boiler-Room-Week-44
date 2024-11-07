function showToDo() {

    taskList.innerHTML = ""; // Tömmer den varje gång vi kallar på funktionen, lägger sedan till alla items i listan igen

    toDoList.forEach(task => { // För varje uppgift i arrayen lägger vi till HTML element

        const showTask = document.createElement("li"); //Lägger till ett list element
        showTask.className = task.isCompleted ? "completed" : "";
        showTask.dataset.id = task.taskID; 

        const showDescription = document.createElement("span"); // Lägger till beskrivningen som text
        showDescription.textContent = task.taskDescription;

        const completeTask = document.createElement("button"); // Lägger till en knapp för att markera som klar
        completeTask.className = "completeButton";
        completeTask.textContent = "Markera uppgift som klar";
        completeTask.addEventListener("click", () => markAsCompleteToDo(task.taskID));

        const deleteTask = document.createElement("button"); // Lägger till en knapp för att ta bort uppgift
        deleteTask.className = "deleteButton";
        deleteTask.textContent = "Ta bort uppgift";
        deleteTask.addEventListener("click", () => deleteToDo(task.taskID));

        // Lägger till alla element i rätt ordning
        showTask.appendChild(showDescription);
        showTask.appendChild(completeTask);
        showTask.appendChild(deleteTask);
        taskList.appendChild(showTask); 
    });
}