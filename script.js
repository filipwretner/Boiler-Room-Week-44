
class task {
    constructor(taskID, taskDescription, isComplete) {
        this.taskID = taskID
        this.taskDescription = taskDescription;
        this.isComplete = isComplete;
    }
}

function mainMenu() {



// Main menu function for the To-Do application
function mainMenu() {
    let choice; // Variable to store the user's menu choice

    // Loop until the user chooses to exit
    do {
        console.log("\n===============================");
        console.log("Välkommen till To-Do-applikationen!"); // Welcome message
        console.log("Välj ett alternativ:"); // Prompt for user choice
        console.log("1: Lägg till en ny uppgift"); // Option to add a new task
        console.log("2: Visa alla uppgifter"); // Option to show all tasks
        console.log("3: Markera en uppgift som klar"); // Option to mark a task as complete
        console.log("4: Ta bort en uppgift"); // Option to delete a task
        console.log("5: Avsluta programmet"); // Option to exit the program
        console.log("===============================\n");
     
        // Prompt user for their choice
        choice = prompt("Ange ditt val (1-5):");

        // Switch statement to handle user input
        switch(choice) {
            case '1':
                addToDo(); // Call function to add a new task
                break;

            case '2':
                showToDo(); // Call function to display all tasks
                break;

            case '3':
                markAsCompleteToDo(); // Call function to mark a task as complete
                break;

            case '4':
                deleteDo(); // Call function to delete a task
                break;

            case '5':
                console.log("Tack för att du använde To-Do-applikationen! Hej då!"); // Exit message
                break;

            default:
                console.log("Ogiltigt val, försök igen."); // Invalid choice message
        }

    } while(choice !== '5'); // Continue loop until the user chooses to exit
}
// Global array för att lagra uppgifter



function addToDo() {
    // Generate a unique ID
    let newID;
    do {
        newID = Math.random();
    } while (toDoList.some(task => task.taskID === newID)); // Check if ID is in use



    //Create and return new task
    let newTask = new task(newID, prompt(), false);
    return newTask;
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




function deleteToDo() {
    
}
mainMenu(); // Making sure the application actually runs

