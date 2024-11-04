let toDoList = [];

// Class that acts as a template for creating objects
class task {

    constructor(taskID, taskDescription, isCompleted) {
        this.taskID = taskID;
        this.taskDescription = taskDescription;
        this.isCompleted = isCompleted;
    }

}

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
        choice = prompt("Ange ditt val med ett nummer 1-6:");

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
                deleteToDo(); // Call function to delete a task
                break;

            case '5':
                searchToDo(); // Call function to search for a task
                break;

            case '6':
                console.log("Tack för att du använde To-Do-applikationen! Hej då!"); // Exit message
                alert("Tack för att du använde To-Do-applikationen! Hej då!");
                break;

            default:
                console.log("Ogiltigt val,de giltiga alternativen är numren 1-6."); // Invalid choice message
        }

    } while(choice !== '6'); // Continue loop until the user chooses to exit by putting in 5
}

// Function to add a new item in the list
function addToDo() {

    // Generate a unique ID
    let newID;
    do {
        newID = parseInt(Math.random() * 100);
    } while (toDoList.some(task => task.taskID === newID)); // Check if ID is in use


    //Create and return new task
    let newTask = new task(newID, prompt(`Ange beskrivning:`), "Ej Klar");

    toDoList.push(newTask);
}

// Function to show items in the list
function showToDo() {

    let showList;

    if (toDoList.length === 0) {

        console.log(`Just nu finns det inga uppgifter att visa`);
        alert(`Just nu finns det inga uppgifter att visa`);

    } else {

        let filter = prompt(`Filtrera efter; 'alla', 'klar' eller 'ej klar'`).toLowerCase();
        let filteredList = toDoList.filter(task => filter === "klar" ? task.isCompleted === "Klar" : filter === "ej klar" ? task.isCompleted === "Ej Klar" : toDoList);


        console.log(`Alla uppgifter:`);
        filteredList.forEach(task => console.log(`Visa ID: ${task.taskID} Visa beskrivning: ${task.taskDescription} Visa status: ${task.isCompleted} `));

    }

}

// Function to mark an item as complete
function markAsCompleteToDo() {


    let id = parseInt(prompt('Ange ID för uppgiften du vill markera som klar:'));

    let taskFound = false;

    for (let i = 0; i < toDoList.length; i++) {

        if (toDoList[i].taskID === id) {
            
            alert(`Uppgiften med ID ${toDoList[i].taskID} har markerats som klar.`);
            toDoList[i].isCompleted = "Klar";
            taskFound = true;
            break;

        } 
    }

    if (!taskFound) {
        alert(`Ingen uppgift med ID ${id} hittades.`);
    }

}

// Function to delete an item from the list
function deleteToDo() {

    let id = parseInt(prompt("Skriv in ID på den uppgift du vill ta bort:"));

    let taskFound = false;

    for (let i = 0; i < toDoList.length; i++) {

        if (toDoList[i].taskID === id) {
            
            alert(`Uppgiften med ID ${toDoList[i].taskID} har tagits bort.`);
            toDoList.splice(i, 1);
            taskFound = true;
            break;

        } 
    }

    if (!taskFound) {
        alert(`Ingen uppgift med ID ${id} hittades.`);
    }

}

// Function to search for an item in the list
function searchToDo() {

    let keyword = prompt("Ange ett sökord:");
    let foundTasks = toDoList.filter(task => task.taskDescription.includes(keyword));

    if (foundTasks.length > 0) {
        console.log(`Sökresultat:`);
        foundTasks.forEach(task => console.log(`ID: ${task.taskID} Beskrivning: ${task.taskDescription} Status: ${task.isCompleted}`));
    } else {
        console.log(`Inga uppgifter matchade sökordet`);
    }

}


mainMenu(); // Making sure the application actually runs
