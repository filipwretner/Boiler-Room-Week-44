let toDoList = [];
let isCompleted = false;
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
                deleteToDo(); // Call function to delete a task
                break;

            case '5':
                console.log("Tack för att du använde To-Do-applikationen! Hej då!"); // Exit message
                break;

            default:
                console.log("Ogiltigt val, försök igen."); // Invalid choice message
        }

    } while(choice !== '5'); // Continue loop until the user chooses to exit
}

function addToDo() {
    // Generate a unique ID
    let newID;
    do {
        newID = parseInt(Math.random() * 100);
    } while (toDoList.some(task => task.taskID === newID)); // Check if ID is in use



    //Create and return new task
    let newTask = new task(newID, prompt(), false);
    toDoList.push(newTask);
}

function showToDo() {

    if (toDoList.length === 0) {
        console.log(`Just nu finns det inga uppgifter att visa`);
        alert(`Just nu finns det inga uppgifter att visa`);
    } else {
        console.log(`Alla uppgifter:`);
        alert(`Alla uppgifter:`);
        // toDoList.forEach(todo => console.log(`Visa ID: Visa beskrivning: Visa status:`));
        // toDoList.forEach(toDo => alert(`Visa ID: ${taskID} Visa beskrivning: ${taskDescription} Visa status: ${isComplete} `));
        // console.log(toDoList.taskID);

        for (let i = 0; i < toDoList.length; i++) {
            console.log(toDoList[i].taskID);
        }
    }

}

function markAsCompleteToDo() {


    let markID = prompt('Ange ID för uppgiften du vill markera som klar:');
    // Be användaren om id för den uppgift som ska markeras som klar
    // Konvertera input till ett nummer om det behövs
    markID = parseInt(markID);


    // Hitta uppgiften med det angivna id:t
    let taskFound = false;

    for (let i = 0; i < toDoList.length; i++) {
        if (toDoList[i].taskID === markID) {
            // Markera uppgiften som klar
            
            alert(`Uppgiften med ID ${toDoList[i].taskID} har markerats som klar.`);
            toDoList[i].isCompleted = true;
            break;
        } else if (!taskFound) {
            alert(`Ingen uppgift med ID ${toDoList[i].taskID} hittades.`);
        }
    }



function deleteToDo() {

    let deleteID = prompt("Skriv in ID på den uppgift du vill ta bort:")

    if (deleteID > 1 || deleteID > toDoList.length) {
        console.log("Invalid item to remove, please enter an item that exists");
        return;
        
    } else {
        let removedItem = toDoList.splice(deleteID - 1, 1);
        console.log(`Removed: "${removedItem[0]}"`);
        
        showToDo();
        
        
    }
}


mainMenu(); // Making sure the application actually runs
