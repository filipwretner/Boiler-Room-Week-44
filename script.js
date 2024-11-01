function mainMenu() {

}
// Global array för att lagra uppgifter


function addToD() {

}

function showToDo() {

}
let tasks = [];

function markAsComplete() {
    let toDoListId = prompt('Ange ID för uppgiften du vill markera som klar:');
    // Be användaren om id för den uppgift som ska markeras som klar
    // Konvertera input till ett nummer om det behövs
    toDoListId = parseInt(toDoListId);

    // Hitta uppgiften med det angivna id:t
    let taskFound = false;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === toDoListId) {
            // Markera uppgiften som klar
            tasks[i].completed = true;
            alert(`Uppgiften med ID ${toDoListId} har markerats som klar.`);
            taskFound = true;
            break;
        }
    }

    // Om ingen uppgift hittades med det id:t
    if (!taskFound) {
        alert(`Ingen uppgift med ID ${toDoListId} hittades.`);
    }
}



function deleteToDo() {
    
}